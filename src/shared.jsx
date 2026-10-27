import { createContext, useContext, useState } from 'react'
import { company } from './content.js'

export const SiteContext = createContext({ base: '/', path: '/' })

export function useSite() {
  const { base, path } = useContext(SiteContext)
  const root = base.replace(/\/$/, '')
  return { base, path, href: (p) => root + p, asset: (p) => root + '/' + p }
}

export function Link({ to, children, ...rest }) {
  const { href, path } = useSite()
  return (
    <a href={href(to)} aria-current={path === to ? 'page' : undefined} {...rest}>
      {children}
    </a>
  )
}

const photoSize = { 1: [1920, 1280], 2: [1920, 1265], 3: [1920, 1280] }
const photoAlt = {
  1: 'Entretien de conseil autour d’une table de réunion',
  2: 'Rendez-vous client dans la salle de conférence du cabinet',
  3: 'Analyse d’un dossier de planification financière',
}

export function Photo({ n, className, sizes = '100vw', eager = false, alt = photoAlt[n] }) {
  const { asset } = useSite()
  const [w, h] = photoSize[n]
  return (
    <img
      className={className}
      src={asset(`img/photo-${n}-1920.webp`)}
      srcSet={`${asset(`img/photo-${n}-960.webp`)} 960w, ${asset(`img/photo-${n}-1920.webp`)} 1920w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
    />
  )
}

// Images générées pour la proposition 4 (public/img/gen/<name>-{800,1600}.webp).
export const genImages = {
  valais: { w: 1600, h: 900, alt: 'Vignobles en terrasses et Alpes au-dessus de la vallée du Rhône, près de Martigny' },
  particuliers: { w: 1600, h: 2000, alt: 'Un couple examine sa planification financière avec un conseiller' },
  entrepreneur: { w: 1600, h: 2000, alt: 'Un entrepreneur valaisan dans sa cave, dossier en main' },
  direction: { w: 1600, h: 2000, alt: 'Dirigeants en réunion avec un conseiller dans une salle donnant sur les Alpes' },
  planification: { w: 1600, h: 900, alt: 'Projection financière à long terme étudiée sur papier' },
  transmission: { w: 1600, h: 900, alt: 'Un père et sa fille marchent dans les vignes, symbole de transmission' },
}

export function GenImage({ name, className, sizes = '100vw', eager = false }) {
  const { asset } = useSite()
  const { w, h, alt } = genImages[name]
  return (
    <img
      className={className}
      src={asset(`img/gen/${name}-1600.webp`)}
      srcSet={`${asset(`img/gen/${name}-800.webp`)} 800w, ${asset(`img/gen/${name}-1600.webp`)} 1600w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
    />
  )
}

export function Logo({ white = false, className }) {
  const { asset } = useSite()
  return (
    <img
      className={className}
      src={asset(white ? 'img/logo-white.png' : 'img/logo.png')}
      width="1200"
      height="131"
      alt="Finaversum"
    />
  )
}

// Icônes au trait (dessin inspiré de Lucide), héritent de currentColor.
const paths = {
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 2-10 7L2 6',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  check: 'M20 6 9 17l-5-5',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M18 6 6 18M6 6l12 12',
  chevron: 'm6 9 6 6 6-6',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  chart: 'M3 3v18h18M7 15l4-4 3 3 6-6',
}

export function Icon({ name, size = 20, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  )
}

export const valueIcons = ['shield', 'eye', 'lock']

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  return [on, () => setOn((v) => !v), setOn]
}

// Le site étant statique, le formulaire envoie vers un service externe
// (VITE_FORM_ENDPOINT, ex. Formspree). Sans endpoint, il ouvre le client mail.
const endpoint = import.meta.env.VITE_FORM_ENDPOINT || ''

export function ContactForm({ className = 'form', submitClass = 'button' }) {
  const [status, setStatus] = useState('idle')

  async function onSubmit(e) {
    const form = e.currentTarget
    if (!endpoint) {
      e.preventDefault()
      const d = new FormData(form)
      const body = `${d.get('message')}\n\n${d.get('name')} – ${d.get('email')}`
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(d.get('subject') || 'Demande de contact')}&body=${encodeURIComponent(body)}`
      return
    }
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(res.statusText)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={className} action={endpoint || `mailto:${company.email}`} method="post" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Nom <span aria-hidden="true">*</span></label>
        <input id="cf-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">E-mail <span aria-hidden="true">*</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field field-full">
        <label htmlFor="cf-subject">Sujet</label>
        <input id="cf-subject" name="subject" />
      </div>
      <div className="field field-full">
        <label htmlFor="cf-message">Message <span aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" rows="6" required />
      </div>
      <div className="field-full form-actions">
        <button className={submitClass} type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === 'sent' && 'Merci, votre message a bien été envoyé.'}
          {status === 'error' && `L’envoi a échoué. Écrivez-nous à ${company.email}.`}
        </p>
      </div>
    </form>
  )
}

export function MapEmbed({ className }) {
  const { lat, lng } = company.geo
  const d = 0.006
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join(',')
  return (
    <iframe
      className={className}
      title="Plan d’accès – Finaversum, Av. de la Gare 66, Martigny"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
      loading="lazy"
    />
  )
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Finaversum, Av. de la Gare 66, 1920 Martigny')}`

export function SkipLink() {
  return <a className="skip-link" href="#main">Aller au contenu</a>
}
