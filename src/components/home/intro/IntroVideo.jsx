import { useId, useLayoutEffect, useRef } from 'react';

export default function IntroVideo({ videoRef, active, onEnded, onError, onPlaying }) {
  const filterId = `intro-video-${useId().replace(/:/g, '')}`;
  const matrixRef = useRef(null);

  useLayoutEffect(() => {
    const panel = matrixRef.current.closest('.nintendo-intro');
    const channels = getComputedStyle(panel).backgroundColor.match(/[\d.]+/g).slice(0, 3).map(Number);
    // This supplied clip is a white silhouette over decoded RGB(247,23,13).
    // Its green channel is the silhouette coverage. Map that coverage onto the
    // existing red token and white, preserving the soft edge and original file.
    const rows = channels.flatMap(channel => [
      0, (255 - channel) / 232, 0, 0,
      channel / 255 - (255 - channel) * 23 / (232 * 255),
    ]);
    matrixRef.current.setAttribute('values', [...rows, 0, 0, 0, 1, 0].join(' '));
  }, []);

  return (
    <div className="nintendo-intro__video-wrapper">
      <svg className="nintendo-intro__filter" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix ref={matrixRef} type="matrix" />
          </filter>
        </defs>
      </svg>
      <video
        ref={videoRef}
        className="nintendo-intro__video"
        style={{ filter: `url(#${filterId})` }}
        src={`${import.meta.env.BASE_URL}videos/Sequence%2002_1.mp4`}
        autoPlay={active}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        onEnded={onEnded}
        onError={onError}
        onPlaying={onPlaying}
      />
    </div>
  );
}
