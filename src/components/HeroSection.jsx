import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      tl.from('[data-hero="status"]',   { y: -20, opacity: 0, duration: 0.5 })
        .from('[data-hero="brand"]',    { y: 28, opacity: 0, duration: 0.6 }, '-=0.2')
        .from('[data-hero="headline"]', { y: 70, opacity: 0, duration: 0.85 }, '-=0.35')
        .from('[data-hero="tagline"]',  { y: 32, opacity: 0, duration: 0.65 }, '-=0.45')
        .from('[data-hero="cta"]',      { y: 22, opacity: 0, duration: 0.5  }, '-=0.38')
        .from('[data-hero="stat"]',     { y: 20, opacity: 0, duration: 0.55, stagger: 0.13 }, '-=0.3')
        .from('[data-hero="scene"]',    { scale: 0.7, opacity: 0, duration: 1.3, ease: 'back.out(1.5)' }, '-=1');

      // Glitch periódico en headline
      gsap.to('[data-hero="headline"]', {
        skewX: 2,
        duration: 0.08,
        repeat: -1,
        repeatDelay: 4.5,
        yoyo: true,
        ease: 'rough({ template: none.out, strength: 1, points: 8, taper: none, randomize: true })',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Video full-cover background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.heroBg}
        src="/videos/glitch-hero.mp4"
      />
      <div className={styles.heroOverlay} />

      {/* Status bar superior tipo HUD */}
     

      <div className={styles.heroLeft}>
        <div data-hero="brand" className={styles.brand}>
          <span className={styles.brandName} data-text="SPACE VR+">SPACE VR+</span>
       
        </div>
        <h1 data-hero="headline" className={styles.headline}>
          <span className={styles.headlineLine} data-text="VIVE EL" data-glitch>VIVE EL</span>
          <span className={`${styles.headlineLine} ${styles.accent}`} data-text="FUTURO">FUTURO</span>
          <span className={styles.headlineLine} data-text="HOY" data-glitch>HOY</span>
        </h1>
        <p data-hero="tagline" className={styles.tagline}>
          <span className={styles.taglinePrompt}>&gt;</span>
          Sumérgite en mundos increíbles. La mejor tecnología VR te espera.
          <span className={styles.cursor}>_</span>
        </p>
        <a data-hero="cta" href="#contact" className={styles.cta}>
          <span className={styles.ctaIcon}>▶</span>
          PRESS_START
          <span className={styles.ctaArrow}>→</span>
        </a>
        <div className={styles.stats}>
          <div data-hero="stat" className={styles.stat}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>// EXPERIENCIAS</span>
          </div>
          <div data-hero="stat" className={styles.stat}>
            <span className={styles.statNumber}>4K</span>
            <span className={styles.statLabel}>// RESOLUCIÓN</span>
          </div>
          <div data-hero="stat" className={styles.stat}>
            <span className={styles.statNumber}>120Hz</span>
            <span className={styles.statLabel}>// REFRESH RATE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
