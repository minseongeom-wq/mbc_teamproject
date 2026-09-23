import AppLink from '../AppLink';
import publicAsset from '../../../utils/publicAsset';
import CharacterIcon from './CharacterIcon';
import { characterLinks, getAccountLinks, navigationRoutes as routes, utilityLinks } from './navigationLinks';
import './DropdownMenu.css';

const asset = (file) => publicAsset(`/images/navigation/${file}`);
function Arrow() {
  return <img className="dropdown-menu__arrow" src={asset('fbdb4.svg')} alt="" />;
}
export default function DropdownMenu({ id, panelRef, isAuthenticated, onSelect, onLogout }) {
  const accountRoute = isAuthenticated ? routes.mypage : routes.login;
  return (
    <nav id={id} ref={panelRef} className="dropdown-menu" aria-label="전체 메뉴" onClick={(event) => {
      if (event.target.closest('a')) onSelect();
    }} data-node-id="2661:4945">
      <div className="dropdown-menu__cards">
        <div className="dropdown-menu__card dropdown-menu__characters">
          <div className="dropdown-menu__character-surface" aria-hidden="true" />
          <span className="dropdown-menu__label dropdown-menu__character-label">Character</span>
          <ul className="dropdown-menu__character-list">
            {characterLinks.map(character => <li key={character.id}>
              <AppLink className={`dropdown-menu__character dropdown-menu__character--${character.id}`} to={character.route}>
                <span>{character.label}</span><CharacterIcon character={character} />
              </AppLink>
            </li>)}
          </ul>
          <AppLink className="dropdown-menu__brand-story" to={routes.history} aria-label="Nintendo 브랜드와 역사">
            <span className="dropdown-menu__wordmark" aria-hidden="true">
              <img src={asset('9feba.svg')} alt="" /><img src={asset('2eec7.svg')} alt="" /><img src={asset('8a581.svg')} alt="" />
            </span>
            <span className="dropdown-menu__slogan">There's no<br />play like it.</span>
            <img className="dropdown-menu__pixel-mario" src={asset('f73ad.png')} alt="" />
          </AppLink>
          <AppLink className="dropdown-menu__history dropdown-menu__caption" to={routes.history}>닌텐도의 역사 <Arrow /></AppLink>
        </div>
        <AppLink className="dropdown-menu__card dropdown-menu__community" to={routes.community}>
          <span className="dropdown-menu__label">Community</span>
          <img className="dropdown-menu__question-block" src={asset('46991.svg')} alt="" />
          <span className="dropdown-menu__community-title">오늘은 어떤게임을<br />플레이 해볼까요?</span>
        </AppLink>
        <AppLink className="dropdown-menu__card dropdown-menu__store" to={routes.store}>
          <span className="dropdown-menu__label">Nintendo Store</span>
          <img className="dropdown-menu__shopping-bag" src={asset('ae2bb.png')} alt="" />
          <span className="dropdown-menu__store-title">Store</span>
          <span className="dropdown-menu__store-caption dropdown-menu__caption">게임 구매하기 <Arrow /></span>
        </AppLink>
        <div className="dropdown-menu__card dropdown-menu__nintendo">
          <span className="dropdown-menu__label">Nintendo</span>
          <img className="dropdown-menu__switch-logo" src={asset('33392.svg')} alt="" />
          <ul className="dropdown-menu__nintendo-links">
            {[['Switch 2', routes.hardware], ['My Page', accountRoute], ['Support', routes.support]].map(([label, route]) => <li key={label}><AppLink to={route}>{label}</AppLink></li>)}
          </ul>
        </div>
      </div>
      <div className="dropdown-menu__utilities">
        <ul className="dropdown-menu__utility-links" aria-label="탐색 및 주문">
          {utilityLinks.map(link => <li key={link.route}><AppLink to={link.route}>{link.label}</AppLink></li>)}
        </ul>
        <ul className="dropdown-menu__utility-links" aria-label="계정">
          {getAccountLinks(isAuthenticated).map(link => <li key={link.route}><AppLink to={link.route}>{link.label}</AppLink></li>)}
          {isAuthenticated && onLogout && <li><button type="button" onClick={() => { onLogout(); onSelect(); }}>로그아웃</button></li>}
        </ul>
      </div>
    </nav>
  );
}
