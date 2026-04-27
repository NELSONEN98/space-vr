import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ExperiencesSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    code: 'EXP_01',
    title: 'Zombie Apocalypse',
    description: 'Sobreviví el fin del mundo con hasta 4 jugadores. Hordas infinitas, pánico real.',
    genre: 'ACCIÓN · TERROR',
    players: '1–4',
    duration: '30 min',
    difficulty: 'EXTREME',
    emoji: '🧟',
  },
  {
    id: 2,
    code: 'EXP_02',
    title: 'Space Odyssey',
    description: 'Explorá las profundidades del universo, viajá entre planetas y enfrentá lo desconocido.',
    genre: 'AVENTURA · SCI-FI',
    players: '1–2',
    duration: '25 min',
    difficulty: 'NORMAL',
    emoji: '🚀',
  },
  {
    id: 3,
    code: 'EXP_03',
    title: 'Beat Blasters',
    description: 'Destruí bloques al ritmo de la música. La experiencia rítmica más adictiva de la VR.',
    genre: 'MÚSICA · FITNESS',
    players: '1',
    duration: '20 min',
    difficulty: 'NORMAL',
    emoji: '🎵',
  },
  {
    id: 4,
    code: 'EXP_04',
    title: 'Dragon Kingdom',
    description: 'Montá dragones y defendé tu reino en una épica aventura de fantasía medieval.',
    genre: 'FANTASÍA · ÉPICO',
    players: '1–2',
    duration: '35 min',
    difficulty: 'HARD',
    emoji: '🐉',
  },
  {
    id: 5,
    code: 'EXP_05',
    title: 'Speed Racer',
    description: 'Manejá a velocidades extremas en circuitos futuristas del año 2150.',
    genre: 'CARRERAS',
    players: '1–4',
    duration: '20 min',
    difficulty: 'NORMAL',
    emoji: '🏎️',
  },
  {
    id: 6,
    code: 'EXP_06',
    title: 'Ocean Deep',
    description: 'Buceá en los misterios del océano profundo y descubrí criaturas que nadie ha visto.',
    genre: 'EXPLORACIÓN',
    players: '1',
    duration: '30 min',
    difficulty: 'EASY',
    emoji: '🌊',
  },
];

const difficultyColor = {
  EASY: 'var(--color-accent)',
  NORMAL: 'var(--color-warning)',
  HARD: 'var(--color-accent-3)',
  EXTREME: 'var(--color-accent-2)',
};

export default function ExperiencesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-exp="header"]', {
        scrollTrigger: { trigger: '[data-exp="header"]', start: 'top 82%' },
        y: 55, opacity: 0, duration: 0.85, ease: 'power3.out',
      });

      gsap.from('[data-exp="card"]', {
        scrollTrigger: { trigger: '[data-exp="grid"]', start: 'top 78%' },
        y: 70, opacity: 0, scale: 0.92, duration: 0.65,
        ease: 'power3.out', stagger: 0.09,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experiences" className={styles.section}>
      <div data-exp="header" className={styles.header}>
        <span className={styles.badge}>// CATÁLOGO_DE_JUEGOS</span>
        <h2 className={styles.title}>SELECCIONÁ TU MISIÓN</h2>
        <p className={styles.subtitle}>
          <span className={styles.subtitlePrompt}>&gt;</span>
          {experiences.length} experiencias disponibles. Cada partida es única.
        </p>
      </div>
      <div data-exp="grid" className={styles.grid}>
        {experiences.map((exp) => (
          <article key={exp.id} data-exp="card" className={styles.card}>
            <span className={styles.cornerTL} />
            <span className={styles.cornerTR} />
            <span className={styles.cornerBL} />
            <span className={styles.cornerBR} />

            <div className={styles.cardTop}>
              <span className={styles.cardCode}>{exp.code}</span>
              <span
                className={styles.cardDifficulty}
                style={{ color: difficultyColor[exp.difficulty], borderColor: difficultyColor[exp.difficulty] }}
              >
                {exp.difficulty}
              </span>
            </div>

            <div className={styles.cardEmoji}>
              <span>{exp.emoji}</span>
              <div className={styles.scanLine} />
            </div>

            <div className={styles.cardContent}>
              <span className={styles.cardGenre}>{exp.genre}</span>
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              <p className={styles.cardDescription}>{exp.description}</p>
              <div className={styles.cardMeta}>
                <span><span className={styles.metaIcon}>◉</span> {exp.players} JUGADORES</span>
                <span><span className={styles.metaIcon}>⏱</span> {exp.duration}</span>
              </div>
              <button className={styles.cardBtn}>
                ▶ INICIAR
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
