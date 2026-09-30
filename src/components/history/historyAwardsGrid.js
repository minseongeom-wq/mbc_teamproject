// The Figma grid uses 40px cells with a 1px gutter. Its exported PNG is
// stretched in the page, so both interactions use the rendered image scale.
export const AWARDS_CELL_STEP = 41;
export const AWARDS_PIXEL_SIZE = 40;

export function getAwardsGridMetrics(grid) {
  const scaleX = grid.clientWidth / (grid.naturalWidth || 1920);
  const scaleY = grid.clientHeight / (grid.naturalHeight || 1080);

  return {
    originX: grid.offsetLeft,
    originY: grid.offsetTop,
    stepX: AWARDS_CELL_STEP * scaleX,
    stepY: AWARDS_CELL_STEP * scaleY,
    pixelWidth: AWARDS_PIXEL_SIZE * scaleX,
    pixelHeight: AWARDS_PIXEL_SIZE * scaleY,
  };
}
