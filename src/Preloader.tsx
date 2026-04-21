import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Heart, Leaf, Users } from 'lucide-react'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Icons pop in with stagger
      tl.from('.preloader__icon', {
        opacity: 0,
        scale: 0.4,
        duration: 0.5,
        stagger: 0.13,
        ease: 'back.out(1.7)',
      })
        // Brand text fades + rises in
        .from(
          '.preloader__brand',
          {
            opacity: 0,
            y: 22,
            scale: 0.96,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        // Tagline appears
        .from(
          '.preloader__tagline',
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        // Loading line sweeps across
        .from(
          '.preloader__line-fill',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.3,
            ease: 'power2.inOut',
          },
          '-=0.2',
        )
        // Brief hold then fade entire screen out
        .to(
          preloaderRef.current,
          {
            opacity: 0,
            duration: 0.75,
            ease: 'power2.inOut',
            delay: 0.35,
            onComplete,
          },
        )
    }, preloaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div className="preloader" ref={preloaderRef} aria-hidden="true">
      <div className="preloader__content">
        {/* Brand icons */}
        <div className="preloader__icons">
          <span className="preloader__icon" title="Community">
            <Users size={17} />
          </span>
          <span className="preloader__icon" title="Care">
            <Heart size={17} />
          </span>
          <span className="preloader__icon" title="Sustainability">
            <Leaf size={17} />
          </span>
        </div>

        {/* Brand name */}
        <h1 className="preloader__brand">SIANA AFRICA</h1>
        <p className="preloader__tagline">Empowering · Preserving · Sustaining</p>

        {/* Minimal loading indicator */}
        <div className="preloader__line">
          <div className="preloader__line-fill" />
        </div>
      </div>
    </div>
  )
}
