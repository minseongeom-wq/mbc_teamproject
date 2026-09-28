import { useEffect, useRef, useState } from 'react';
import './mypage.css';

// ── 1. 이미지 경로와 미리보기 데이터 ──
const asset = (name) => new URL(`./assets/${name}`, import.meta.url).href;
// Preview data from Figma; replace through MyPageDashboard props for a connected account.
const orders = [
  ['b1cd4.png', '저스트 댄스 2026 에디션 - 스탠다드 에디션', '2026.9.21.', '₩59,000'],
  [
    '32514.png',
    '젤다의 전설 브레스 오브 더 와일드 Nintendo Switch2 업그레이드 패스',
    '2026.6.7.',
    '₩10,000',
  ],
  ['ccca8.png', '스플래툰 3', '2026.2.11.', '₩64,800'],
  ['f9efa.png', 'Nintendo Switch AC 어댑터', '2025.12.15.', '₩33,800'],
  ['0825e.png', '슈퍼 마리오 갤럭시 + 슈퍼 마리오 갤럭시 2', '2025.10.15.', '₩74,800'],
  ['d553f.png', 'Nintendo Switch(OLED 모델)', '2025.9.1.', '₩465,000'],
];
const activities = ['f015e.png', 'a965f.png', 'a965f.png', 'a965f.png', 'eac73.png'].map(
  (image, id) => ({ id, image, name: 'game name', hours: 18, lastPlayed: '14 Aug' }),
);
const reviews = [
  [
    'f015e.png',
    '게임 이름',
    '친구들이랑 같이 추니까 시간 가는줄\n몰라요! 살 쭉쭉 빠질듯 ㅋㅋㅋㅋ',
    5,
  ],
  [
    'a965f.png',
    '슈퍼마리오 갤럭시',
    '원더플라워 먹을 때마다 맵이 바뀌어서\n보는 재미까지 있음!',
    5,
  ],
  ['9ce7b.png', '동물의 숲', '동물의 숲 한줄 정리\n노가다를 통한 섬꾸미기. 힐링게임!', 4],
  ['eac73.png', '젤다의 전설', '가는 곳마다 발견할 게 있어서 탐험만\n해도 재밌어요.', 5],
];
const friends = [
  ['1d81c.png', '점프하다낙사', 3, 27],
  ['ec895.png', '피카츄돈까스', 3, 25],
  ['1aa65.png', '조이콘잃어버림', 5, 38],
  ['ff04b.png', '너굴한테빚짐', 6, 76],
  ['9204d.png', '복숭아아이스티제조기', 10, 23],
  ['11f54.png', '버섯알레르기', 13, 30],
  ['f5428.png', '물감단종녀', 14, 44],
];

// ── 2. 페이지 상태와 편집 다이얼로그 ──

function readProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem('nintendo-mypage-profile'));
    return {
      name: typeof saved?.name === 'string' ? saved.name : '',
      introduction: typeof saved?.introduction === 'string' ? saved.introduction : '',
    };
  } catch {
    return {};
  }
}
export default function MyPageDashboard({
  activityItems = activities,
  friendItems = friends,
  orderItems = orders,
  reviewItems = reviews,
}) {
  const [profile, setProfile] = useState(readProfile);
  const [panel, setPanel] = useState(null);
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');
  const dialog = useRef(null);
  const trigger = useRef(null);
  const name = profile.name || '요시알삶아먹기';
  useEffect(() => {
    if (panel) dialog.current?.showModal();
    else {
      dialog.current?.close();
      trigger.current?.focus();
    }
  }, [panel]);
  function open(title) {
    trigger.current = document.activeElement;
    setDraft(title === '닉네임 편집' ? name : profile.introduction || '');
    setNotice('');
    setPanel(title);
  }
  function save(event) {
    event.preventDefault();
    const next = { ...profile, [panel === '닉네임 편집' ? 'name' : 'introduction']: draft.trim() };
    setProfile(next);
    try {
      localStorage.setItem('nintendo-mypage-profile', JSON.stringify(next));
    } catch {
      setNotice('브라우저 저장 공간을 사용할 수 없어 이번 화면에만 반영했습니다.');
    }
    setPanel(null);
  }
  const editing = panel === '닉네임 편집' || panel === '자기 소개 편집';
  return (
    <div className="mypage-dashboard">
      <ProfileHeader name={name} onEdit={() => open('닉네임 편집')} onSocial={open} />
      <div className="mypage-dashboard__content">
        <div>
          <Introduction value={profile.introduction} onEdit={() => open('자기 소개 편집')} />
          <ActivityList items={activityItems} onMore={() => open('최근 활동')} />
        </div>
        <div>
          <OrderList items={orderItems} onMore={() => open('주문 내역')} />
          <div className="mypage-dashboard__social">
            <ReviewList items={reviewItems} />
            <FriendList items={friendItems} />
          </div>
        </div>
      </div>
      {notice && <p role="status">{notice}</p>}
      <dialog
        ref={dialog}
        className="mypage-dashboard__dialog"
        aria-labelledby="mypage-dialog-title"
        onCancel={() => setPanel(null)}
        onClose={() => setPanel(null)}
      >
        <div className="mypage-dashboard__dialog-header">
          <h2 id="mypage-dialog-title">{panel}</h2>
          <button type="button" aria-label="닫기" onClick={() => setPanel(null)}>
            ×
          </button>
        </div>
        {editing ? (
          <form onSubmit={save}>
            <label htmlFor="mypage-draft">{panel === '닉네임 편집' ? '닉네임' : '자기 소개'}</label>
            {panel === '닉네임 편집' ? (
              <input
                id="mypage-draft"
                autoFocus
                required
                maxLength={20}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                pattern=".*\S.*"
              />
            ) : (
              <textarea
                id="mypage-draft"
                autoFocus
                rows={5}
                maxLength={300}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            )}
            <div className="mypage-dashboard__dialog-actions">
              <button type="button" onClick={() => setPanel(null)}>
                취소
              </button>
              <button type="submit">저장</button>
            </div>
          </form>
        ) : panel === '최근 활동' ? (
          <ActivityList items={activityItems} />
        ) : panel === '주문 내역' ? (
          <OrderList items={orderItems} />
        ) : panel === '친구' ? (
          <FriendList items={friendItems} expanded />
        ) : (
          <p>아직 연결된 {panel} 상세 정보가 없습니다.</p>
        )}
      </dialog>
    </div>
  );
}

// ── 3. 프로필 영역 ──

function ProfileHeader({ name, onEdit, onSocial }) {
  const [status, setStatus] = useState('온라인');
  const [settings, setSettings] = useState(false);
  return (
    <section className="mypage-dashboard__profile" aria-label="내 프로필">
      <div className="mypage-dashboard__identity">
        <div className="mypage-dashboard__avatar">
          <img src={asset('81bc1.png')} alt="요시 프로필" />
        </div>
        <div className="mypage-dashboard__profile-info">
          <div className="mypage-dashboard__name">
            <h1>{name}</h1>
            <button type="button" aria-label="닉네임 편집" onClick={onEdit}>
              <img src={asset('505a5.svg')} alt="" />
            </button>
          </div>
          <div className="mypage-dashboard__stats">
            {[
              ['친구', 7],
              ['팔로잉', 3],
              ['팔로워', 2],
            ].map(([label, count]) => (
              <button type="button" key={label} onClick={() => onSocial(label)}>
                <strong>{count}</strong>
                <span>
                  {label}
                  <img src={asset('4da52.svg')} alt="" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mypage-dashboard__profile-actions">
        <label className="mypage-dashboard__status">
          <img
            src={asset('becb3.svg')}
            alt=""
            style={{ opacity: status === '온라인' ? 1 : 0.35 }}
          />
          <select
            aria-label="온라인 상태"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>온라인</option>
            <option>자리 비움</option>
            <option>오프라인</option>
          </select>
          <img className="mypage-dashboard__down" src={asset('ff995.svg')} alt="" />
        </label>
        <div className="mypage-dashboard__settings">
          <button type="button" aria-expanded={settings} onClick={() => setSettings(!settings)}>
            <img src={asset('95003.svg')} alt="" />
            설정
            <img className="mypage-dashboard__down" src={asset('ff995.svg')} alt="" />
          </button>
          {settings && (
            <div className="mypage-dashboard__settings-menu">
              <button type="button"
                onClick={() => {
                  setSettings(false);
                  onEdit();
                }}
              >
                닉네임 변경
              </button>
              <button type="button"
                onClick={() => {
                  setSettings(false);
                  document.getElementById('mypage-intro-edit')?.click();
                }}
              >
                자기 소개 편집
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── 4. 자기 소개 · 최근 활동 · 주문 내역 · 리뷰 · 친구 목록 ──

function Introduction({ value, onEdit }) {
  return (
    <section>
      <h2>자기 소개</h2>
      <div className="mypage-dashboard__intro">
        <p>{value || '간략하게 자기소개를 작성해보세요.'}</p>
        <button type="button" id="mypage-intro-edit" className="mypage-dashboard__edit" onClick={onEdit}>
          자기 소개 편집 <img src={asset('9f3d1.svg')} alt="" />
        </button>
      </div>
    </section>
  );
}
function GameImage({ file }) {
  return (
    <div className={`mypage-dashboard__game-image mypage-dashboard__game-image--${file.split('.')[0]}`}>
      <img src={asset(file)} alt="" />
    </div>
  );
}
function ActivityList({ items, onMore }) {
  return (
    <section className="mypage-dashboard__activity">
      <h2>최근 활동</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <GameImage file={item.image} />
            <span>{item.name}</span>
            <p>
              {item.hours} hrs on record
              <br />
              last played on {item.lastPlayed}
            </p>
          </li>
        ))}
      </ul>
      {onMore && (
        <button type="button" className="mypage-dashboard__more" onClick={onMore}>
          더보기
        </button>
      )}
    </section>
  );
}
function OrderList({ items, onMore }) {
  return (
    <section className="mypage-dashboard__orders">
      <h2>주문 내역</h2>
      <ul>
        {items.map(([image, name, date, price]) => (
          <li key={name}>
            <div
              className={`mypage-dashboard__order-image ${image === '32514.png' ? 'mypage-dashboard__order-image--zoom' : ''}`}
            >
              <img src={asset(image)} alt="" />
            </div>
            <div>
              <p>{name}</p>
              <time>{date}</time>
            </div>
            <span>{price}</span>
          </li>
        ))}
      </ul>
      {onMore && (
        <button type="button" className="mypage-dashboard__more" onClick={onMore}>
          더보기
        </button>
      )}
    </section>
  );
}
function ReviewList({ items }) {
  return (
    <section className="mypage-dashboard__reviews">
      <h2>남긴 리뷰</h2>
      <ul>
        {items.map(([image, name, text, rating]) => (
          <li key={name}>
            <div>
              <GameImage file={image} />
              <img
                className="mypage-dashboard__rating"
                src={asset(rating === 4 ? 'bd1df.svg' : 'b4422.svg')}
                alt={`5점 만점에 ${rating}점`}
              />
            </div>
            <div>
              <h3>{name}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
function FriendList({ items, expanded = false }) {
  return (
    <section className="mypage-dashboard__friends">
      <h2>친구들</h2>
      <ul
        className={expanded ? 'mypage-dashboard__friends-list--expanded' : ''}
        tabIndex={expanded ? undefined : 0}
        aria-label="친구 목록"
      >
        {items.map(([image, name, hours, level]) => (
          <li key={name}>
            <img src={asset(image)} alt="" />
            <div>
              <p>{name}</p>
              <p>{hours}시간 전 온라인</p>
            </div>
            <span aria-label={`레벨 ${level}`}>{level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
