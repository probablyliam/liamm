import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Intro } from '../components/Intro'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'

export function Home() {
  const { hash } = useLocation()

  // Support /#projects style deep links. Instant jump — no smooth scrolling.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash])

  return (
    <>
      <Intro />
      <Projects />
      <Experience />
      <Skills />
    </>
  )
}
