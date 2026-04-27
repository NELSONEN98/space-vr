import styles from './Header.module.css';
import Menu from './Menu.jsx';

export default function Header() {
  return (
    <header className={styles.header}>
      <Menu />
      <div className={styles['header-grid']}>
        <div className={styles["header-title"]}>
          <h1 className={styles["header-title-text"]}>SPACE VR +</h1> 
          <p className={styles["header-title-description"]}>Vive una experiencia única en realidad virtual. Sumérgete en mundos increíbles y disfruta de divertidos juegos con la mejor tecnología VR.</p>
        </div>
        <div className="header-image-kids">
          <img src="/images/kids-beta.png" alt="Kids" />
        </div>
        
      </div>
      
    </header>
  );
}