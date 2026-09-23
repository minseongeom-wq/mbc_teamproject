// Public assets must include Vite's deployment base (for example GitHub Pages).
export default function publicAsset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
