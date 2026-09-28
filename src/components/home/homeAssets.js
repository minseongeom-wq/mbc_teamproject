// Original Figma files. Shared assets keep their existing common paths.
const common = new Set(["01b95.svg","16767.svg","25b35.svg","283f0.svg","2eec7.svg","33392.svg","34e9a.png","4124c.svg","46991.svg","59d10.svg","5c836.svg","6133e.svg","61c06.png","6daa2.svg","6f9ac.svg","7282b.svg","7dc39.png","7fdbf.svg","8a581.svg","8fcef.svg","90994.png","98bc2.svg","9abb5.svg","9bb38.png","9feba.svg","ae2bb.png","ae937.svg","bb1e7.svg","be010.svg","c04f0.svg","c2237.svg","c975d.svg","d06d6.svg","d121d.svg","d2341.svg","d2eda.svg","d7108.png","d839f.svg","e4eaa.svg","ee414.png","f2360.png","f73ad.png","fbdb4.svg","fbfae.png","ff059.svg"]);
export function homeAsset(filename) {
  return import.meta.env.BASE_URL + 'images/' + (common.has(filename) ? 'common/' : 'banners/home/') + filename;
}
