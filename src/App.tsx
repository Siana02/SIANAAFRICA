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
import dragonFruitImg from './assets/Handsholdingdragonfruit.png' 
import journeyImg from './assets/journeyimage.jpg'
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
      .call(() => setPreloaderDone(true))
  }, [])

  /* ── Scroll-triggered animations (run after preloader + overflow cleared) ── */
  useEffect(() => {
    if (!preloaderDone) return

    let ctx: ReturnType<typeof gsap.context> | undefined

    // Allow React to flush the DOM update (overflow: '' restored) before calculating positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
      ctx = gsap.context(() => {

        gsap.from('.trust-stat', {
          scrollTrigger: { trigger: '.trust-strip', start: 'top 90%', once: true },
          y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        })

        gsap.from(missionRef.current, {
          scrollTrigger: { trigger: missionRef.current, start: 'top 82%', once: true },
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        })
        gsap.from('.value-card', {
          scrollTrigger: { trigger: valuesTrackRef.current, start: 'top 82%', once: true },
          y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        })
        gsap.from('.impact-pilot__text', {
          scrollTrigger: { trigger: '.impact-pilot', start: 'top 80%', once: true },
          x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
        })
        gsap.from('.impact-pilot__image', {
          scrollTrigger: { trigger: '.impact-pilot', start: 'top 80%', once: true },
          x: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        })
        // Use 'top bottom' so cards animate the moment they scroll into view
        gsap.from('.impact-card', {
          scrollTrigger: { trigger: '.impact-cards', start: 'top bottom', once: true },
          y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.gallery-item', {
          scrollTrigger: { trigger: '.gallery-strip', start: 'top 88%', once: true },
          x: 70, opacity: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.article-card', {
          scrollTrigger: { trigger: '.articles-grid', start: 'top 85%', once: true },
          y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.join-hero__image', {
          scrollTrigger: { trigger: '.join-section', start: 'top 78%', once: true },
          x: -60, opacity: 0, duration: 0.95, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.join-hero__content', {
          scrollTrigger: { trigger: '.join-section', start: 'top 78%', once: true },
          x: 60, opacity: 0, duration: 0.95, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.join-card', {
          scrollTrigger: { trigger: '.join-options', start: 'top 88%', once: true },
          y: 45, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.newsletter-card', {
          scrollTrigger: { trigger: '.newsletter-card', start: 'top 90%', once: true },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          immediateRender: false,
        })
        gsap.from('.swatch', {
          scrollTrigger: { trigger: '.palette-grid', start: 'top 85%', once: true },
          scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
          immediateRender: false,
        })
      })
    }, 120)

    return () => {
      clearTimeout(timer)
      ctx?.revert()
    }
  }, [preloaderDone])
 
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
  {
    src: heroImg1,
    alt: 'Women in rural Kenya engaging in farming activities',
  },
  {
    src: heroImg2,
    alt: 'Community members participating in sustainable agriculture',
  },
  {
    src: heroImg3,
    alt: 'Maasai woman holding dragon fruit in Namanga project',
  },
  {
    src: maasaiWomenImg,
    alt: 'Maasai women collaborating in Siana Africa field program',
  },
]
  const articles = [
  {
    title: 'The Dragon Fruit Story',
    excerpt:
      'The dragon fruit thrives in tough conditions—just like our communities. It symbolizes courage, adaptability, and the fire within us to overcome challenges.',
    image: dragonFruitImg,
    link: '#',
  },
  {
    title: 'Women Empowerment in Kenya: A Journey to Kerala',
    excerpt:
      'Follow the journey of our founder to the Kanthari Leadership Institute—where vision, resilience, and purpose shaped Siana Africa.',
    image: journeyImg,
    link: '#',
  },
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
            <p className="hero__eyebrow">SIANA AFRICA · KENYA</p>
            <h1 className="hero__title" id="hero-title">
              Empowering Women.<br />
              Preserving Culture.<br />
              <em>Building a Sustainable Kenya.</em>
            </h1>
            <p className="hero__description">
              We walk alongside rural Kenyan women — equipping them with skills,
              resources, and community to lead thriving lives and shape a
              more just, sustainable future.
            </p>
            <div className="hero__actions">
              <a href="#contact" className="btn btn--coral">
                Donate Today <ArrowRight size={16} />
              </a>
              <a href="#join-section" className="btn btn--ghost">
                Join the Movement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="trust-strip" aria-label="Key impact statistics">
        <div className="container trust-strip__inner">
          <div className="trust-stat">
            <span className="trust-stat__number">100+</span>
            <span className="trust-stat__label">Women Reached</span>
          </div>
          <span className="trust-strip__divider" aria-hidden="true" />
          <div className="trust-stat">
            <span className="trust-stat__number">3</span>
            <span className="trust-stat__label">Active Programmes</span>
          </div>
          <span className="trust-strip__divider" aria-hidden="true" />
          <div className="trust-stat">
            <span className="trust-stat__number">1</span>
            <span className="trust-stat__label">Pilot Region · Namanga</span>
          </div>
          <span className="trust-strip__divider" aria-hidden="true" />
          <div className="trust-stat">
            <span className="trust-stat__number">100%</span>
            <span className="trust-stat__label">Community-Led</span>
          </div>
        </div>
      </div>

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
              Born from the belief that lasting change begins with women, SIANA Africa
              works at the intersection of empowerment, culture, and sustainability —
              creating pathways for Kenyan women to thrive on their own terms.
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
          <blockquote className="wwa-image-block__quote">
            "When you empower a woman, you transform a community."
          </blockquote>
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
        Where Your Support Goes
      </h2>
    </div>

    {/* ── Pilot Project ── */}
    <div className="impact-pilot">
      
      <div className="impact-pilot__text">
        <p className="impact-label">Flagship Pilot · Namanga, Kenya</p>

        <h3 className="impact-pilot__title">
          Transforming Livelihoods in Namanga
        </h3>

        <p className="impact-pilot__description">
          Our flagship programme partners with Maasai women in Namanga —
          introducing drought-resistant dragon fruit cultivation, building
          market linkages, and nurturing women-led cooperatives that generate
          lasting income and community resilience.
        </p>

        <a href="#" className="btn btn--coral">
          Explore the Project <ArrowRight size={16} />
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

      <div className="brand-divider brand-divider--light" aria-hidden="true">
        <span className="brand-divider__line brand-divider__line--left" />
        <span className="brand-divider__symbol">
          <HeartHandshake size={22} strokeWidth={1.5} />
        </span>
        <span className="brand-divider__line brand-divider__line--right" />
      </div>

      <h2 className="gallery-title" id="gallery-title">
        Moments from the Field
      </h2>

      <p className="gallery-subtext">
        Every image tells a story of resilience, dignity, and transformation.
        These are the faces and places that inspire everything we do.
      </p>
    </div>

  </div>

  {/* Gallery Strip (Full Width Scroll Feel) */}
  <div className="gallery-strip">

    {galleryImages.map((item, index) => (
  <div key={index} className="gallery-item">
    <img src={item.src} alt={item.alt} />
  </div>
))}

  </div>

</section>


      {/* ── Articles Section ── */}
<section className="articles-section" aria-labelledby="articles-title">

  <div className="container">

    {/* Header */}
    <div className="articles-header">
      <p className="articles-eyebrow">FROM OUR JOURNAL</p>

      <div className="brand-divider" aria-hidden="true">
        <span className="brand-divider__line brand-divider__line--left" />
        <span className="brand-divider__symbol">
          <HeartHandshake size={22} strokeWidth={1.5} />
        </span>
        <span className="brand-divider__line brand-divider__line--right" />
      </div>

      <h2 className="articles-title" id="articles-title">
        Stories That Shape Our Work
      </h2>

      <p className="articles-subtext">
        Real stories of courage and transformation — from the women, communities,
        and journeys that define Siana Africa.
      </p>
    </div>

    {/* Articles Grid */}
    <div className="articles-grid">

      {articles.map((article, index) => (
        <a
          key={index}
          href={article.link}
          className="article-card"
          aria-label={`Read article: ${article.title}`}
        >

          {/* Image — pure visual space */}
          <div className="article-card__image">
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
            />
            <div className="article-card__overlay" />
          </div>

          {/* Title — top-left floating over image */}
          <h3 className="article-card__title">{article.title}</h3>

          {/* Bottom overlay — excerpt + CTA */}
          <div className="article-card__content">
            <p className="article-card__excerpt">
              {article.excerpt}
            </p>

            <span className="article-card__cta">
              Read More <ArrowRight size={16} />
            </span>
          </div>

        </a>
      ))}

    </div>

    {/* Bottom CTA */}
    <div className="articles-footer">
      <a href="/blog" className="btn btn--ghost">
        View All Articles <ArrowRight size={16} />
      </a>
    </div>

  </div>

</section>

      {/* ── Join The Movement Section ── */}
<section id="join-section" className="join-section">

  <div className="container">

    {/* ── HERO SPLIT ── */}
    <div className="join-hero">

      {/* LEFT IMAGE */}
      <div className="join-hero__image">
        <img src={maasaiWomenImg} alt="Siana Africa community women" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="join-hero__content">
        <p className="join-eyebrow">JOIN THE MOVEMENT</p>
        <div className="brand-divider brand-divider--light" aria-hidden="true">
          <span className="brand-divider__line brand-divider__line--left" />
          <span className="brand-divider__symbol">
            <HeartHandshake size={22} strokeWidth={1.5} />
          </span>
          <span className="brand-divider__line brand-divider__line--right" />
        </div>

        <h2 className="join-title">
          Be Part of Something Bigger
        </h2>

        <p className="join-text">
          Whether you're a skilled professional, a passionate volunteer, or an
          organisation that shares our values — there's a place for you in this
          movement. Your time, skills, and resources directly transform lives across Kenya.
        </p>

        <a href="#contact" className="btn btn--coral">
          Get Involved <ArrowRight size={16} />
        </a>
      </div>

    </div>

    {/* ── INVOLVEMENT CARDS ── */}
    <div className="join-options">

      <div className="join-card">
        <div className="join-card__icon">
          <Users size={26} />
        </div>
        <h3>Strategic Partnerships</h3>
        <p>
          Collaborate with us to co-create sustainable solutions and amplify
          impact across rural Kenya.
        </p>
      </div>

      <div className="join-card">
        <div className="join-card__icon">
          <HeartHandshake size={26} />
        </div>
        <h3>Fund Real Change</h3>
        <p>
          Your donation directly funds skills training, agricultural programmes,
          and women-led enterprises that last generations.
        </p>
      </div>

    </div>

    {/* ── NEWSLETTER ── */}
    <div className="join-newsletter">
      <div className="newsletter-card">

        {/* Left: value proposition */}
        <div className="newsletter-card__left">
          <span className="newsletter-badge">📬 Newsletter</span>
          <h3 className="newsletter-title">Stay Close<br />to the Field</h3>
          <p className="newsletter-tagline">
            Join our growing community of supporters and receive stories,
            updates, and reports — directly from Kenya.
          </p>
          <ul className="newsletter-features">
            <li>Monthly field stories from Namanga</li>
            <li>Programme impact updates</li>
            <li>Community spotlights &amp; photos</li>
            <li>First access to volunteer openings</li>
          </ul>
        </div>

        {/* Right: form + downloads */}
        <div className="newsletter-card__right">
          <div className="newsletter-form-block">
            <label htmlFor="newsletter-email" className="newsletter-label">
              Your email address
            </label>
            <div className="newsletter-input-group">
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <button className="btn btn--coral">Subscribe</button>
            </div>
            <p className="newsletter-privacy">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>

          <div className="newsletter-divider">
            <span>Also available</span>
          </div>

          <div className="newsletter-resources">
            <a href="/assets/siana_africa_quarterly_newsletter_04-2025" className="resource-card">
              <span className="resource-card__icon">📄</span>
              <span className="resource-card__text">
                <strong>2025 Annual Report</strong>
                <em>Year in review</em>
              </span>
            </a>
            <a href="/assets/siana_africa_quarterly_newsletter_01-2026" className="resource-card">
              <span className="resource-card__icon">📄</span>
              <span className="resource-card__text">
                <strong>2026 Impact Report</strong>
                <em>Q1 Progress</em>
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>

</section>


      {/* ── Footer ── */}
      <footer id="contact" className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <p className="footer__logo">SIANA Africa</p>
            <p className="footer__tagline">
              Empowering Women. Preserving Culture.<br />
              Promoting Sustainability Across Kenya.
            </p>
          </div>
          <div className="footer__links">
            <p className="footer__links-heading">Explore</p>
            <ul role="list">
              <li><a href="#mission">Our Mission</a></li>
              <li><a href="#mission">Core Values</a></li>
              <li><a href="#mission">Our Work</a></li>
              <li><a href="#join-section">Get Involved</a></li>
            </ul>
          </div>
          <div className="footer__contact">
            <p className="footer__links-heading">Connect</p>
            <p>Kenya · East Africa</p>
            <a href="mailto:info@sianaafrica.org" className="footer__email">
              info@sianaafrica.org
            </a>
            <a href="#contact" className="btn btn--coral btn--sm footer__donate">
              Donate Now <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container">
            <p>© {new Date().getFullYear()} SIANA Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

