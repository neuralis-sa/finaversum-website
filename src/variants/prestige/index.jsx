import './styles.css'
import { useState } from 'react'
import { company, contact, about, services, nav, getService } from '../../content.js'
import { Link, Logo, Photo, Icon, ContactForm, MapEmbed, SkipLink, mapsLink, useToggle, useSite, valueIcons } from '../../shared.jsx'

// Le « Λ V » du logo, réutilisé comme motif graphique.
function Chevrons({ className }) {
  return (
    <svg className={className} viewBox="0 0 360 200" fill="none" aria-hidden="true" focusable="false">
      <path d="M10 196 92 4h10l82 192" stroke="currentColor" strokeWidth="1.5" />
      <path d="M176 4h10l82 192h10l82-192" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Header() {
  const [open, toggle] = useToggle()
  const { path } = useSite()
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo"><Logo white /></Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav" onClick={toggle}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
          <span className="sr-only">Menu</span>
        </button>
        <nav id="nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          <ul>
            {nav.flatMap((item) => item.children || [item]).filter((item) => item.path !== '/contact/').map((item) => (
              <li key={item.path}><Link to={item.path}>{item.label}</Link></li>
            ))}
          </ul>
          <Link to="/contact/" className={`btn ${path === '/contact/' ? 'btn-outline' : ''}`}>Rendez-vous</Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Chevrons className="footer-mark" />
      <div className="container footer-grid">
        <div>
          <Logo white className="footer-logo" />
          <p className="dim">Cabinet indépendant de conseils financiers, fiscaux et successoraux.</p>
        </div>
        <address>
          {company.name}<br />{company.street}<br />{company.city}
        </address>
        <p>
          <a href={`tel:${company.phoneIntl}`}>{company.phone}</a><br />
          <a href={`mailto:${company.email}`}>{company.email}</a><br />
          <a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        </p>
      </div>
      <div className="container footer-bottom dim">© {new Date().getFullYear()} {company.name}</div>
    </footer>
  )
}

function SegmentTabs() {
  const [active, setActive] = useState(0)
  const s = services[active]
  function onKey(e) {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    const n = (active + d + services.length) % services.length
    setActive(n)
    document.getElementById(`tab-${services[n].slug}`)?.focus()
  }
  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="Vous êtes" onKeyDown={onKey}>
        {services.map((t, i) => (
          <button key={t.slug} id={`tab-${t.slug}`} role="tab" aria-selected={i === active} aria-controls="tabpanel" tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)}>
            {t.title}
          </button>
        ))}
      </div>
      <div id="tabpanel" className="tabpanel" role="tabpanel" aria-labelledby={`tab-${s.slug}`}>
        <div className="tabpanel-text">
          <h3>{s.title}</h3>
          <p>{s.lead}</p>
          <Link to={`/${s.slug}/`} className="btn">Voir les prestations <Icon name="arrow" size={18} /></Link>
        </div>
        <ul className="tick-list">
          {s.items.slice(0, 5).map((it) => <li key={it}><Icon name="check" size={18} /> {it}</li>)}
        </ul>
      </div>
    </div>
  )
}

function Projection() {
  // Illustration abstraite d'une projection patrimoniale (pas de données réelles).
  return (
    <svg className="projection" viewBox="0 0 480 280" role="img" aria-label="Illustration : projection de scénarios dans le temps">
      <defs>
        <linearGradient id="pg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8fb0cc" stopOpacity=".35" />
          <stop offset="1" stopColor="#8fb0cc" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 120, 180, 240].map((y) => <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="#ffffff" strokeOpacity=".08" />)}
      <path d="M0 230 C80 220 120 200 180 170 S300 110 360 90 440 50 480 40 V280 H0Z" fill="url(#pg)" />
      <path d="M0 230 C80 220 120 200 180 170 S300 110 360 90 440 50 480 40" stroke="#8fb0cc" strokeWidth="2.5" fill="none" />
      <path d="M180 170 C240 160 300 150 360 140 S440 120 480 118" stroke="#9d9ca0" strokeWidth="1.5" strokeDasharray="5 6" fill="none" />
      <path d="M180 170 C240 175 300 190 360 196 S440 200 480 205" stroke="#9d9ca0" strokeWidth="1.5" strokeDasharray="5 6" fill="none" />
      <circle cx="180" cy="170" r="6" fill="#0d1b2a" stroke="#8fb0cc" strokeWidth="2.5" />
    </svg>
  )
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow">Finaversum · Martigny · depuis {company.founded}</p>
            <h1>{company.tagline[0]}<br /><em>{company.tagline[1]}</em><br />{company.tagline[2]}</h1>
            <p className="lead">Conseils financiers, fiscaux et successoraux indépendants pour particuliers, entrepreneurs et dirigeants.</p>
            <div className="actions">
              <Link to="/contact/" className="btn">Prendre rendez-vous <Icon name="arrow" size={18} /></Link>
              <a href={`tel:${company.phoneIntl}`} className="btn btn-outline"><Icon name="phone" size={18} /> {company.phone}</a>
            </div>
          </div>
          <div className="hero-visual">
            <Chevrons className="hero-mark" />
            <div className="duotone"><Photo n={3} eager sizes="(min-width: 960px) 45vw, 100vw" /></div>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="En bref">
        <div className="container stats-grid">
          <div><strong>{company.founded}</strong><span>année de fondation</span></div>
          <div><strong>0</strong><span>produit bancaire ou d’assurance vendu</span></div>
          <div><strong>3</strong><span>domaines : finance, fiscalité, succession</span></div>
          <div><strong>1</strong><span>programme de planification unique</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Vous êtes</p>
          <h2>Un conseil pensé pour votre situation</h2>
          <SegmentTabs />
        </div>
      </section>

      <section className="section section-panel">
        <div className="container split">
          <div>
            <p className="eyebrow">Planification financière</p>
            <h2>Anticiper plutôt que subir</h2>
            <p className="dim">{about.tool}</p>
            <Link to="/a-propos/" className="link">Découvrir le cabinet <Icon name="arrow" size={18} /></Link>
          </div>
          <Projection />
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <p className="eyebrow">Nos valeurs</p>
          <h2>Indépendance, transparence, confidentialité</h2>
          <div className="values">
            {company.values.map((v, i) => (
              <article key={v.title}>
                <Icon name={valueIcons[i]} size={28} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  )
}

function Cta() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <h2>Prenons le temps d’étudier votre situation.</h2>
        <Link to="/contact/" className="btn">Nous contacter <Icon name="arrow" size={18} /></Link>
      </div>
    </section>
  )
}

function PageHead({ eyebrow, title, children }) {
  return (
    <section className="page-head">
      <Chevrons className="page-mark" />
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p className="lead">{children}</p>}
      </div>
    </section>
  )
}

function About() {
  return (
    <>
      <PageHead eyebrow="Le cabinet" title="À propos">{about.intro[0]}</PageHead>
      <section className="section">
        <div className="container split">
          <div className="duotone"><Photo n={1} sizes="(min-width: 960px) 50vw, 100vw" /></div>
          <div>
            <p className="dim">{about.intro[1]}</p>
            <p className="dim">{about.tool}</p>
          </div>
        </div>
      </section>
      <section className="section section-panel">
        <div className="container">
          <p className="eyebrow">Notre histoire</p>
          <ol className="milestones">
            <li><strong>2003</strong><p>Création de Finaversum par M. Luigi Galante et deux associés.</p></li>
            <li><strong>2018</strong><p>M. Luigi Galante, cofondateur, dirige et administre le cabinet, soutenu par des collaborateurs qui en partagent les valeurs.</p></li>
            <li><strong>Aujourd’hui</strong><p>{about.history[1]}</p></li>
          </ol>
        </div>
      </section>
      <Cta />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHead eyebrow="Prestations" title="Nos domaines d’intervention">Chaque étape de vie et chaque projet ont des répercussions financières qui méritent d’être anticipées et optimisées.</PageHead>
      <section className="section">
        <div className="container tiles">
          {services.map((s, i) => (
            <Link key={s.slug} to={`/${s.slug}/`} className="tile">
              <span className="tile-num">0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.short}</p>
              <Icon name="arrow" size={22} />
            </Link>
          ))}
        </div>
      </section>
      <Cta />
    </>
  )
}

function Service({ slug }) {
  const s = getService(slug)
  return (
    <>
      <PageHead eyebrow="Prestations" title={s.title}>{s.lead}</PageHead>
      <section className="section">
        <div className="container">
          <p className="dim narrow">{s.common}</p>
          <ul className="grid-list">
            {s.items.map((it, i) => (
              <li key={it}><span className="tile-num">{String(i + 1).padStart(2, '0')}</span>{it}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-panel">
        <div className="container others">
          {services.filter((o) => o.slug !== slug).map((o) => (
            <Link key={o.slug} to={`/${o.slug}/`} className="tile">
              <span className="eyebrow">Voir aussi</span>
              <h2>{o.title}</h2>
              <p>{o.short}</p>
              <Icon name="arrow" size={22} />
            </Link>
          ))}
        </div>
      </section>
      <Cta />
    </>
  )
}

function Contact() {
  return (
    <>
      <PageHead eyebrow="Contact" title="Prenons rendez-vous" />
      <section className="section">
        <div className="container contact">
          <div className="contact-cards">
            <article className="card">
              <p className="eyebrow">Votre interlocuteur</p>
              <h2 className="h3">{contact.name}</h2>
              <p className="dim">{contact.role}</p>
              <ul className="contact-list">
                <li><Icon name="phone" size={18} /><a href={`tel:${contact.mobileIntl}`}>{contact.mobile}</a></li>
                <li><Icon name="phone" size={18} /><a href={`tel:${company.phoneIntl}`}>{contact.phone}</a></li>
                <li><Icon name="mail" size={18} /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li><Icon name="linkedin" size={18} /><a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
              </ul>
            </article>
            <article className="card">
              <p className="eyebrow">Le cabinet</p>
              <h2 className="h3">{company.name}</h2>
              <ul className="contact-list">
                <li><Icon name="pin" size={18} /><a href={mapsLink} target="_blank" rel="noopener">{company.street}, {company.city}</a></li>
                <li><Icon name="phone" size={18} /><a href={`tel:${company.phoneIntl}`}>{company.phone}</a></li>
                <li><Icon name="mail" size={18} /><a href={`mailto:${company.email}`}>{company.email}</a></li>
              </ul>
            </article>
          </div>
          <div className="card">
            <h2 className="h3">Écrivez-nous</h2>
            <ContactForm submitClass="btn" />
          </div>
        </div>
      </section>
      <MapEmbed className="map" />
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
      <main id="main"><Body slug={route.service} /></main>
      <Footer />
    </>
  )
}

export default {
  id: 'prestige',
  name: 'Prestige',
  summary: 'Sombre et premium : bleu nuit, motif « ΛV » du logo, photos en duotone, onglets interactifs par type de client.',
  themeColor: '#0d1b2a',
  Page,
}
