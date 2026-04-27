import styles from './Menu.module.css';

const links = [
  { label: 'Quiénes Somos', href: '#nosotros' },
  { label: 'Eventos',       href: '#events'   },
  { label: 'Contacto',      href: '#contact'  },
];

function scrollSuave(e, href) {
  e.preventDefault();
  const destino = document.querySelector(href);
  if (!destino) return;
  destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <a href="#" className={styles.logoLink} onClick={(e) => scrollSuave(e, 'body')}>
        <span className={styles.logo}>SPACE VR +</span>
      </a>
      <ul className={styles.menuGrid}>
        {links.map(({ label, href }) => (
          <li key={href} className={styles.menuItem}>
            <a href={href} onClick={(e) => scrollSuave(e, href)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className={styles.menuCta}
            onClick={(e) => scrollSuave(e, '#contact')}
          >
            ▶ Reservar
          </a>
        </li>
      </ul>
    </nav>
  );
}
