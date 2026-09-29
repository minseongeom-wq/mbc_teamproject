import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import './mypage.css';

const accountStats = [
  ['팔로우', '0'],
  ['팔로잉', '0'],
  ['구매 상품', '0'],
  ['남긴 리뷰', '0'],
  ['보유한 게임 수', '0'],
];

const inquiries = [
  { title: '배송 예정일을 확인하고 싶습니다.', status: '접수 완료', tone: 'complete' },
  { title: '스위치 모델 문의드립니다.', status: '확인 중', tone: 'pending' },
  { title: '교환 절차가 궁금합니다.', status: '답변 완료', tone: 'complete' },
];

export default function MyPage() {
  return (
    <div className="mypage" data-node-id="3025:9409">
      <div className="mypage__canvas">
        <header className="mypage__heading">
          <p className="mypage__eyebrow">YOUR PESONAL EDIT</p>
          <span className="mypage__pixels" aria-hidden="true"><i /><i /><i /><i /></span>
          <h1>MY PAGE</h1>
          <div className="mypage__rule mypage__rule--heading" />
        </header>

        <section className="mypage__account" aria-label="내 계정">
          <img className="mypage__avatar" src="/images/mypage/profile-avatar.png" alt="요시 프로필" width="96" height="96" />
          <div className="mypage__identity">
            <p className="mypage__greeting">test 사용자님, 반가워요</p>
            <p className="mypage__username">@test123</p>
          </div>
          <div className="mypage__account-actions">
            <button type="button"><span>프로필 수정</span></button>
            <button type="button"><span>로그아웃</span></button>
          </div>
        </section>

        <dl className="mypage__stats" aria-label="계정 활동">
          {accountStats.map(([label, value]) => (
            <div className="mypage__stat" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mypage__activity mypage__activity--games">
          <h2>최근 플레이한 게임</h2>
          <div className="mypage__rule" />
          <div className="mypage__empty mypage__empty--games">
            <span className="mypage__dot" aria-hidden="true" />
            <p className="mypage__empty-title">최근 플레이한 게임이 없습니다.</p>
            <p className="mypage__empty-caption">새로운 게임을 둘러보세요!</p>
            <Link className="mypage__more" to={routePaths.store}>더보기</Link>
          </div>
          <div className="mypage__rule mypage__rule--bottom" />
        </section>

        <section className="mypage__activity mypage__activity--orders">
          <h2>주문 내역</h2>
          <div className="mypage__rule" />
          <div className="mypage__empty mypage__empty--orders">
            <span className="mypage__dot" aria-hidden="true" data-node-id="3025:14618" />
            <p className="mypage__empty-title">아직 주문한 상품이 없습니다.</p>
            <p className="mypage__empty-caption">새로운 컬렉션을 둘러보세요!</p>
            <Link className="mypage__more" to={routePaths.store}>더보기</Link>
          </div>
          <div className="mypage__rule mypage__rule--bottom" />
        </section>

        <section className="mypage__activity mypage__activity--reviews">
          <h2>내가 작성한 리뷰</h2>
          <Link className="mypage__view-all" to={routePaths.community}>전체보기</Link>
          <div className="mypage__review-row">
            <p>젤다 플레이 후기 1000일차</p>
            <span>좋아요 40</span>
          </div>
          <div className="mypage__rule mypage__rule--bottom" />
        </section>

        <section className="mypage__activity mypage__activity--inquiries">
          <h2>고객문의 내역</h2>
          <Link className="mypage__view-all" to={routePaths.support}>전체보기</Link>
          <div className="mypage__inquiry-list">
            {inquiries.map(({ title, status, tone }) => (
              <div className="mypage__inquiry" key={title}>
                <p>{title}</p>
                <span className={`mypage__status mypage__status--${tone}`}>{status}</span>
              </div>
            ))}
          </div>
          <div className="mypage__rule mypage__rule--bottom" />
        </section>
      </div>
    </div>
  );
}
