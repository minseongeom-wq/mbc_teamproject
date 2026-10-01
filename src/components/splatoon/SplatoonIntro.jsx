import { useEffect, useRef, useState } from 'react';
import { asset } from './asset.js';
import './splatoon.css';

// Original Figma layer coordinates: the complete collage scales as one unit.
function Layer({ x, y, width, height, rotate = 0, flip = false, className = '', children }) {
    return (
        <div
            className={`splatoon-intro__layer${className ? ` ${className}` : ''}`}
            style={{ left: x, top: y, width, height }}
        >
            <div
                className="splatoon-intro__layer-content"
                style={{ transform: `rotate(${rotate}deg) scaleY(${flip ? -1 : 1})` }}
            >
                {children}
            </div>
        </div>
    );
}

function Picture({ name, width, height, crop, boxWidth = width, boxHeight = height, ...position }) {
    return (
        <Layer {...position} width={boxWidth} height={boxHeight}>
            <div className="splatoon-intro__picture" style={{ width, height }}>
                <img
                    src={asset(name)}
                    alt=""
                    draggable="false"
                    style={
                        crop ??
                        (name.endsWith('.svg') ? undefined : { width, height, objectFit: 'cover' })
                    }
                />
            </div>
        </Layer>
    );
}

const bubbles = [
    [649.15, 433.7, 86.175, 96.872, 80.953, 53.825, -61.19, 'squid'],
    [461.81, 896.53, 66.636, 44.668, 66.208, 44.021, -0.56, 'smash'],
    [1130.43, 555.42, 68.149, 46.998, 66.208, 44.021, -2.62, 'shoot'],
    [792.35, 960.97, 30.521, 26.402, 25.691, 17.082, -25.23, 'smash'],
    [1410.34, 785.01, 39.843, 51.546, 46.004, 30.588, -102.53, 'strategy'],
];

export default function SplatoonIntro() {
    const container = useRef(null);
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
        observer.observe(container.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={container} className="splatoon-intro" aria-labelledby="splatoon-intro-title">
            <h1 id="splatoon-intro-title" className="splatoon-intro__title">
                스플래툰 3
            </h1>
            <div
                className="splatoon-intro__stage"
                style={{ transform: `scale(${scale})` }}
                aria-hidden="true"
            >
                <img
                    className="splatoon-intro__background"
                    src={asset('3a9de.png')}
                    alt=""
                    fetchPriority="high"
                />
                <div className="splatoon-intro__artwork">
                    <Picture
                        name="1aaec.svg"
                        className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--squid"
                        x={42.96}
                        y={429.95}
                        width={729.703}
                        height={225.534}
                    />
                    <Picture
                        name="65495.svg"
                        className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--smash"
                        x={626.48}
                        y={802.26}
                        width={445.697}
                        height={217.181}
                        rotate={180}
                        flip
                    />
                    <Picture
                        name="b04ea.svg"
                        className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--strategy"
                        x={1093.06}
                        y={785.55}
                        width={363.957}
                        height={234.483}
                        rotate={180}
                        flip
                    />
                    <Picture
                        name="92a34.svg"
                        className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--shoot"
                        x={688.53}
                        y={429.95}
                        width={768.935}
                        height={196.894}
                    />
                    <Picture
                        name="43f60.svg"
                        className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--smash"
                        x={42.96}
                        y={820.16}
                        width={198.684}
                        height={661.088}
                        boxWidth={661.088}
                        boxHeight={198.684}
                        rotate={90}
                        flip
                    />
                    <Picture
                        name="b276c.png"
                        className="splatoon-intro__enter splatoon-intro__enter--character splatoon-intro__step--strategy"
                        x={1093.06}
                        y={707.99}
                        width={364.028}
                        height={268.44}
                    />
                    <Picture
                        name="34417.png"
                        className="splatoon-intro__enter splatoon-intro__enter--character splatoon-intro__step--squid"
                        x={161.1}
                        y={231.87}
                        width={472.417}
                        height={391.51}
                        boxWidth={493.134}
                        boxHeight={416.776}
                        rotate={-3.14}
                    />
                    <Picture
                        name="b669d.png"
                        className="splatoon-intro__enter splatoon-intro__enter--character splatoon-intro__step--shoot"
                        x={779.33}
                        y={0}
                        width={618.186}
                        height={459.549}
                        boxWidth={770.172}
                        boxHeight={741.313}
                        rotate={37.61}
                        crop={{ width: '138.09%', height: '104.49%', left: '-20.14%', top: 0 }}
                    />
                    <Layer className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--smash" x={630} y={800} width={178.325} height={221.783} rotate={62.71}>
                        <p className="splatoon-intro__word splatoon-intro__word--color">Color</p>
                    </Layer>
                    <Layer className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--strategy" x={1103} y={952.62} width={221.547} height={68.828} rotate={0.47}>
                        <p className="splatoon-intro__word splatoon-intro__word--strategy">
                            strategy
                        </p>
                    </Layer>
                    <Layer className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--shoot" x={807.64} y={414.44} width={302.099} height={136.488} rotate={0.47}>
                        <p className="splatoon-intro__word splatoon-intro__word--shoot">Shoot</p>
                    </Layer>
                    <Layer className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--squid" x={33.26} y={440} width={98} height={204} rotate={90}>
                        <p className="splatoon-intro__word splatoon-intro__word--squid">Squid</p>
                    </Layer>
                    <Picture
                        name="f67e8.png"
                        className="splatoon-intro__enter splatoon-intro__enter--character splatoon-intro__step--smash"
                        x={0}
                        y={656.68}
                        width={250.387}
                        height={363.061}
                        crop={{ width: '153.75%', height: '141.38%', left: '-33.62%', top: 0 }}
                    />
                    {bubbles.map(([x, y, boxWidth, boxHeight, width, height, rotate, step]) => (
                        <Picture
                            key={x}
                            name="2e1a4.png"
                            className={`splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--${step}`}
                            {...{ x, y, boxWidth, boxHeight, width, height, rotate }}
                            crop={{
                                width: '212.77%',
                                height: '320%',
                                left: '-58.51%',
                                top: '-120%',
                                opacity: 0.36,
                            }}
                        />
                    ))}
                    <Picture
                        name="3975c.png"
                        className="splatoon-intro__enter splatoon-intro__enter--character splatoon-intro__step--smash"
                        x={190.93}
                        y={661.45}
                        width={245.82}
                        height={356.797}
                        crop={{
                            width: '121.45%',
                            height: '115.09%',
                            left: '-9.31%',
                            top: '-5.64%',
                        }}
                    />
                    <Layer className="splatoon-intro__enter splatoon-intro__enter--panel splatoon-intro__step--smash" x={320.99} y={902.5} width={329.098} height={136.712} rotate={0.47}>
                        <p className="splatoon-intro__word splatoon-intro__word--smash">Smash</p>
                    </Layer>
                    <Picture
                        name="9499c.png"
                        className="splatoon-intro__enter splatoon-intro__enter--character splatoon-intro__step--smash"
                        x={807.51}
                        y={718.73}
                        width={265.263}
                        height={302.698}
                        rotate={180}
                        flip
                        crop={{ width: '111.53%', height: '100%', left: '-6.22%', top: 0 }}
                    />
                    <Picture
                        name="9b8f1.png"
                        className="splatoon-intro__enter splatoon-intro__enter--logo"
                        x={410.49}
                        y={481.26}
                        width={722.722}
                        height={414.896}
                        boxWidth={725.853}
                        boxHeight={420.374}
                        rotate={0.44}
                    />
                </div>
            </div>
        </section>
    );
}
