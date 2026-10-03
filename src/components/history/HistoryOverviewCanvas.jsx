import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { historyOverviewYears } from './historyOverviewData';
import { CAMERA_Z, getEventOrbitState } from './historyOverviewOrbit';

function disposeTree(root) {
  root.traverse((object) => {
    object.geometry?.dispose();
    for (const material of object.material ? [].concat(object.material) : []) {
      Object.values(material).forEach((value) => { if (value?.isTexture) value.dispose(); });
      material.dispose();
    }
  });
}

export default function HistoryOverviewCanvas({ progressRef, renderRef, scrollMotionRef, mobile = false }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const width = mobile ? 360 : 1920;
    const height = mobile ? 643 : 1080;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(THREE.MathUtils.radToDeg(2 * Math.atan(height / 2 / CAMERA_Z)), width / height, 1, 6000);
    camera.position.z = CAMERA_Z;
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const light = new THREE.DirectionalLight(0xffffff, 2.2);
    light.position.set(-400, 600, 900);
    scene.add(light);
    let disposed = false;
    let bendFrame;
    let bend = 0;
    let lastRenderTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const textures = new Set();
    const textureLoader = new THREE.TextureLoader();
    const loadTexture = (url) => {
      const texture = textureLoader.load(url, () => {
        if (disposed) texture.dispose();
        else render();
      });
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.add(texture);
      return texture;
    };


    // Surface-space dots foreshorten naturally around the sphere.
    // The dark depth-writing body occludes rear cards without a specular highlight.
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(mobile ? 114 : 402, mobile ? 32 : 64, mobile ? 24 : 48), new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 localNormal;
        varying vec3 surfaceNormal;
        varying vec3 viewDirection;
        void main() {
          localNormal = normal;
          surfaceNormal = normalize(normalMatrix * normal);
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          viewDirection = -viewPosition.xyz;
          gl_Position = projectionMatrix * viewPosition;
        }`,
      fragmentShader: `
        varying vec3 localNormal;
        varying vec3 surfaceNormal;
        varying vec3 viewDirection;
        void main() {
          const float PI = 3.14159265359;
          vec3 local = normalize(localNormal);
          float latitude = asin(clamp(local.y, -1.0, 1.0));
          float row = (latitude / PI + 0.5) * ${mobile ? '12.0' : '48.0'};
          float rowLatitude = ((floor(row) + 0.5) / ${mobile ? '12.0' : '48.0'} - 0.5) * PI;
          // Fewer dots near the poles keeps their surface spacing consistent.
          float columns = max(4.0, floor(${mobile ? '24.0' : '96.0'} * cos(rowLatitude) / 2.0) * 2.0);
          float column = (atan(local.x, local.z) / (2.0 * PI) + 0.5) * columns;
          vec2 cell = fract(vec2(column, row)) - 0.5;
          float distanceToDot = length(cell);
          float aa = max(fwidth(distanceToDot), 0.001);
          float dotMask = 1.0 - smoothstep(0.155 - aa, 0.155 + aa, distanceToDot);
          float facing = max(dot(normalize(surfaceNormal), normalize(viewDirection)), 0.0);
          float shade = 0.55 + 0.45 * sqrt(facing);
          vec3 color = mix(vec3(0.007499), vec3(0.7913, 0.0, 0.00605) * shade, dotMask);
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }`,
    }));
    sphere.position.x = mobile ? 0 : -13;
    if (mobile) sphere.position.y = -3.5;
    scene.add(sphere);
    const world = new THREE.Group();
    scene.add(world);

    const models = new Array(historyOverviewYears.length);

    const orbitItems = historyOverviewYears.flatMap((item, yearIndex) => {
      const visuals = [{ ...item.yearVisual, slotOffset: 0 }, ...item.cards];
      return visuals.map((visual) => {
        const mobileScale = visual.slotOffset === 0 ? .244 : .21;
        const geometry = new THREE.PlaneGeometry(visual.width * (mobile ? mobileScale : 1), visual.height * (mobile ? mobileScale : 1), visual.slotOffset === 0 ? 24 : 48, 1);
        // Years wrap gently around a cylinder; their center stays on the orbit.
        // Cards bend along the orbit, with their center anchored to the same slot.
        const positions = geometry.attributes.position;
        // Retain flat coordinates so repeated bending never deforms the mesh cumulatively.
        const flatX = Float32Array.from({ length: positions.count }, (_, index) => positions.getX(index));
        const baseBendRadius = (visual.slotOffset === 0 ? 1800 : 1000) * (mobile ? .244 : 1);
        if (visual.slotOffset !== 0) {
          const radius = baseBendRadius;
          for (let i = 0; i < positions.count; i++) {
            const angle = positions.getX(i) / radius;
            positions.setX(i, Math.sin(angle) * radius);
            positions.setZ(i, (Math.cos(angle) - 1) * radius);
          }
        } else {
          const radius = baseBendRadius;
          for (let i = 0; i < positions.count; i++) {
            const angle = positions.getX(i) / radius;
            positions.setX(i, Math.sin(angle) * radius);
            positions.setZ(i, (Math.cos(angle) - 1) * radius);
          }
        }
        geometry.computeVertexNormals();
        const material = new THREE.MeshBasicMaterial({
          map: loadTexture(visual.src), side: THREE.DoubleSide,
          transparent: true, depthWrite: false,
        });
        if (visual.slotOffset === 0) {
          // Figma's text export includes the board's #715959 background.
          // Recover white glyph coverage in linear color space, preserving edge AA.
          material.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
              #include <map_fragment>
              float coverage = clamp((min(diffuseColor.r, min(diffuseColor.g, diffuseColor.b)) - 0.099899) / 0.900101, 0.0, 1.0);
              diffuseColor = vec4(vec3(1.0), diffuseColor.a * coverage);
            `);
          };
          material.customProgramCacheKey = () => 'history-white-year';
        }
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = item.year + '-' + visual.slotOffset;
        world.add(mesh);
        return { mesh, flatX, baseBendRadius, config: { slot: yearIndex * 3 + visual.slotOffset, radius: 570 + (visual.slotOffset === 2 ? 25 : 0) } };
      });
    });

    function render() {
      if (disposed) return;
      cancelAnimationFrame(bendFrame);
      bendFrame = undefined;
      const now = performance.now();
      const elapsed = Math.max(0, Math.min((now - lastRenderTime) / 1000, .05));
      lastRenderTime = now;
      const motion = scrollMotionRef?.current;
      // Both scroll directions bend inward. Expire the velocity sample when scrolling stops.
      const target = !mobile && !reducedMotion.matches && motion?.active && now - motion.updatedAt < 120
        ? Math.min(motion.velocity / 2400, 1) : 0;
      const previousBend = bend;
      bend = reducedMotion.matches ? 0 : THREE.MathUtils.lerp(bend, target, 1 - Math.exp(-elapsed / (target > bend ? .1 : .28)));
      if (Math.abs(bend - target) < .0005) bend = target;
      if (bend !== previousBend) {
        orbitItems.forEach(({ mesh, flatX, baseBendRadius }) => {
          const radius = baseBendRadius / (1 + bend * 1.25);
          const positions = mesh.geometry.attributes.position;
          for (let index = 0; index < positions.count; index++) {
            const angle = flatX[index] / radius;
            positions.setX(index, Math.sin(angle) * radius);
            positions.setZ(index, (Math.cos(angle) - 1) * radius);
          }
          positions.needsUpdate = true;
        });
      }
      const phase = progressRef.current;

      orbitItems.forEach(({ mesh, config }) => {
        const state = getEventOrbitState(config, phase);
        if (mobile) {
          const distance = config.slot - phase * 3;
          const radius = 174 + (config.slot % 3 === 2 ? 8 : 0);
          state.x = Math.sin(state.angle) * radius;
          state.y = -3.5 - distance * 90;
          state.z = Math.cos(state.angle) * radius;
          state.scale = (CAMERA_Z - radius) / CAMERA_Z;
        }
        mesh.position.set(state.x, state.y, state.z);
        // Radial orientation reveals the side naturally as the item turns away.
        mesh.rotation.set(0, state.angle, 0);
        mesh.scale.setScalar(state.scale);
      });
      const smooth = (value) => {
        const t = THREE.MathUtils.clamp(value, 0, 1);
        return t * t * (3 - 2 * t);
      };
      sphere.scale.setScalar(mobile ? 1 : Math.max(0.0001, 1 - smooth((phase + 0.35) / 0.35)));
      sphere.rotation.y = phase * 0.08;
      models.forEach((model, index) => {
        if (!model) return;
        const local = phase - index;
        const enter = smooth((local + 0.35) / 0.35);
        const exit = index === historyOverviewYears.length - 1 ? 1 : 1 - smooth((local - 0.65) / 0.35);
        const config = historyOverviewYears[index].calibration;
        model.scale.setScalar(model.userData.baseScale * Math.max(0.0001, enter * exit));
        model.rotation.set(config.rotation[0] + local * 0.1, config.rotation[1] + local * 0.8, config.rotation[2]);
      });
      renderer.render(scene, camera);
      // Continue only while reacting or settling; a resting scene does not run an idle loop.
      if (target > 0 || bend > 0) bendFrame = requestAnimationFrame(render);
    }
    renderRef.current = render;
    const loader = new GLTFLoader();
    if (!mobile) historyOverviewYears.forEach((item, index) => {
      loader.load(item.model, (gltf) => {
        if (disposed) { disposeTree(gltf.scene); return; }
        const root = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(root);
        const dimensions = bounds.getSize(new THREE.Vector3());
        root.position.sub(bounds.getCenter(new THREE.Vector3()));
        const orientation = new THREE.Group();
        const config = item.calibration;
        if (config.basis) orientation.quaternion.setFromRotationMatrix(new THREE.Matrix4().set(...config.basis));
        if (config.turnY) orientation.rotateY(config.turnY);
        orientation.add(root);
        const model = new THREE.Group();
        model.add(orientation);
        model.userData.baseScale = config.size / Math.max(dimensions.x, dimensions.y, dimensions.z, 0.001);
        model.rotation.set(...config.rotation);
        model.position.set(...config.offset);
        models[index] = model;
        scene.add(model);
        render();
      }, undefined, (error) => { if (!disposed) console.error('History model load failed:', item.model, error); });
    });
    render();
    return () => {
      disposed = true;
      cancelAnimationFrame(bendFrame);
      renderRef.current = null;
      disposeTree(scene);
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [progressRef, renderRef, scrollMotionRef, mobile]);

  return <div className="history-overview__canvas" ref={hostRef} aria-hidden="true" />;
}
