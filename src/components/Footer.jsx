import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glowLine} />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>◆ SPACE VR+</span>
          <p className={styles.tagline}>// EL FUTURO DEL ENTRETENIMIENTO, HOY.</p>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            <span>SYSTEM ONLINE · PLAYERS ACTIVE: 2,847</span>
          </div>
        </div>
        <nav className={styles.links}>
          <span className={styles.linksTitle}>// NAV</span>
          <a href="#experiences">▸ Experiencias</a>
          <a href="#events">▸ Eventos</a>
          <a href="#contact">▸ Contacto</a>
        </nav>
        <div className={styles.social}>
          <span className={styles.linksTitle}>// SOCIAL</span>
          <a href="#" aria-label="Instagram">▸ Instagram</a>
          <a href="#" aria-label="TikTok">▸ TikTok</a>
          <a href="#" aria-label="YouTube">▸ YouTube</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 SPACE VR+.EXE · ALL_RIGHTS_RESERVED</span>
        <span>BUILD v2.0.77</span>
      </div>
    </footer>
  );
}
