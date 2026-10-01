import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import LogoIntro from './LogoIntro.jsx';
import IntroVideo from './IntroVideo.jsx';
import { lockIntroScroll } from './lockIntroScroll.js';
import './NintendoIntro.css';

export default function NintendoIntro() {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const revealRef = useRef(null);
  const videoFailedRef = useRef(false);
  const [phase, setPhase] = useState('logo');
  const [needsPlay, setNeedsPlay] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const video = videoRef.current;
    const releaseScroll = lockIntroScroll(panel);
    let revealing = false;
    const ctx = gsap.context(() => {}, panel);
    ctx.add('reveal', (skipped = false) => {
      if (revealing) return;
      revealing = true;
      video.pause();
      setPhase('revealing');
      gsap.to(panel, {
        yPercent: -100,
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.01 : skipped ? 0.45 : 1,
        ease: 'power3.inOut',
        onComplete: () => {
          releaseScroll();
          setPhase('complete');
        },
      });
    });
    revealRef.current = ctx.reveal;
    return () => {
      revealRef.current = null;
      video.pause();
      ctx.revert();
      releaseScroll();
    };
  }, []);

  useLayoutEffect(() => {
    if (phase !== 'video') return;
    if (videoFailedRef.current) {
      revealRef.current?.();
      return;
    }
    const video = videoRef.current;
    let active = true;
    video.currentTime = 0;
    video.muted = true;
    video.play().catch(error => {
      if (!active || error.name === 'AbortError') return;
      if (error.name === 'NotAllowedError') setNeedsPlay(true);
      else revealRef.current?.();
    });
    return () => { active = false; };
  }, [phase]);

  const completeLogo = useCallback(() => setPhase('video'), []);
  const handleEnded = event => {
    if (phase === 'video' && event.currentTarget.ended) revealRef.current?.();
  };
  const handleError = () => {
    videoFailedRef.current = true;
    if (phase === 'video') revealRef.current?.();
  };
  const resumeVideo = () => {
    videoRef.current.play().then(() => setNeedsPlay(false)).catch(() => revealRef.current?.());
  };
  const moveSkip = event => {
    if (event.pointerType !== 'mouse' || !skipRef.current) return;
    const skip = skipRef.current;
    skip.style.left = `${event.clientX}px`;
    skip.style.top = `${event.clientY}px`;
    skip.style.right = 'auto';
  };

  if (phase === 'complete') return null;
  return createPortal(
    <div
      className="nintendo-intro"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Nintendo 인트로"
      tabIndex={-1}
      data-phase={phase === 'logo' ? 'aligned' : phase}
      data-video-ready={videoReady}
      onPointerMove={moveSkip}
    >
      {phase === 'logo' && <LogoIntro onComplete={completeLogo} />}
      <IntroVideo
        videoRef={videoRef}
        active={phase === 'video'}
        onEnded={handleEnded}
        onError={handleError}
        onPlaying={() => setVideoReady(true)}
      />
      {needsPlay && phase === 'video' && (
        <button className="nintendo-intro__play" type="button" onClick={resumeVideo}>영상 재생</button>
      )}
      {phase !== 'revealing' && (
        <button ref={skipRef} className="nintendo-intro__skip" type="button" onClick={() => revealRef.current?.(true)}>
          SKIP
        </button>
      )}
    </div>,
    document.body,
  );
}
