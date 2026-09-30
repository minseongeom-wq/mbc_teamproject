export const CAMERA_Z = 2400;
export const ORBIT_STEP = Math.PI * 2 / 4.5;
export const ITEMS_PER_YEAR = 3;

// One continuous helical track: year, first card, second card.
export function getOrbitPhase(progress, count) {
  return -0.35 + Math.max(0, Math.min(1, progress)) * (count - 1 / 3 + 0.35);
}

export function getEventOrbitState(config, phase) {
  const distance = config.slot - phase * ITEMS_PER_YEAR;
  const angle = distance * ORBIT_STEP;
  return {
    angle,
    x: -13 + Math.sin(angle) * config.radius,
    y: -distance * 300,
    z: Math.cos(angle) * config.radius,
    scale: (CAMERA_Z - config.radius) / CAMERA_Z,
  };
}
