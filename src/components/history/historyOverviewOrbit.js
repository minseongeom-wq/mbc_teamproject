export const CAMERA_Z = 2400;
export const ORBIT_STEP = Math.PI * 2 / 4.5;
export const ITEMS_PER_YEAR = 3;
// Bring the surrounding cards and years slightly closer to the model.
const ORBIT_SPACING = 0.92;

// One continuous helical track: year, first card, second card.
export function getOrbitPhase(progress, count) {
  return -0.35 + Math.max(0, Math.min(1, progress)) * (count - 1 / 3 + 0.35);
}

export function getEventOrbitState(config, phase) {
  const distance = config.slot - phase * ITEMS_PER_YEAR;
  const angle = distance * ORBIT_STEP;
  const radius = config.radius * ORBIT_SPACING;
  return {
    angle,
    x: -13 + Math.sin(angle) * radius,
    y: -distance * 300 * ORBIT_SPACING,
    z: Math.cos(angle) * radius,
    scale: (CAMERA_Z - radius) / CAMERA_Z,
  };
}
