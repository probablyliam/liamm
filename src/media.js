import { useEffect, useState } from 'react'

export function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src || '')
}

// Only a finished, public project gets the green dot. Everything else
// ("Unity demo", "In development") stays neutral so it never reads as a warning.
export function statusClass(status = '') {
  const s = status.toLowerCase()
  if (s.includes('live') || s.includes('shipped') || s.includes('complete')) return 'is-ok'
  return 'is-idle'
}

export function usePrefersReducedMotion() {
  const [reduce] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  return reduce
}

// Plays a muted clip while it is on screen and pauses it once scrolled away.
// Nothing downloads until the clip first comes into view (pair with
// preload="none"). Skipped entirely when the viewer prefers reduced motion.
export function useInViewPlayback(ref, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined
    const v = ref.current
    if (!v) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [ref, enabled])
}
