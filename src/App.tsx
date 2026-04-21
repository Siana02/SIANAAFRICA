import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Heart,
  Leaf,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import './App.css'

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

/* ─── App ──────────────────────────────────────────────────── */
export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.from('.hero__eyebrow', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.from('.hero__title',   { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 })
      gsap.from('.hero__description', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 })
      gsap.from('.hero__actions', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.8 })

      /* Mission section scroll-trigger */
      gsap.from(missionRef.current, {
        scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      /* Pillar cards stagger */
      gsap.from('.pillar-card', {
        scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%' },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      })

      /* Palette swatches pop-in */
      gsap.from('.swatch', {
        scrollTrigger: { trigger: '.palette-grid', start: 'top 85%' },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'back.out(1.7)',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="nav" aria-label="Main navigation">
        <div className="container nav__inner">
          <a href="#" className="nav__logo">SIANA Africa</a>
          <ul className="nav__links">
            <li><a href="#mission">Mission</a></li>
            <li><a href="#design">Design</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="container">
          <div className="hero__content">
            <p className="hero__eyebrow">
              <Sparkles size={14} />
              Kenya · Community · Impact
            </p>
            <h1 className="hero__title" id="hero-title">
              Empowering Women.<br />
              <em>Preserving Culture.</em>
            </h1>
            <p className="hero__description">
              SIANA Africa is a grassroots organisation promoting sustainability,
              cultural preservation, and women's empowerment across Kenya.
            </p>
            <div className="hero__actions">
              <a href="#mission" className="btn btn--primary">
                Our Mission <ArrowRight size={16} />
              </a>
              <a href="#design" className="btn btn--outline">
                Design System
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

