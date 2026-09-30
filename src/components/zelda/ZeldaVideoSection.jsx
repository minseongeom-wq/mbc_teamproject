import { useEffect, useRef } from 'react';
import './zeldaVideoSection.css';

export default function ZeldaVideoSection() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;

    let frame = 0;
    let videoVisible = false;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = track.offsetHeight - window.innerHeight;
        const progress = distance > 0
          ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance))
          : 1;
        const clamp = value => Math.min(1, Math.max(0, value));
        const introProgress = progress * 4;
        const transitionProgress = clamp(progress * 4 - 1);
        const zoomPosition = clamp((progress * 4 - 2 - 0.08) / 0.72);
        const zoomProgress = zoomPosition * zoomPosition * (3 - 2 * zoomPosition);
        const exitPosition = clamp((progress * 4 - 3 - 0.08) / 0.62);
        const titleExit = exitPosition * exitPosition * (3 - 2 * exitPosition);
        const lineProgress = clamp(introProgress / 0.56);
        const textProgress = clamp((introProgress - 0.58) / 0.27);
        const lineExit = clamp(transitionProgress / 0.45);
        // Movement starts when one third of the line has disappeared.
        const textSpread = clamp((transitionProgress - 0.15) / 0.45);
        const diamondProgress = clamp((transitionProgress - 0.62) / 0.2);

        stage.style.setProperty('--line-progress', lineProgress);
        stage.style.setProperty('--text-progress', textProgress);
        stage.dataset.textRevealed = String(textProgress === 1);
        stage.style.setProperty('--line-exit', lineExit);
        stage.style.setProperty('--text-spread', textSpread);
        stage.style.setProperty('--diamond-progress', diamondProgress);
        stage.style.setProperty('--border-first-progress', clamp((transitionProgress - 0.62) / 0.12));
        stage.style.setProperty('--border-second-progress', clamp((transitionProgress - 0.74) / 0.12));
        stage.style.setProperty('--zoom-progress', zoomProgress);
        stage.style.setProperty('--title-exit', titleExit);
        const bounds = track.getBoundingClientRect();
        const shouldPlay = diamondProgress > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight;
        if (shouldPlay !== videoVisible) {
          videoVisible = shouldPlay;
          if (shouldPlay) videoRef.current?.play().catch(() => {});
          else videoRef.current?.pause();
        }
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      videoRef.current?.pause();
    };
  }, []);

  return (
    <div className="zelda-video__scroll-track" ref={trackRef}>
      <section
        className="zelda-video"
        ref={stageRef}
        aria-labelledby="zelda-video-title"
      >
        <div className="zelda-video__scene">
        <img
          className="zelda-video__center-line"
          src={`${import.meta.env.BASE_URL}images/zelda/video-divider.svg`}
          alt=""
          aria-hidden="true"
        />
        <h2 className="zelda-video__title" id="zelda-video-title">
          <span className="zelda-video__word-window zelda-video__word-window--explore">
            <span className="zelda-video__word zelda-video__word--explore">EXPLORE</span>
          </span>
          <span className="zelda-video__word-window zelda-video__word-window--hyrule">
            <span className="zelda-video__word zelda-video__word--hyrule">HYRULE</span>
          </span>
        </h2>
        <div className="zelda-video__big-diamond">
          {[1, 2, 3, 4].map(number => (
            <img
              key={number}
              className={`zelda-video__diamond-line zelda-video__diamond-line--${number}`}
              src={`${import.meta.env.BASE_URL}images/zelda/video-diamond-line-${number}.svg`}
              alt=""
              aria-hidden="true"
            />
          ))}
          <video
            className="zelda-video__footage"
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}videos/zelda/breath-of-the-wild.mp4`}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="젤다의 전설 브레스 오브 더 와일드 플레이 영상"
          />
        </div>
        <p className="zelda-video__description">
          끝없이 펼쳐진 대지, 수많은 전설이 잠든 하이랄.<br />
          그곳에서 새로운 모험이 시작됩니다.
        </p>
        <img
          className="zelda-video__diamonds"
          src={`${import.meta.env.BASE_URL}images/zelda/video-left-diamond-bar.svg`}
          alt=""
          data-node-id="1595:2593"
          data-name="left_Diamind-bar"
          aria-hidden="true"
        />
        </div>
      </section>
    </div>
  );
}
