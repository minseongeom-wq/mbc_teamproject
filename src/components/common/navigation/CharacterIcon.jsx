import publicAsset from '../../../utils/publicAsset';

const layers = {
  mario: ['4124c.svg', '6daa2.svg', 'c04f0.svg', '25b35.svg'],
  zelda: ['c975d.svg', '7fdbf.svg', '8fcef.svg'],
  splatoon: ['6133e.svg'],
};
export default function CharacterIcon({ character }) {
  return (
    <span className={`dropdown-menu__character-icon dropdown-menu__character-icon--${character.id}`} aria-hidden="true">
      <span className="dropdown-menu__silhouette">
        {character.id === 'splatoon' && <span className="dropdown-menu__squid-mask" style={{ maskImage: `url("${publicAsset('/images/navigation/ee414.png')}")` }} />}
        {layers[character.id].map((file, index) => <img key={file} className={`dropdown-menu__icon-layer dropdown-menu__icon-layer--${index}`} src={publicAsset(`/images/navigation/${file}`)} alt="" />)}
      </span>
      <img className="dropdown-menu__character-hover" src={publicAsset(`/images/navigation/${character.hoverImage}`)} alt="" />
    </span>
  );
}
