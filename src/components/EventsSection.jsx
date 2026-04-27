import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EventsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const eventTypes = [
  {
    code: 'EVT_01',
    titulo: 'CUMPLEAÑOS',
    descripcion: 'Hacé del cumpleaños algo épico. Paquetes para grupos desde 4 jugadores.',
    descripcionLarga: 'Convertí el cumpleaños en una boss battle inolvidable. Reservás el espacio, elegís las experiencias y nosotros nos encargamos de todo lo demás. Ideal para grupos de niños, adolescentes y adultos que quieren festejar con la última tecnología en realidad virtual.',
    tag: 'POPULAR',
    imagen: '/images/birthday.png',
    detalles: ['Hasta 20 invitados', 'Catering opcional', 'Fotos del evento', 'Decoración temática', 'Equipo VR para todos', 'Anfitrión dedicado'],
    color: 'magenta',
    duracion: 'DESDE 2 HORAS',
    capacidad: '4 a 20 personas',
  },
  {
    code: 'EVT_02',
    titulo: 'EMPRESAS',
    descripcion: 'Team building inmersivo. Desafíos cooperativos que fortalecen equipos.',
    descripcionLarga: 'Llevá tu team building a otra dimensión. Experiencias cooperativas y competitivas diseñadas para fortalecer la comunicación, el liderazgo y la confianza dentro del equipo. Reportes personalizados con métricas de desempeño grupal.',
    tag: 'B2B',
    imagen: '/images/work.png',
    detalles: ['Sala privada', 'Facilitador dedicado', 'Reportes post-evento', 'Catering ejecutivo', 'Activaciones de marca', 'Logística completa'],
    color: 'cyan',
    duracion: 'DESDE 3 HORAS',
    capacidad: '8 a 40 personas',
  },
  {
    code: 'EVT_03',
    titulo: 'COLEGIOS',
    descripcion: 'Experiencias educativas y recreativas adaptadas para todas las edades.',
    descripcionLarga: 'Programas pensados para instituciones educativas: experiencias inmersivas que combinan diversión con aprendizaje. Desde recorridos virtuales por el sistema solar hasta laboratorios de ciencias en VR. Tarifas especiales para grupos escolares.',
    tag: 'EDU',
    imagen: '/images/school.png',
    detalles: ['Contenido educativo', 'Grupos de 30+', 'Tarifas escolares', 'Adaptado por edad', 'Material pedagógico', 'Coordinación con docentes'],
    color: 'violet',
    duracion: 'DESDE 90 MIN',
    capacidad: '15 a 50 alumnos',
  },
  {
    code: 'EVT_04',
    titulo: 'PRIVADOS',
    descripcion: 'Alquilá el espacio completo para tu celebración. Capacidad para grupos grandes.',
    descripcionLarga: 'Vivilo a lo grande. Reservá el local entero para tu evento privado: bodas, despedidas, lanzamientos o celebraciones especiales. Atención premium, horario flexible y la libertad de armar la experiencia exactamente como la imaginás.',
    tag: 'VIP',
    imagen: '/images/private.png',
    detalles: ['Espacio exclusivo', 'Atención premium', 'Horario flexible', 'DJ opcional', 'Barra libre disponible', 'Evento personalizado'],
    color: 'magenta',
    duracion: 'DESDE 4 HORAS',
    capacidad: 'HASTA 60 personas',
  },
];

const perks = [
  { icono: '👥', label: 'HASTA 20 PLAYERS' },
  { icono: '🕐', label: 'DESDE 2 HORAS' },
  { icono: '🎮', label: 'EQUIPO DEDICADO' },
  { icono: '🍕', label: 'CATERING OPCIONAL' },
  { icono: '📸', label: 'FOTOS DEL EVENTO' },
  { icono: '🏆', label: 'RANKING GRUPAL' },
];

export default function EventsSection() {
  const seccionRef = useRef(null);
  const [activo, setActivo] = useState(0);
  const [modal, setModal] = useState(null);

  // ESC para cerrar modal + bloquear scroll del body
  useEffect(() => {
    if (modal === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onKey);
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [modal]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-events="header"]', {
        scrollTrigger: { trigger: '[data-events="header"]', start: 'top 82%' },
        y: 50, opacity: 0, duration: 0.85, ease: 'power3.out',
      });

      gsap.from('[data-events="card"]', {
        scrollTrigger: { trigger: '[data-events="cards"]', start: 'top 78%' },
        y: 80, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      });

      // Laser: una sola pasada por card al entrar en viewport
      gsap.utils.toArray('[data-events="scan"]').forEach((el) => {
        gsap.fromTo(el,
          { y: 0, opacity: 1 },
          {
            y: '48rem',
            opacity: 0,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el.closest('article'),
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      gsap.from('[data-events="perk"]', {
        scrollTrigger: { trigger: '[data-events="perks"]', start: 'top 80%' },
        scale: 0.7, opacity: 0, duration: 0.45,
        ease: 'back.out(1.8)', stagger: 0.07,
      });

      gsap.from('[data-events="cta"]', {
        scrollTrigger: { trigger: '[data-events="cta"]', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      });
    }, seccionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={seccionRef} id="events" className={styles.section}>
      {/* Líneas neon decorativas */}
      <div className={styles.neonLine} data-pos="top" />
      <div className={styles.neonLine} data-pos="bottom" />

      <div data-events="header" className={styles.header}>
       
        <h2 className={styles.title}>
          ALQUILÁ <span className={styles.accent} data-text="SPACE VR +">SPACE VR +</span><br />
          PARA TU EVENTO
        </h2>
        <p className={styles.subtitle}>
          <span className={styles.subtitlePrompt}>&gt;</span>
          Espacio + equipo + experiencia. Convertí tu evento en una boss battle inolvidable.
        </p>
      </div>

      <div data-events="cards" className={styles.cards}>
        {eventTypes.map((evt, i) => (
          <article
            key={evt.code}
            data-events="card"
            data-color={evt.color}
            className={`${styles.card} ${activo === i ? styles.cardActiva : ''}`}
            onMouseEnter={() => setActivo(i)}
            onFocus={() => setActivo(i)}
            onClick={() => setModal(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModal(i); } }}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalle de ${evt.titulo}`}
          >
            {/* Imagen de fondo */}
            <div
              className={styles.cardImagen}
              style={{ backgroundImage: `url('${evt.imagen}')` }}
            />
            <div className={styles.cardOverlay} />

            {/* Esquinas HUD */}
            <span className={styles.cornerTL} />
            <span className={styles.cornerTR} />
            <span className={styles.cornerBL} />
            <span className={styles.cornerBR} />

            {/* Cabecera */}
            <div className={styles.cardTop}>
              <span className={styles.cardCode}>{evt.code}</span>
              <span className={styles.cardTag}>{evt.tag}</span>
            </div>

            {/* Contenido */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitulo}>{evt.titulo}</h3>
              <p className={styles.cardDesc}>{evt.descripcion}</p>

              <ul className={styles.cardDetalles}>
                {evt.detalles.map((d) => (
                  <li key={d} className={styles.cardDetalle}>
                    <span className={styles.cardDetalleIcono}>▸</span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <span className={styles.cardCta}>COTIZAR →</span>
              </div>
            </div>

            {/* Línea de escaneo */}
            <span data-events="scan" className={styles.cardScan} />
          </article>
        ))}
      </div>


      <div data-events="cta" className={styles.ctaBlock}>
        <div className={styles.ctaInfo}>
          <span className={styles.ctaTitle}>¿LISTO PARA ARMAR TU EVENTO?</span>
          <span className={styles.ctaSubtitle}>Cotización personalizada en menos de 24h.</span>
        </div>
        <a href="#contact" className={styles.cta}>
          ▶ COTIZAR EVENTO
          <span className={styles.ctaArrow}>→</span>
        </a>
      </div>

      {/* ── MODAL ─────────────────────── */}
      {modal !== null && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modal}
            data-color={eventTypes[modal].color}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalCerrar}
              onClick={() => setModal(null)}
              aria-label="Cerrar"
            >
              <span className={styles.modalCerrarTexto}>CERRAR</span>
              <span className={styles.modalCerrarX}>✕</span>
            </button>

            {/* Esquinas HUD del modal */}
            <span className={styles.modalCornerTL} />
            <span className={styles.modalCornerTR} />
            <span className={styles.modalCornerBL} />
            <span className={styles.modalCornerBR} />

            <div className={styles.modalGrid}>
              {/* Imagen */}
              <div className={styles.modalImagenWrap}>
                <div
                  className={styles.modalImagen}
                  style={{ backgroundImage: `url('${eventTypes[modal].imagen}')` }}
                />
                <div className={styles.modalImagenOverlay} />
                <span className={styles.modalImagenScan} />
                <span className={styles.modalCode}>{eventTypes[modal].code}</span>
                <span className={styles.modalTag}>{eventTypes[modal].tag}</span>
              </div>

              {/* Texto */}
              <div className={styles.modalContenido}>
                <span className={styles.modalEtiqueta}>// EVENTO_DETALLE</span>
                <h3 className={styles.modalTitulo}>{eventTypes[modal].titulo}</h3>
                <p className={styles.modalDesc}>{eventTypes[modal].descripcionLarga}</p>

                {/* Datos rápidos */}
                <div className={styles.modalDatos}>
                  <div className={styles.modalDato}>
                    <span className={styles.modalDatoLabel}>// DURACIÓN</span>
                    <span className={styles.modalDatoValor}>{eventTypes[modal].duracion}</span>
                  </div>
                  <div className={styles.modalDato}>
                    <span className={styles.modalDatoLabel}>// CAPACIDAD</span>
                    <span className={styles.modalDatoValor}>{eventTypes[modal].capacidad}</span>
                  </div>
                </div>

                {/* Lista de incluye */}
                <div className={styles.modalIncluye}>
                  <span className={styles.modalIncluyeLabel}>// INCLUYE</span>
                  <ul className={styles.modalLista}>
                    {eventTypes[modal].detalles.map((d) => (
                      <li key={d} className={styles.modalItem}>
                        <span className={styles.modalItemBullet}>▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#contact" className={styles.modalCta} onClick={() => setModal(null)}>
                  ▶ COTIZAR ESTE EVENTO
                  <span className={styles.modalCtaArrow}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
