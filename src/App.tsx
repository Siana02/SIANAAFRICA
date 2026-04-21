import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Heart,
  Leaf,
  Globe,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react'
import Preloader from './Preloader'
import heroImg1 from './assets/Maasaiwomanholdingdragonfruit.png'
import heroImg2 from './assets/hero.png'
import heroImg3 from './assets/sianaafrica1.jpg'
import heroImg4 from './assets/Sianaafrica2.jpg'
import './App.css'

/* Images rotate through the hero slideshow. `pos` fine-tunes focal point. */
const heroSlides = [
  { src: heroImg1, pos: 'center 12%' },
  { src: heroImg2, pos: 'center center' },
  { src: heroImg3, pos: 'center center' },
  { src: heroImg4, pos: 'center center' },
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

/* ─── Pillars data ─────────────────────────────────────────── */
const pillars = [
  {
    icon: <Heart size={22} />,
    iconClass: 'pillar-card__icon--rose',
    title: 'Empowering Women',
    text: 'Providing skills, education, and resources to women across Kenya so they can lead thriving, independent lives.',
  },
  {
    icon: <Globe size={22} />,
    iconClass: 'pillar-card__icon--green',
    title: 'Preserving Culture',
    text: "Celebrating and safeguarding Kenya's rich cultural heritage through storytelling, arts, and community programs.",
  },
  {
    icon: <Leaf size={22} />,
    iconClass: 'pillar-card__icon--coral',
    title: 'Promoting Sustainability',
    text: 'Championing eco-friendly practices that protect natural environments and ensure future generations can flourish.',
  },
]

const navLinks = [
  { label: 'Home',     href: '#' },
  { label: 'About',    href: '#mission' },
  { label: 'Our Work', href: '#mission' },
  { label: 'Blog',     href: '#' },
  { label: 'Contact',  href: '#contact' },
]

/* ─── App ──────────────────────────────────────────────────── */
export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [navScrolled, setNavScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)

  const missionRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

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

  /* ── Hero + scroll animations (fire once preloader finishes) ── */
  const handlePreloaderComplete = useCallback(() => {
    // ── Background slideshow ──────────────────────────────────
    // Each slide holds for HOLD seconds, then crossfades over FADE seconds.
    // Alternating slides zoom in / zoom out for cinematic depth.
    const HOLD = 7    // seconds each slide is visible before crossfade begins
    const FADE = 1.5  // crossfade duration in seconds

    const slides = gsap.utils.toArray<HTMLElement>('.hero__slide')
    gsap.set(slides, { opacity: 0 })
    gsap.set(slides[0], { opacity: 1, scale: 1 })

    let current = 0
    const cycleSlide = () => {
      const prev = current
      current = (current + 1) % slides.length
      const zoomIn = current % 2 === 0  // alternate direction per slide

      gsap.set(slides[current], { opacity: 0, scale: zoomIn ? 1 : 1.1 })
      gsap.to(slides[current], { opacity: 1, duration: FADE, ease: 'power2.inOut' })
      gsap.to(slides[prev],    { opacity: 0, duration: FADE, ease: 'power2.inOut' })
      // Slow continuous zoom across full display window
      gsap.to(slides[current], { scale: zoomIn ? 1.1 : 1, duration: HOLD + FADE, ease: 'none' })
      gsap.delayedCall(HOLD, cycleSlide)
    }

    // Kick off slide 0 zoom immediately, queue first transition
    gsap.to(slides[0], { scale: 1.1, duration: HOLD + FADE, ease: 'none' })
    gsap.delayedCall(HOLD, cycleSlide)

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
    gsap.from('.pillar-card', {
      scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%' },
      y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    })
    gsap.from('.swatch', {
      scrollTrigger: { trigger: '.palette-grid', start: 'top 85%' },
      scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
    })

    setPreloaderDone(true)
  }, [])

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

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-title">
        {/* Cycling full-bleed background slides */}
        <div className="hero__slides" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="hero__slide"
              style={{ backgroundImage: `url(${slide.src})`, backgroundPosition: slide.pos }}
            />
          ))}
        </div>

        {/* Cinematic left-to-right dark gradient — keeps text readable */}
        <div className="hero__gradient" aria-hidden="true" />
        {/* Bottom vignette for depth */}
        <div className="hero__vignette" aria-hidden="true" />

        {/* Text layer */}
        <div className="container hero__body">
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

      {/* ── Mission ── */}
      <section id="mission" className="section section--light" aria-labelledby="mission-title">
        <div className="container" ref={missionRef}>
          <p className="section__label">Who we are</p>
          <h2 className="section__title" id="mission-title">Our Three Pillars</h2>
          <p className="section__body">
            Everything we do is rooted in three interconnected values that guide
            our programmes, partnerships, and community work.
          </p>

          <div className="pillars" ref={pillarsRef}>
            {pillars.map((p) => (
              <article key={p.title} className="pillar-card">
                <div className={`pillar-card__icon ${p.iconClass}`}>
                  {p.icon}
                </div>
                <h3 className="pillar-card__title">{p.title}</h3>
                <p className="pillar-card__text">{p.text}</p>
              </article>
            ))}
          </div>
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

