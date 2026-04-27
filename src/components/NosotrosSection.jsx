import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, svg, stagger } from 'animejs';
import styles from './NosotrosSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { objetivo: 5000, sufijo: '+', etiqueta: 'VISITANTES'   },
  { objetivo: 10,   sufijo: '+', etiqueta: 'EXPERIENCIAS' },
  { objetivo: 4,    sufijo: '',  etiqueta: 'AÑOS'          },
];

const valores = [
  { nombre: 'PASIÓN',      desc: 'Se nota en cada detalle del espacio.' },
  { nombre: 'INNOVACIÓN',  desc: 'Siempre la próxima experiencia que te sorprende.' },
  { nombre: 'CONFIANZA',   desc: 'Transparencia total con cada visitante.' },
  { nombre: 'COMUNIDAD',   desc: 'Un espacio donde todos son bienvenidos.' },
];

const equipo = [
  { nombre: 'ALEX R.',    rol: 'FUNDADOR · DIRECTOR',   icono: '👨‍💼' },
  { nombre: 'CAMILA T.', rol: 'DIR. EXPERIENCIAS',      icono: '👩‍🎮' },
  { nombre: 'MARTÍN G.', rol: 'SOPORTE TÉCNICO',        icono: '👨‍🔧' },
  { nombre: 'SOFÍA L.',  rol: 'ATENCIÓN AL VISITANTE',  icono: '👩‍💻' },
];

// Paths SVG geométricos para "SPACE VR+"
const lineasSpaceVr = [
  // S
  'M30,5 L0,5 L0,30 L30,30 L30,55 L0,55',
  // P (vertical)
  'M40,5 L40,55',
  // P (loop)
  'M40,5 L65,5 L65,30 L40,30',
  // A (triángulo)
  'M80,55 L95,5 L110,55',
  // A (cruz)
  'M84,40 L106,40',
  // C
  'M150,5 L120,5 L120,55 L150,55',
  // E (vertical)
  'M160,5 L160,55',
  // E (top)
  'M160,5 L185,5',
  // E (medio)
  'M160,30 L182,30',
  // E (bot)
  'M160,55 L185,55',
  // V
  'M220,5 L235,55 L250,5',
  // R (vertical)
  'M260,5 L260,55',
  // R (loop)
  'M260,5 L285,5 L285,30 L260,30',
  // R (pierna)
  'M275,30 L285,55',
  // + horizontal
  'M305,30 L325,30',
  // + vertical
  'M315,18 L315,42',
];

export default function NosotrosSection() {
  const seccionRef    = useRef(null);
  const contadoresRef = useRef([]);
  const svgRef        = useRef(null);
  const [valorActivo, setValorActivo] = useState(0);
  const [pausado, setPausado] = useState(false);

  // Auto-rotación del slider de valores
  useEffect(() => {
    if (pausado) return;
    const id = setInterval(() => {
      setValorActivo(i => (i + 1) % valores.length);
    }, 4200);
    return () => clearInterval(id);
  }, [pausado]);

  // GSAP: entradas + contadores
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-nosotros="izq"]', {
        scrollTrigger: { trigger: '[data-nosotros="izq"]', start: 'top 80%' },
        x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
      });
      gsap.from('[data-nosotros="stat"]', {
        scrollTrigger: { trigger: '[data-nosotros="stats"]', start: 'top 82%' },
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12,
      });
      gsap.from('[data-nosotros="miembro"]', {
        scrollTrigger: { trigger: '[data-nosotros="equipo"]', start: 'top 82%' },
        y: 24, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
      });

      contadoresRef.current.forEach((el) => {
        if (!el) return;
        const objetivo = parseInt(el.dataset.objetivo, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: objetivo,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString('es-AR'); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, seccionRef);

    return () => ctx.revert();
  }, []);

  // anime.js: dibujado del SVG "SPACE VR+"
  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('[data-linea]');
    const animacion = animate(svg.createDrawable(Array.from(paths)), {
      draw: ['0 0', '0 1', '1 1'],
      ease: 'inOutQuad',
      duration: 2000,
      delay: stagger(100),
      loop: true,
    });
    return () => animacion?.pause?.();
  }, []);

  return (
    <section ref={seccionRef} id="nosotros" className={styles.seccion}>
      <div className={styles.fondoGlow} />

      <div className={styles.contenido}>

        {/* ── PANEL IZQUIERDO ─────────────────── */}
        <div data-nosotros="izq" className={styles.panelIzq}>

          <span className={styles.insignia}>// PROTOCOLO_IDENTIDAD</span>

          <div className={styles.manifiesto}>
            <h2 className={styles.titulo}>
              QUIÉNES<br />
              <span className={styles.tituloAccento}>SOMOS</span>
            </h2>
            <p className={styles.cita}>
              Creemos que una experiencia inmersiva de clase mundial debería estar al alcance
              de todos.
            </p>
            <p className={styles.misionTexto}>
              Desde 2022 abrimos las puertas de un espacio diseñado para sorprender a cada
              visitante. No importa tu edad ni experiencia — en Space VR+ hay algo para vos.
            </p>
          </div>

          {/* Slider de valores */}
          <div
            className={styles.sliderValores}
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
          >
            <div className={styles.sliderEncabezado}>
              <span className={styles.sliderEtiqueta}>// LO_QUE_NOS_MUEVE</span>
              <span className={styles.sliderContador}>
                {String(valorActivo + 1).padStart(2, '0')}
                <span className={styles.sliderContadorTotal}> / {String(valores.length).padStart(2, '0')}</span>
              </span>
            </div>

            <div className={styles.sliderEscena}>
              {valores.map((v, i) => (
                <div
                  key={v.nombre}
                  className={`${styles.sliderItem} ${i === valorActivo ? styles.sliderItemActivo : ''}`}
                >
                  <span className={styles.sliderIcono}>{v.icono}</span>
                  <span className={styles.sliderNombre}>{v.nombre}</span>
                  <p className={styles.sliderDesc}>{v.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.sliderIndicadores}>
              {valores.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.sliderIndicador} ${i === valorActivo ? styles.sliderIndicadorActivo : ''}`}
                  onClick={() => setValorActivo(i)}
                  aria-label={`Valor ${i + 1}`}
                />
              ))}
              <div className={styles.sliderProgreso} key={`prog-${valorActivo}-${pausado}`} />
            </div>
          </div>
        </div>

        {/* ── PANEL DERECHO ───────────────────── */}
        <div className={styles.panelDer}>

          {/* Stats */}
          <div data-nosotros="stats" className={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} data-nosotros="stat" className={styles.stat}>
                <div className={styles.statNumero}>
                  <span
                    ref={(el) => (contadoresRef.current[i] = el)}
                    data-objetivo={s.objetivo}
                  >
                    0
                  </span>
                  <span className={styles.statSufijo}>{s.sufijo}</span>
                </div>
                <span className={styles.statEtiqueta}>{s.etiqueta}</span>
              </div>
            ))}
          </div>

          {/* SVG animado SPACE VR+ */}
          <div className={styles.bloqueLogo}>
           

            {/* Radar decorativo */}
            <div className={styles.radar} aria-hidden="true">
              <span className={styles.radarAnillo} />
              <span className={`${styles.radarAnillo} ${styles.radarAnilloMid}`} />
              <span className={`${styles.radarAnillo} ${styles.radarAnilloIn}`} />
              <span className={styles.radarCruz} />
              <span className={styles.radarCruzV} />
              <span className={styles.radarPunto} />
              <span className={styles.radarBarrido} />
              <span className={styles.radarPing} />
            </div>

            <svg
              ref={svgRef}
              className={styles.svgLogo}
              viewBox="0 0 330 60"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                {lineasSpaceVr.map((d, i) => (
                  <path key={i} data-linea d={d} />
                ))}
              </g>
            </svg>

            <span className={styles.bloqueLogoCoords}>LAT: -34.6037° / LON: -58.3816°</span>
          </div>

          
        </div>

      </div>
    </section>
  );
}
