import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm]       = useState({ nombre: '', contacto: '', mensaje: '' });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-contact="left"]', {
        scrollTrigger: { trigger: '[data-contact="inner"]', start: 'top 78%' },
        x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
      });
      gsap.from('[data-contact="right"]', {
        scrollTrigger: { trigger: '[data-contact="inner"]', start: 'top 78%' },
        x: 60, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
      });
      gsap.from('[data-contact="item"]', {
        scrollTrigger: { trigger: '[data-contact="inner"]', start: 'top 72%' },
        x: -30, opacity: 0, duration: 0.5, ease: 'power2.out',
        stagger: 0.1, delay: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validar = () => {
    const e = {};
    if (!form.nombre.trim())   e.nombre   = 'El nombre es obligatorio.';
    if (!form.contacto.trim()) e.contacto = 'El número o email es obligatorio.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validar();
    if (Object.keys(e2).length) { setErrores(e2); return; }
    setErrores({});
    setEnviado(true);
  };

  const handleChange = (campo, valor) => {
    setForm(f => ({ ...f, [campo]: valor }));
    if (errores[campo]) setErrores(e => ({ ...e, [campo]: undefined }));
  };

  const cerrarModal = () => {
    setEnviado(false);
    setForm({ nombre: '', contacto: '', mensaje: '' });
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div data-contact="inner" className={styles.inner}>
        <div data-contact="left" className={styles.left}>
          <span className={styles.badge}>// CONEXIÓN_DIRECTA</span>
          <h2 className={styles.title}>
            ¿LISTO PARA<br />
            <span className={styles.accent} data-text="ENTRAR">ENTRAR</span><br />
            AL UNIVERSO?
          </h2>
          <p className={styles.subtitle}>
            <span className={styles.subtitlePrompt}>&gt;</span>
            Vení a visitarnos o contactanos para reservar tu sesión.
            No necesitás experiencia previa — nosotros te guiamos.
          </p>
          <ul className={styles.infoList}>
            <li data-contact="item" className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <span className={styles.infoLabel}>// LOCATION</span>
                <span className={styles.infoValue}>Tu dirección · Ciudad, País</span>
              </div>
            </li>
            <li data-contact="item" className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <span className={styles.infoLabel}>// PHONE</span>
                <span className={styles.infoValue}>+54 9 XXX XXX-XXXX</span>
              </div>
            </li>
            <li data-contact="item" className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <div>
                <span className={styles.infoLabel}>// EMAIL</span>
                <span className={styles.infoValue}>contacto@spacevr.com</span>
              </div>
            </li>
            <li data-contact="item" className={styles.infoItem}>
              <span className={styles.infoIcon}>🕐</span>
              <div>
                <span className={styles.infoLabel}>// SCHEDULE</span>
                <span className={styles.infoValue}>Lun–Vie 14:00–22:00 · Sáb–Dom 10:00–22:00</span>
              </div>
            </li>
          </ul>
        </div>

        <div data-contact="right" className={styles.right}>
          <div className={styles.formHeader}>
            <span className={styles.formStatus}>
              <span className={styles.statusDot} />
              TRANSMISIÓN ABIERTA
            </span>
            <span className={styles.formCode}>FORM_001</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h3 className={styles.formTitle}>ENVIAR MENSAJE</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                // NOMBRE
                <span className={styles.requerido}>*</span>
              </label>
              <input
                type="text"
                className={`${styles.input} ${errores.nombre ? styles.inputError : ''}`}
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
              />
              {errores.nombre && <span className={styles.error}>{errores.nombre}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                // CONTACTO
                <span className={styles.requerido}>*</span>
              </label>
              <input
                type="text"
                className={`${styles.input} ${errores.contacto ? styles.inputError : ''}`}
                placeholder="email / whatsapp"
                value={form.contacto}
                onChange={(e) => handleChange('contacto', e.target.value)}
              />
              {errores.contacto && <span className={styles.error}>{errores.contacto}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>// MENSAJE</label>
              <textarea
                className={styles.textarea}
                rows={4}
                placeholder="¿Cuántas personas? ¿Fecha en mente?"
                value={form.mensaje}
                onChange={(e) => handleChange('mensaje', e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submit}>
              ▶ TRANSMITIR
              <span className={styles.submitArrow}>→</span>
            </button>
          </form>
        </div>
      </div>

      {/* ── MODAL DE CONFIRMACIÓN ─── */}
      {enviado && (
        <div className={styles.modalBackdrop} onClick={cerrarModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalCornerTL} />
            <span className={styles.modalCornerTR} />
            <span className={styles.modalCornerBL} />
            <span className={styles.modalCornerBR} />

            <div className={styles.modalIcono}>✔</div>
            <span className={styles.modalCodigo}>SYS_OK · 200</span>
            <h3 className={styles.modalTitulo}>¡TRANSMISIÓN EXITOSA!</h3>
            <p className={styles.modalTexto}>
              Recibimos tu mensaje correctamente.<br />
              Nos contactaremos contigo a la brevedad
            </p>
            <button className={styles.modalBoton} onClick={cerrarModal}>
              ▶ VOLVER AL INICIO
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
