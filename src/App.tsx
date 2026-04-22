import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  Menu,
  Scale,
  ShieldCheck,
  Users,
  X,
  Zap,
} from 'lucide-react'
import Preloader from './Preloader'
import heroImg1 from './assets/sianaafrica1.jpg'
import heroImg2 from './assets/Sianaafrica2.jpg'
import heroImg3 from './assets/sianaafrica3.jpg'
import maasaiWomenImg from './assets/sianaafrica4.jpg'
import './App.css'

/* ─── Hero slideshow scenes ──────────────────────────────── */
/* Images auto-cycle every 5 s; zoom direction per scene      */
const heroScenes = [
  { src: heroImg1, pos: 'center center', zoom: 'in'  as const }, // sianaafrica1.jpg   – zoom in
  { src: heroImg2, pos: 'center center', zoom: 'out' as const }, // Sianaafrica2.jpg   – zoom out
  { src: heroImg3, pos: 'center 12%',    zoom: 'in'  as const }, // Maasaiwomanholdingdragonfruit.png – zoom in
]

gsap.registerPlugin(ScrollTrigger)

/* ─── Colour Palette data ─────────────────────────────────── */
const palette = [
  { name: 'Forest',   hex: '#4C5D43' },
  { name: 'Sage',     hex: '#A8B69A' },
  { name: 'Mist',     hex: '#E7F0E5' },
  { name: 'Linen',    hex: '#F7F3EF' },
  { name: 'Coral',    hex: '#E36E5B' },
  { name: 'Rose',     hex: '#C95A7B' },
  { name: 'Charcoal', hex: '#282B2B' },
]

/* ─── Core Values data ────────────────────────────────────── */
const coreValues = [
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    colorKey: 'dignity',
    title: 'Dignity',
    text: 'Every person we serve deserves to be seen, heard, and treated with deep respect. Dignity is the foundation on which all our work stands.',
  },
  {
    icon: <Users size={24} strokeWidth={1.5} />,
    colorKey: 'community',
    title: 'Community',
    text: 'Lasting change is built together. Our strength lies in the bonds we forge across villages, families, and generations.',
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    colorKey: 'empowerment',
    title: 'Empowerment',
    text: 'We equip women with skills, resources, and confidence — enabling them to lead their own stories and transform their communities.',
  },
  {
    icon: <Scale size={24} strokeWidth={1.5} />,
    colorKey: 'integrity',
    title: 'Integrity',
    text: 'We operate with transparency and accountability. Earning and keeping the trust of the communities we serve is everything.',
  },
  {
    icon: <Leaf size={24} strokeWidth={1.5} />,
    colorKey: 'sustainability',
    title: 'Sustainability',
    text: 'Our programmes nurture environments, economies, and people — designed to sustain and thrive for generations to come.',
  },
]

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#mission' },
  { label: 'Our Work', href: '#mission' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#contact' },
]

/* ─── App ──────────────────────────────────────────────────── */
export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const missionRef = useRef<HTMLDivElement>(null)
  const valuesTrackRef = useRef<HTMLDivElement>(null)

  /* ── Lock body scroll when preloader or mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = !preloaderDone || menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [preloaderDone, menuOpen])

  /* ── Nav scroll detection ── */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Auto-cycle hero background every 5 s ────────────────── */
  useEffect(() => {
    if (!preloaderDone) return
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % heroScenes.length)
      setAnimKey(prev => prev + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [preloaderDone])

  /* ── Hero text + section animations (fire once preloader finishes) ── */
  const handlePreloaderComplete = useCallback(() => {
    // ── Hero text entrance (staggered) ────────────────────────
    const tl = gsap.timeline()
    tl.from('.hero__eyebrow',     { y: 22, opacity: 0, duration: 0.65, ease: 'power3.out' })
      .from('.hero__title',       { y: 38, opacity: 0, duration: 0.85, ease: 'power3.out' }, '-=0.3')
      .from('.hero__description', { y: 22, opacity: 0, duration: 0.7,  ease: 'power3.out' }, '-=0.4')
      .from('.hero__actions',     { y: 16, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')

    // ── Scroll-triggered section animations ───────────────────
    gsap.from(missionRef.current, {
      scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.value-card', {
      scrollTrigger: { trigger: valuesTrackRef.current, start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    })
    gsap.from('.swatch', {
      scrollTrigger: { trigger: '.palette-grid', start: 'top 85%' },
      scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
    })
 gsap.from('.impact-card', {
  scrollTrigger: {
    trigger: '.impact-cards',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power3.out',
})
    setPreloaderDone(true)
  }, [])
 
  const impactCards = [
  {
    icon: <Leaf size={24} strokeWidth={1.5} />,
    title: 'Climate Smart Technologies',
    text: 'Introducing resilient farming practices that adapt to changing climates and protect long-term livelihoods.',
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: 'Diverse Income Sources',
    text: 'Empowering women to build multiple income streams for financial independence and stability.',
  },
  {
    icon: <Users size={24} strokeWidth={1.5} />,
    title: 'Women Empowerment',
    text: 'Equipping women with skills, confidence, and resources to lead change in their communities.',
  },
]
const galleryImages = [
  heroImg1,
  heroImg2,
  heroImg3,
  maasaiWomenImg,
]
  return (
    <>
      {/* ── Preloader ── */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* ── Navigation ── */}
      <nav
        className={`nav${navScrolled ? ' nav--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div className="container nav__inner">
          <a href="#" className="nav__logo">SIANA AFRICA</a>

          {/* Desktop links */}
          <ul className="nav__links" role="list">
            {navLinks.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#contact" className="btn btn--coral btn--sm nav__cta">
            Donate Now
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        <button
          className="nav__overlay-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={26} />
        </button>
        <ul className="nav__overlay-links" role="list">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn--coral nav__overlay-cta" onClick={() => setMenuOpen(false)}>
          Donate Now <ArrowRight size={16} />
        </a>
      </div>

      {/* ── Auto-cycling Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        {heroScenes.map((scene, i) => (
          <div
            key={activeIdx === i ? `active-${animKey}` : `inactive-${i}`}
            className={`hero-bg hero-bg--${scene.zoom}${activeIdx === i ? ' hero-bg--active' : ''}`}
            style={{
              backgroundImage: `url(${scene.src})`,
              backgroundPosition: scene.pos,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Gradient overlay */}
        <div className="scene__gradient" aria-hidden="true" />
        {/* Bottom vignette */}
        <div className="scene__vignette" aria-hidden="true" />

        {/* Text content */}
        <div className="container scene__body">
          <div className="hero__content">
            <p className="hero__eyebrow">OUR MISSION</p>
            <h1 className="hero__title" id="hero-title">
              Empowering Women.<br />
              Preserving Culture.<br />
              <em>Promoting Sustainability Across Kenya.</em>
            </h1>
            <p className="hero__description">
              SIANA Africa is a grassroots organisation devoted to uplifting women,
              honouring Kenya's living heritage, and championing sustainable communities
              for generations to come.
            </p>
            <div className="hero__actions">
              <a href="#mission" className="btn btn--coral">
                Support Our Work <ArrowRight size={16} />
              </a>
              <a href="#mission" className="btn btn--ghost">
                Join the Movement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are + Core Values ── */}
      <section id="mission" className="who-section" aria-labelledby="wwa-title">

        {/* Centered header */}
        <div className="container" ref={missionRef}>
          <div className="wwa-header">
            <p className="wwa-eyebrow">WHO WE ARE</p>
            <div className="brand-divider" aria-hidden="true">
              <span className="brand-divider__line brand-divider__line--left" />
              <span className="brand-divider__symbol">
                <HeartHandshake size={22} strokeWidth={1.5} />
              </span>
              <span className="brand-divider__line brand-divider__line--right" />
            </div>
            <h2 className="wwa-title" id="wwa-title">A Movement Rooted in Purpose</h2>
            <p className="wwa-intro">
              SIANA Africa is a grassroots organisation devoted to uplifting women,
              honouring Kenya's living heritage, and championing sustainable communities
              for generations to come.
            </p>
          </div>
        </div>

        {/* Full-viewport mission image */}
        <div className="wwa-image-block">
          <img
            src={maasaiWomenImg}
            className="wwa-image-block__img"
            alt="Maasai women in conversation"
            loading="lazy"
          />
          <div className="wwa-image-block__overlay" aria-hidden="true" />
          <p className="wwa-image-block__quote">"Empowering women across rural Kenya"</p>
        </div>

        {/* Core Values */}
        <div className="container">
          <div className="values-intro">
            <p className="section__label">Our Core Values</p>
            <h2 className="values-heading">What Guides Everything We Do</h2>
          </div>
          <div className="values-track" ref={valuesTrackRef}>
            <div className="values-track__spine" aria-hidden="true" />
            {coreValues.map((v, i) => (
              <article
                key={v.title}
                className={`value-card value-card--${i % 2 === 0 ? 'left' : 'right'} value-card--${v.colorKey}`}
              >
                <div className="value-card__icon-wrap">
                  {v.icon}
                </div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__text">{v.text}</p>
              </article>
            ))}
          </div>
        </div>

      </section>
      

      {/* ── Impact Section ── */}
<section className="impact-section" aria-labelledby="impact-title">

  <div className="container">
    
    {/* Header */}
    <div className="impact-header">
      <p className="impact-eyebrow">OUR IMPACT</p>

      <div className="brand-divider" aria-hidden="true">
        <span className="brand-divider__line brand-divider__line--left" />
        <span className="brand-divider__symbol">
          <HeartHandshake size={22} strokeWidth={1.5} />
        </span>
        <span className="brand-divider__line brand-divider__line--right" />
      </div>

      <h2 className="impact-title" id="impact-title">
        Creating Sustainable Change
      </h2>
    </div>

    {/* ── Pilot Project ── */}
    <div className="impact-pilot">
      
      <div className="impact-pilot__text">
        <p className="impact-label">Pilot Project</p>

        <h3 className="impact-pilot__title">
          Empowering Communities in Namanga
        </h3>

        <p className="impact-pilot__description">
          Siana Africa partners with Maasai women in Namanga to strengthen agricultural productivity while fostering sustainable, women-led economic growth.
        </p>

        <a href="#" className="btn btn--coral">
          Learn More <ArrowRight size={16} />
        </a>
      </div>

      <div className="impact-pilot__image">
        <img src={maasaiWomenImg} alt="Maasai women in agricultural project" />
      </div>

    </div>

    {/* ── Impact Cards ── */}
    <div className="impact-cards">
      {impactCards.map((card) => (
        <div key={card.title} className="impact-card">
          
          <div className="impact-card__icon">
            {card.icon}
          </div>

          <h4 className="impact-card__title">{card.title}</h4>

          <p className="impact-card__text">{card.text}</p>

        </div>
      ))}
    </div>

  </div>

</section>
      
{/* ── Gallery Section ── */}
<section className="gallery-section" aria-labelledby="gallery-title">

  <div className="container">

    {/* Header */}
    <div className="gallery-header">
      <p className="gallery-eyebrow">OUR STORY IN IMAGES</p>

      <div className="brand-divider" aria-hidden="true">
        <span className="brand-divider_line brand-divider_line--left" />
        <span className="brand-divider__symbol">
          <HeartHandshake size={22} strokeWidth={1.5} />
        </span>
        <span className="brand-divider_line brand-divider_line--right" />
      </div>

      <h2 className="gallery-title" id="gallery-title">
        Moments from the Field
      </h2>

      <p className="gallery-subtext">
        A glimpse into the communities, landscapes, and work shaping Siana Africa.
      </p>
    </div>

  </div>

  {/* Gallery Strip (Full Width Scroll Feel) */}
  <div className="gallery-strip">

    {galleryImages.map((img, i) => (
      <div key={i} className="gallery-item">
        <img src={img} alt={Siana Africa gallery ${i + 1}} />
      </div>
    ))}

  </div>

</section>

      
      {/* ── Design System Showcase ── */}
      <section id="design" className="section section--mist" aria-labelledby="design-title">
        <div className="container">
          <p className="section__label">Design System</p>
          <h2 className="section__title" id="design-title">Colour Palette</h2>
          <p className="section__body">
            A warm, nature-inspired palette that communicates growth, community,
            and warmth.
          </p>

          <div className="palette-grid">
            {palette.map((s) => (
              <div key={s.hex} className="swatch">
                <div className="swatch__color" style={{ background: s.hex }} />
                <div className="swatch__label">
                  <span className="swatch__name">{s.name}</span>
                  <span className="swatch__hex">{s.hex}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Typography showcase */}
          <h2 className="section__title" id="type-title" style={{ marginTop: '4rem' }}>
            Typography
          </h2>
          <p className="section__body">
            <strong>Playfair Display</strong> for expressive headings ·{' '}
            <strong>Inter</strong> for clear, readable body text.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <div className="type-sample">
              <p className="type-sample__label">Heading – Playfair Display 700</p>
              <h1 style={{ margin: 0 }}>Empowering Communities</h1>
            </div>
            <div className="type-sample">
              <p className="type-sample__label">Subheading – Playfair Display 600</p>
              <h2 style={{ margin: 0 }}>Preserving Kenya's Heritage</h2>
            </div>
            <div className="type-sample">
              <p className="type-sample__label">Body – Inter 400</p>
              <p style={{ margin: 0, fontSize: '1.0625rem', color: 'var(--color-text-muted)' }}>
                We believe every woman in Kenya deserves access to opportunities,
                education, and the freedom to shape her own future — all while
                honouring the culture and traditions that define her community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="footer">
        <div className="container">
          <p className="footer__logo">SIANA Africa</p>
          <p className="footer__tagline">
            Empowering Women. Preserving Culture. Promoting Sustainability Across Kenya.
          </p>
        </div>
      </footer>
    </>
  )
}

