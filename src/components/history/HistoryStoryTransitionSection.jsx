import './HistoryStoryTransitionSection.css';

function HistoryStoryTransitionSection() {
    return (
        <section className="history-story-transition">
            <img
                className="history-story-transition__bg"
                src="/images/history/story-transition.png"
                alt=""
            />

            <div className="history-story-transition__top-line">
                <div className="history-story-transition__top-line-left" />
                <div className="history-story-transition__top-line-right" />
            </div>

            <div className="history-story-transition__panel history-story-transition__panel--left">
                <div className="history-story-transition__text history-story-transition__text--left">
                    <strong>OUR BEGINNING</strong>

                    <p>
                        1889년 교토에서 화투 제작으로 시작한 닌텐도는
                        <br />
                        시대의 변화와 함께 새로운 놀이의 형태를 만들어 왔습니다.
                    </p>
                </div>
            </div>

            <div className="history-story-transition__panel history-story-transition__panel--right">
                <div className="history-story-transition__text history-story-transition__text--right">
                    <strong>OUR PHILOSOPHY</strong>

                    <p>
                        형태는 달라져도 놀이가 주는 즐거움은 변하지 않습니다.
                        <br />
                        닌텐도는 언제나 새로운 방식으로 사람과 사람을 연결해 왔습니다.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HistoryStoryTransitionSection;
