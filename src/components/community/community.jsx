import { useState } from 'react';
import './community.css';

const base = `${import.meta.env.BASE_URL}images/community/`;
const heroGames = [
  { name: '젤다의 전설 브레스 오브 와일드', image: 'hero-zelda.png' },
  { name: '젤다의 전설 티어스 오브 더 킹덤', image: 'hero-kirby.png' },
  { name: '별의 커비 디스커버리', image: 'hero-animal.png' },
  { name: '모여봐요 동물의 숲', image: 'hero-switch.png' },
  { name: '스플래툰 3', image: 'hero-extra.png' },
];
const feedColumns = [
  ['feed-zelda-01.jpeg', 'feed-rally-01.png', 'feed-animal-01.jpeg', 'feed-rally-02.png', 'feed-bg.png'],
  ['feed-mario-kart-01.png', 'feed-animal-02.jpeg', 'feed-animal-03.jpeg', 'feed-zelda-02.jpeg', 'feed-mario-kart-04.png'],
  ['feed-mario-kart-02.png', 'feed-zelda-03.jpeg', 'feed-mario-object.png', 'feed-mario-kart-03.png', 'feed-bg.png'],
  ['feed-bg.png', 'feed-koopa.png', 'feed-animal-02.jpeg', 'feed-banner.png', 'feed-mario-kart-01.png'],
  ['feed-zelda-04.jpeg', 'feed-mario-kart-04.png', 'feed-splatoon.png', 'feed-zelda-05.jpeg', 'feed-movie.png'],
];
const guideCards = [
  {
    title: '슈퍼마리오 이거 맞냐? ㅋㅋㅋ',
    image: 'social-mario.png',
    summary: '슈퍼 마리오는 전설이다...\n내 카드, 내 통장, 내 지갑\n전부 이 자식이 0으로\n만들었다.',
    body: '그냥 넋놓고 계속함 입에 침 다 나온듯 ㄹㅇ로 해봐라 후회안한다. 아니다 후회는 했다. 이 겜을 산것을 후회를 했다. 그러나 그 후회는 인생에 한번은 경험해볼만한 후회다. ㄹㅇ로 형말 믿고 한번 해봐라 제발 글 읽고 해라 제발',
    game: 'Super Mario : Galaxy',
  },
  {
    title: '이거 팁 알려드림',
    image: 'guide-kirby.png',
    summary: '엉금엉금 비치 빠르게 넘기는 방법',
    body: '이 코스가 도착지인 경우 동쪽에서 진입할 때는 정방향(N)으로, 서쪽에서 진입할 때는 역방향(R)으로 레이스 트랙을 주행한다. 꽤 먼 코스에서 출발하여 이 코스로 도착하는 편도 경로가 몇 개 있는데, 이 코스의 레이스 트랙이 길이가 매우 짧기 때문에 이 코스로 도착하는 경우에 한하여 장거리 연결로를 몇 개 더 포함시킨 것으로 보인다.',
    game: 'Mario Kart World',
  },
  {
    title: '가이드 썼읍니다..',
    image: 'guide-last-of-us.png',
    summary: '라스트 오브 어스 / 공략\n합본',
    body: '안녕하세요. 이제는 머리에 버섯이 피려고 하는데요. 저의 500시간 노하우가 잔뜩 들어간 황무지 생존 가이드입니다. 가끔 가정 불화가 생길뻔한 위기가 닥치기도 했읍니다만....... 그럴때마다 이 게임으로 단련된 생존 기술은 무시 할순없더군요.....',
    game: 'The Last of Us',
  },
];
const communityCards = [
  { image: 'community-mario.png', title: 'ㅋㅋ뭔가요 이거? 누가 클레이로 마리오 만든거임?', game: 'Super Mario' },
  { image: 'community-splatoon.png', title: '좀 무섭네;; 버그 걸린건가 뭔데 이거', game: 'Splatoon' },
  { image: 'community-fire-emblem.png', game: 'Fire Emblem', reactions: true },
  { image: 'community-zelda.png', title: '나만 이러나', game: 'The Legend of Zelda' },
];
function Hero() {
  const [selected, setSelected] = useState(0);
  const game = heroGames[selected];
  return (
    <section className="community-hero">
      <video className="community-hero__background" src="/video/community/community-hero.mp4" autoPlay muted loop playsInline aria-hidden="true" />
      <div className="community-hero__blur-overlay" aria-hidden="true" />
      <div className="community-hero__visual"><img src={`${base}hero-main.png`} alt="슈퍼 마리오 갤럭시" /></div>
      <div className="community-hero__selector">
        <div className="community-hero__thumbs">
          {heroGames.map((item, index) => (
            <button type="button" className={selected === index ? 'is-active' : ''} key={item.name} onClick={() => setSelected(index)}>
              <span className="community-hero__thumb-image"><img src={`${base}${item.image}`} alt="" /></span>
              <span className="community-hero__thumb-title">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="community-hero__copy">
          <img src={`${base}hero-icon.png`} alt="" />
          <div>
            <h1>{selected === 0 ? '슈퍼 마리오 갤럭시' : game.name}</h1>
            <p>{selected === 0 ? '별의 아이 「치코」와 함께 은하를 누비는 마리오. 모험의 파트너가 된 별의 아이 치코와 함께, 마리오는 여러 행성을 넘나들며 펼쳐지는 우주 모험에 나섭니다.' : 'Nintendo 게임과 함께 새로운 모험을 시작해 보세요.'}</p>
          </div>
        </div>
      </div>
      <div className="community-hero__progress">{[0, 1, 2, 3].map((item) => <span className={item === 0 ? 'is-active' : ''} key={item} />)}</div>
    </section>
  );
}
function Feed() { return <section className="community-feed"><h2>피드</h2><div className="community-feed__grid">{feedColumns.map((column, index) => <div className="community-feed__column" key={index}>{column.map((image, imageIndex) => <div className="community-feed__image" key={`${image}-${imageIndex}`}><img src={`${base}${image}`} alt="" /></div>)}</div>)}</div></section>; }
function GameGuide() {
  return (
    <section className="community-guide">
      <h2>게임 가이드</h2>
      <div className="community-guide__frame">
        {guideCards.map((card) => (
          <article className="community-guide__card" key={card.title}>
            <h3>{card.title}</h3>
            <div className="community-guide__intro">
              <img className="community-guide__thumbnail" src={`${base}${card.image}`} alt="" />
              <p>{card.summary}</p>
            </div>
            <p className="community-guide__body">{card.body}</p>
            <div className="community-guide__stats">
              <img className="community-guide__stars" src={`${base}con2-rating-stars.svg`} alt="별점 5점" />
              <span className="community-guide__ratings">26 ratings</span>
              <img className="community-guide__award" src={`${base}con2-award.svg`} alt="수상" />
              <span className="community-guide__award-count">1</span>
              <img className="community-guide__comments-icon" src={`${base}con2-comment.svg`} alt="댓글" />
              <span className="community-guide__comments-count">7</span>
            </div>
            <img className="community-guide__divider" src={`${base}con2-divider.svg`} alt="" />
            <p className="community-guide__game">{card.game}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function CommunityPosts() {
  return (
    <section className="community-posts">
      <h2>Community</h2>
      <div className="community-posts__grid">
        {communityCards.map((card) => (
          <article className="community-post" key={card.game}>
            <img className="community-post__image" src={`${base}${card.image}`} alt="" />
            {card.reactions && (
              <div className="community-post__reactions" aria-label="반응 및 수상 정보">
                <img className="community-post__reaction-like" src={`${base}con3-like.svg`} alt="좋아요" />
                <img className="community-post__reaction-dislike" src={`${base}con3-like-filled.svg`} alt="싫어요" />
                <img className="community-post__reaction-award" src={`${base}con3-award.svg`} alt="수상" />
                <span>award</span>
              </div>
            )}
            {!card.reactions && <h3>{card.title}</h3>}
            <img className="community-post__divider" src={`${base}con3-divider.svg`} alt="" />
            <p>{card.game}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export default function Community() { return <div className="community-page"><Hero /><Feed /><GameGuide /><CommunityPosts /></div>; }
