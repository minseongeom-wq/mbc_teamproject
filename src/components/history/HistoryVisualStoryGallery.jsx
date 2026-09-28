import "./HistoryVisualStoryGallery.css";

function HistoryVisualStoryGallery() {
  return (
    <section className="history-visual-story">
      <h2 className="history-visual-story__title">
        HOW NINTENDO PLAYS
      </h2>

      <p className="history-visual-story__label history-visual-story__label--01">
        FROM AN IDEA
      </p>

      <p className="history-visual-story__label history-visual-story__label--02">
        IDEAS BECOME PLAY
      </p>

      <p className="history-visual-story__label history-visual-story__label--03">
        PLAY BECOMES JOY
      </p>

      <p className="history-visual-story__label history-visual-story__label--04">
        TO SHARED JOY
      </p>

      {/* CREATE */}
      <article className="history-card history-card--create">
        <img
          className="history-card__image"
          src="/images/history/history-create.png"
          alt=""
        />

        <div className="history-card__bottom">
          <h3>CREATE</h3>

          <p>
            익숙한 방식에 머무르지 않고
            <br />
            새로운 아이디어와 기술을 통해
            <br />
            지금까지 없던 놀이를 만들어갑니다
          </p>
        </div>
      </article>

      {/* PLAY */}
      <article className="history-card history-card--play">
        <img
          className="history-card__image"
          src="/images/history/history-play.png"
          alt=""
        />

        <div className="history-card__bottom">
          <h3>PLAY</h3>

          <p>
            닌텐도는 어디서든 시대마다
            <br />
            새로운 방식으로 게임을
            <br />
            즐기는 경험을 확장해 왔습니다.
          </p>
        </div>
      </article>

      {/* SHARE */}
      <article className="history-card history-card--share">
        <img
          className="history-card__image"
          src="/images/history/history-share.png"
          alt=""
        />

        <div className="history-card__bottom">
          <h3>SHARE</h3>

          <p>
            혼자서 시작한 놀이가
            <br />
            가족과 친구, 세대를 넘어
            <br />
            함께하는 즐거움으로 이어집니다.
          </p>
        </div>
      </article>
    </section>
  );
}

export default HistoryVisualStoryGallery;