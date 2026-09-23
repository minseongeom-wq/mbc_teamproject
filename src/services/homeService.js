import { amiiboFigures } from '../data/home';
import publicAsset from '../utils/publicAsset';

export function getHomeContent() {
  return {
    amiiboFigures: amiiboFigures.map(figure => ({
      ...figure,
      src: publicAsset(figure.src),
    })),
  };
}
