import './styles.css'
import { useEffect } from 'react'
import { company, contact, about, services, getService } from '../../content.js'
import { Link, Logo, Photo, Icon, ContactForm, MapEmbed, SkipLink, mapsLink, useToggle } from '../../shared.jsx'

const menu = [
  { path: '/', label: 'Accueil' },
  { path: '/a-propos/', label: 'À propos' },
  ...services.map((s) => ({ path: `/${s.slug}/`, label: s.title })),
  { path: '/contact/', label: 'Contact' },
]

function Header() {
  const [open, toggle, setOpen] = useToggle()
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <header className={`header ${open ? 'is-open' : ''}`}>
      <div className="wrap header-inner">
        <Link to="/" className="header-logo"><Logo /></Link>
        <nav className="header-links" aria-label="Raccourcis">
          <Link to="/prestations/">Prestations</Link>
          <Link to="/a-propos/">Cabinet</Link>
          <Link to="/contact/">Contact</Link>
        </nav>
        <button className="menu-button" aria-expanded={open} aria-controls="overlay" onClick={toggle}>
          <span>{open ? 'Fermer' : 'Menu'}</span>
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>
      <div id="overlay" className="overlay" hidden={!open}>
        <nav className="wrap overlay-inner" aria-label="Navigation principale">
          <ol>
            {menu.map((m, i) => (
              <li key={m.path}><Link to={m.path}><span className="num">{String(i + 1).padStart(2, '0')}</span>{m.label}</Link></li>
            ))}
          </ol>
          <div className="overlay-contact">
            <p>{company.street}<br />{company.city}</p>
            <p><a href={`tel:${company.phoneIntl}`}>{company.phone}</a><br /><a href={`mailto:${company.email}`}>{company.email}</a></p>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer-kicker">Un projet, une question ?</p>
        <a className="footer-big" href={`mailto:${company.email}`}>{company.email}</a>
        <div className="footer-grid">
          <p>{company.name}<br />{company.street}<br />{company.city}</p>
          <p><a href={`tel:${company.phoneIntl}`}>T {company.phone}</a><br /><a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a></p>
          <ul>{services.map((s) => <li key={s.slug}><Link to={`/${s.slug}/`}>{s.title}</Link></li>)}</ul>
          <p className="footer-copy">© {new Date().getFullYear()} Finaversum</p>
        </div>
      </div>
    </footer>
  )
}

function Title({ num, kicker, children }) {
  return (
    <header className="title">
      <p className="kicker">{num && <span className="num">{num}</span>}{kicker}</p>
      <h1>{children}</h1>
    </header>
  )
}

function ServiceRows() {
  return (
    <ol className="rows">
      {services.map((s, i) => (
        <li key={s.slug}>
          <Link to={`/${s.slug}/`} className="row">
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="row-title">{s.title}</span>
            <span className="row-text">{s.short}</span>
            <Icon name="arrow" size={28} className="row-arrow" />
          </Link>
        </li>
      ))}
    </ol>
  )
}

const approach = [
  { title: 'Comprendre', text: 'Un entretien approfondi pour cerner votre situation, vos projets et vos véritables besoins.' },
  { title: 'Simuler', text: 'Notre programme de planification projette votre patrimoine et teste chaque scénario de vie.' },
  { title: 'Accompagner', text: 'Des recommandations indépendantes et un suivi sur le long terme, avec notre réseau de partenaires.' },
]

function Home() {
  return (
    <>
      <section className="wrap hero">
        <p className="kicker">Conseils financiers, fiscaux et successoraux — Martigny, depuis {company.founded}</p>
        <h1 className="display">
          <span>Avoir des désirs,</span>
          <span className="accent">des objectifs</span>
          <span>et les réaliser</span>
        </h1>
      </section>
      <figure className="wrap-wide hero-figure">
        <Photo n={1} eager sizes="100vw" />
      </figure>
      <section className="wrap intro">
        <p className="intro-lead">{about.intro[0]}</p>
        <div className="intro-side">
          <p>{about.intro[1]}</p>
          <Link to="/a-propos/" className="arrow-link">Le cabinet <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      <section className="wrap block">
        <p className="kicker"><span className="num">01</span>Prestations</p>
        <h2 className="h-section">Pour qui nous travaillons</h2>
        <ServiceRows />
      </section>

      <section className="quote">
        <div className="wrap">
          <blockquote>
            <p>« Nous ne vendons aucun produit bancaire ou d’assurance. Notre approche est exclusivement celle du conseil personnalisé. »</p>
          </blockquote>
        </div>
      </section>

      <section className="wrap block">
        <p className="kicker"><span className="num">02</span>Méthode</p>
        <h2 className="h-section">Simuler tous les scénarios de vie</h2>
        <ol className="steps">
          {approach.map((a, i) => (
            <li key={a.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap block">
        <p className="kicker"><span className="num">03</span>Valeurs</p>
        <dl className="values">
          {company.values.map((v) => (
            <div key={v.title}><dt>{v.title}</dt><dd>{v.text}</dd></div>
          ))}
        </dl>
      </section>
    </>
  )
}

function About() {
  return (
    <>
      <section className="wrap page-head">
        <Title kicker="Le cabinet">À propos</Title>
        <p className="intro-lead">{about.intro[0]}</p>
      </section>
      <figure className="wrap-wide hero-figure hero-figure-short"><Photo n={2} eager /></figure>
      <section className="wrap columns">
        <div>
          <p className="kicker"><span className="num">01</span>Approche</p>
          <p>{about.intro[1]}</p>
          <p>{about.tool}</p>
        </div>
        <div>
          <p className="kicker"><span className="num">02</span>Notre histoire</p>
          {about.history.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>
      <section className="wrap block">
        <div className="years">
          <div><span className="year">2003</span><p>Fondation par M. Luigi Galante et deux associés.</p></div>
          <div><span className="year">2018</span><p>M. Luigi Galante, cofondateur, dirige et administre le cabinet.</p></div>
        </div>
      </section>
      <section className="quote">
        <div className="wrap">
          <blockquote><p>Indépendance, transparence et confidentialité sont les valeurs avec lesquelles nous abordons chaque dossier.</p></blockquote>
        </div>
      </section>
    </>
  )
}

function Services() {
  return (
    <section className="wrap page-head">
      <Title kicker="Prestations">Conseil sur mesure</Title>
      <p className="intro-lead">Chaque étape de vie et chaque projet ont des répercussions financières qui méritent d’être anticipées et optimisées.</p>
      <ServiceRows />
    </section>
  )
}

function Service({ slug }) {
  const i = services.findIndex((s) => s.slug === slug)
  const s = getService(slug)
  const next = services[(i + 1) % services.length]
  return (
    <>
      <section className="wrap service">
        <div className="service-side">
          <Title num={String(i + 1).padStart(2, '0')} kicker="Prestations">{s.title}</Title>
          <p className="intro-lead">{s.lead}</p>
          <p>{s.common}</p>
          <Link to="/contact/" className="pill">Prendre rendez-vous <Icon name="arrow" size={18} /></Link>
        </div>
        <ol className="service-items">
          {s.items.map((it, k) => (
            <li key={it}><span className="num">{String(k + 1).padStart(2, '0')}</span>{it}</li>
          ))}
        </ol>
      </section>
      <figure className="wrap-wide hero-figure hero-figure-short"><Photo n={s.photo} /></figure>
      <section className="wrap next">
        <p className="kicker">Suivant</p>
        <Link to={`/${next.slug}/`} className="next-link">{next.title} <Icon name="arrow" size={40} /></Link>
      </section>
    </>
  )
}

function Contact() {
  return (
    <>
      <section className="wrap page-head">
        <Title kicker="Contact">Parlons de vos projets</Title>
      </section>
      <section className="wrap contact">
        <div className="contact-info">
          <div>
            <p className="kicker">Interlocuteur</p>
            <p className="contact-name">{contact.name}</p>
            <p>{contact.role}</p>
            <p><a href={`tel:${contact.mobileIntl}`}>M {contact.mobile}</a><br /><a href={`tel:${company.phoneIntl}`}>T {contact.phone}</a><br /><a href={`mailto:${contact.email}`}>{contact.email}</a><br /><a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a></p>
          </div>
          <div>
            <p className="kicker">Cabinet</p>
            <p className="contact-name">{company.name}</p>
            <p>{company.street}<br />{company.city}</p>
            <p><a href={`tel:${company.phoneIntl}`}>{company.phone}</a><br /><a href={`mailto:${company.email}`}>{company.email}</a></p>
            <p><a href={mapsLink} target="_blank" rel="noopener" className="arrow-link">Itinéraire <Icon name="arrow" size={18} /></a></p>
          </div>
        </div>
        <ContactForm submitClass="pill" />
      </section>
      <section className="wrap-wide"><MapEmbed className="map" /></section>
    </>
  )
}

const pages = { home: Home, about: About, services: Services, service: Service, contact: Contact }

function Page({ route }) {
  const Body = pages[route.page]
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" data-page={route.page}><Body slug={route.service} /></main>
      <Footer />
    </>
  )
}

export default {
  id: 'editorial',
  name: 'Éditorial',
  summary: 'Minimal et typographique : grandes capitales fines inspirées du logo, sections numérotées, beaucoup de blanc.',
  themeColor: '#f6f5f2',
  Page,
}
