import { useEffect, useState } from 'react';
import './community.css';

const base = `${import.meta.env.BASE_URL}images/community/`;
const videoBase = `${import.meta.env.BASE_URL}videos/community/`;
const heroGames = [
    {
        name: '슈퍼 마리오 갤럭시',
        image: 'hero-main.png',
        logo: 'hero-icon.png',
        video: 'hero-mario-galaxy.mp4',
        visual: 'hero-mario-galaxy.jpg',
        description: '별의 아이 치코와 함께 은하를 누비며 펼쳐지는 마리오의 우주 모험.',
    },
    {
        name: '젤다의 전설 브레스 오브 와일드',
        image: 'hero-zelda.png',
        logo: '../history/history-logo-grid-14.png',
        video: 'hero-zelda-botw.mp4',
        visual: 'hero-zelda-botw.jpg',
        description:
            '기억을 잃고 깨어난 링크가 광활한 하이랄을 탐험하며 왕국의 비밀을 마주하는 이야기.',
    },
    {
        name: '젤다의 전설 티어스 오브 더 킹덤',
        image: 'hero-kirby.png',
        logo: '../history/history-logo-grid-13.png',
        video: 'hero-zelda-totk.mp4',
        visual: 'hero-zelda-totk.jpg',
        description: '하늘과 대지로 확장된 하이랄에서 새로운 힘과 함께 다시 시작되는 링크의 모험.',
    },
    {
        name: '별의 커비 디스커버리',
        image: 'hero-animal.png',
        logo: '../history/history-logo-grid-07.png',
        video: 'hero-kirby.mp4',
        visual: 'hero_kirby.jpg',
        description: '수수께끼의 새로운 세계에서 웨이들 디를 구하기 위해 떠나는 커비의 모험.',
    },
    {
        name: '모여봐요 동물의 숲',
        image: 'hero-switch.png',
        logo: '../history/history-logo-grid-16.png',
        video: 'hero-animal-crossing.mp4',
        visual: 'hero-animal-crossing.jpg',
        description: '무인도에서 새로운 이웃들과 함께 나만의 섬 생활을 만들어가는 이야기.',
    },
    {
        name: '스플래툰 3',
        image: 'hero-extra.png',
        logo: '../history/history-logo-grid-12.png',
        video: 'hero-splatoon3.mp4',
        visual: 'hero-splatoon3.jpg',
        description: '카오폴리스에서 펼쳐지는 잉클링과 옥토링들의 짜릿한 영역 배틀 이야기.',
    },
];
const feedColumns = [
    [
        'feed-zelda-01.jpeg',
        'feed-rally-01.png',
        'feed-animal-01.jpeg',
        'feed-rally-02.png',
        'feed-bg.png',
    ],
    [
        'feed-mario-kart-01.png',
        'feed-animal-02.jpeg',
        'feed-animal-03.jpeg',
        'feed-zelda-02.jpeg',
        'feed-mario-kart-04.png',
    ],
    [
        'feed-mario-kart-02.png',
        'feed-zelda-03.jpeg',
        'feed-mario-object.png',
        'feed-mario-kart-03.png',
        'feed-bg.png',
    ],
    [
        'feed-bg.png',
        'feed-koopa.png',
        'feed-animal-02.jpeg',
        'feed-banner.png',
        'feed-mario-kart-01.png',
    ],
    [
        'feed-zelda-04.jpeg',
        'feed-mario-kart-04.png',
        'feed-splatoon.png',
        'feed-zelda-05.jpeg',
        'feed-movie.png',
    ],
];
const guideCards = [
    {
        title: '슈퍼마리오 이거 맞냐? ㅋㅋㅋ',
        image: 'social-mario.png',
        summary:
            '슈퍼 마리오는 전설이다...\n내 카드, 내 통장, 내 지갑\n전부 이 자식이 0으로\n만들었다.',
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
    {
        image: 'community-mario.png',
        title: 'ㅋㅋ뭔가요 이거? 누가 클레이로 마리오 만든거임?',
        game: 'Super Mario',
    },
    {
        image: 'community-splatoon.png',
        title: '좀 무섭네;; 버그 걸린건가 뭔데 이거',
        game: 'Splatoon',
    },
    { image: 'community-fire-emblem.png', game: 'Fire Emblem', reactions: true },
    { image: 'community-zelda.png', title: '나만 이러나', game: 'The Legend of Zelda' },
];
function HeroBackground({ game }) {
    const [layers, setLayers] = useState([game]);
    // Keep the playing outgoing video mounted only for the cross fade.
    if (layers[layers.length - 1] !== game) {
        setLayers([layers[layers.length - 1], game]);
    }

    return layers.map((layer) => (
        <video
            key={layer.video}
            className={`community-hero__background community-hero__background--${layer === game ? 'enter' : 'exit'}`}
            src={`${videoBase}${layer.video}`}
            poster={`${base}${layer.image}`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            onAnimationEnd={() => {
                if (layer !== game) {
                    setLayers((current) =>
                        current.filter(
                            (item) => item !== layer || item === current[current.length - 1]
                        )
                    );
                }
            }}
        />
    ));
}

function Hero() {
    const [selected, setSelected] = useState(0);
    const game = heroGames[selected];
    // The selected game occupies the large visual; the other five keep the Figma card slots.
    const upcomingGames = Array.from({ length: heroGames.length - 1 }, (_, offset) => {
        const index = (selected + offset + 1) % heroGames.length;
        return { ...heroGames[index], index };
    });

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setSelected((current) => (current + 1) % heroGames.length);
        }, 5000);
        return () => window.clearTimeout(timer);
    }, [selected]);

    return (
        <section className="community-hero">
            <HeroBackground game={game} />
            <div className="community-hero__blur-overlay" aria-hidden="true" />
            <div className="community-hero__visual">
                <img key={game.visual} src={`${base}${game.visual}`} alt={game.name} />
            </div>
            <div className="community-hero__selector">
                <div className="community-hero__thumbs">
                    {upcomingGames.map((item) => (
                        <button
                            type="button"
                            key={item.name}
                            onClick={() => setSelected(item.index)}
                        >
                            <span className="community-hero__thumb-image">
                                <img src={`${base}${item.image}`} alt="" />
                            </span>
                            <span className="community-hero__thumb-title">{item.name}</span>
                        </button>
                    ))}
                </div>
                <div key={game.video} className="community-hero__copy">
                    <img src={`${base}${game.logo}`} alt={`${game.name} 로고`} />
                    <div>
                        <h1>{game.name}</h1>
                        <p>{game.description}</p>
                    </div>
                </div>
            </div>
            <div
                key={selected}
                className="community-hero__progress"
                aria-label={`${game.name} 선택됨`}
            >
                {heroGames.map((item, index) => (
                    <span className={index === selected ? 'is-active' : ''} key={item.video} />
                ))}
            </div>
        </section>
    );
}
function Feed() {
    return (
        <section className="community-feed">
            <h2>피드</h2>
            <div className="community-feed__grid">
                {feedColumns.map((column, index) => (
                    <div className="community-feed__column" key={index}>
                        {column.map((image, imageIndex) => (
                            <div className="community-feed__image" key={`${image}-${imageIndex}`}>
                                <img src={`${base}${image}`} alt="" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
function GameGuide() {
    return (
        <section className="community-guide">
            <h2>게임 가이드</h2>
            <div className="community-guide__frame">
                {guideCards.map((card) => (
                    <article className="community-guide__card" key={card.title}>
                        <h3>{card.title}</h3>
                        <div className="community-guide__intro">
                            <img
                                className="community-guide__thumbnail"
                                src={`${base}${card.image}`}
                                alt=""
                            />
                            <p>{card.summary}</p>
                        </div>
                        <p className="community-guide__body">{card.body}</p>
                        <div className="community-guide__stats">
                            <img
                                className="community-guide__stars"
                                src={`${base}con2-rating-stars.svg`}
                                alt="별점 5점"
                            />
                            <span className="community-guide__ratings">26 ratings</span>
                            <img
                                className="community-guide__award"
                                src={`${base}con2-award.svg`}
                                alt="수상"
                            />
                            <span className="community-guide__award-count">1</span>
                            <img
                                className="community-guide__comments-icon"
                                src={`${base}con2-comment.svg`}
                                alt="댓글"
                            />
                            <span className="community-guide__comments-count">7</span>
                        </div>
                        <img
                            className="community-guide__divider"
                            src={`${base}con2-divider.svg`}
                            alt=""
                        />
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
                        <img
                            className="community-post__image"
                            src={`${base}${card.image}`}
                            alt=""
                        />
                        {card.reactions && (
                            <div
                                className="community-post__reactions"
                                aria-label="반응 및 수상 정보"
                            >
                                <img
                                    className="community-post__reaction-like"
                                    src={`${base}con3-like.svg`}
                                    alt="좋아요"
                                />
                                <img
                                    className="community-post__reaction-dislike"
                                    src={`${base}con3-like-filled.svg`}
                                    alt="싫어요"
                                />
                                <img
                                    className="community-post__reaction-award"
                                    src={`${base}con3-award.svg`}
                                    alt="수상"
                                />
                                <span>award</span>
                            </div>
                        )}
                        {!card.reactions && <h3>{card.title}</h3>}
                        <img
                            className="community-post__divider"
                            src={`${base}con3-divider.svg`}
                            alt=""
                        />
                        <p>{card.game}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
export default function Community() {
    return (
        <div className="community-page">
            <Hero />
            <Feed />
            <GameGuide />
            <CommunityPosts />
        </div>
    );
}
