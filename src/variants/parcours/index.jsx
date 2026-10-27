import './styles.css'
import { useEffect, useState } from 'react'
import { company, contact, about, services, nav, getService } from '../../content.js'
import { Link, Logo, GenImage, Icon, ContactForm, MapEmbed, SkipLink, mapsLink, useToggle, useSite, valueIcons } from '../../shared.jsx'

// Proposition 4 — « Parcours » : récit par étapes de vie, grille suisse, images générées.

const chapters = [
  { id: 'construire', verb: 'Construire', service: 'particuliers', image: 'particuliers', text: 'Fiscalité, prévoyance, immobilier, retraite anticipée : chaque étape de vie a des répercussions financières qui méritent d’être anticipées.' },
  { id: 'entreprendre', verb: 'Entreprendre', service: 'societes-de-personnes', image: 'entrepreneur', text: 'La maîtrise du risque et la planification font partie de la vie d’entrepreneur. Nous vous aiguillons sur les questions financières et fiscales.' },
  { id: 'diriger', verb: 'Diriger', service: 'societes-morales', image: 'direction', text: 'Valeur de l’entreprise, salaire ou dividendes, prévoyance des dirigeants : des décisions étayées par des simulations chiffrées.' },
  { id: 'transmettre', verb: 'Transmettre', image: 'transmission', text: 'Succession privée ou transmission d’entreprise : nous intégrons ces questions très tôt pour protéger ce que vous avez bâti.' },
]

const steps = [
  { title: 'Comprendre', text: 'Un premier entretien pour cerner votre situation, vos projets et vos véritables besoins.' },
  { title: 'Simuler', text: 'Notre programme projette l’intégralité de votre patrimoine et teste chaque scénario de vie.' },
  { title: 'Décider', text: 'Des recommandations indépendantes et argumentées, sans produit à vendre.' },
  { title: 'Accompagner', text: 'Un suivi sur le long terme, appuyé par notre réseau de partenaires spécialisés.' },
]

const pad = (n) => String(n).padStart(2, '0')

function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - innerHeight
      setP(max > 0 ? scrollY / max : 0)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return p
}

// Fait apparaître les blocs .reveal au défilement. Sans JS ou en mouvement réduit,
// le contenu reste affiché tel quel.
function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -10% 0px' })
    document.documentElement.classList.add('reveal-ready')
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useActiveChapter(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
    }, { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return active
}

function Header() {
  const [open, toggle] = useToggle()
  const { path } = useSite()
  const progress = useScrollProgress()
  return (
    <header className="header">
      <div className="grid header-inner">
        <Link to="/" className="header-logo"><Logo /></Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav" onClick={toggle}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
          <span className="sr-only">Menu</span>
        </button>
        <nav id="nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          <ul>
            {nav.flatMap((i) => i.children || [i]).filter((i) => i.path !== '/contact/').map((i) => (
              <li key={i.path}><Link to={i.path}>{i.label}</Link></li>
            ))}
          </ul>
          <Link to="/contact/" className={`btn ${path === '/contact/' ? 'btn-line' : ''}`}>Prendre rendez-vous</Link>
        </nav>
      </div>
      <div className="progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="grid footer-grid">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <p>Conseils financiers, fiscaux et successoraux indépendants. Martigny, depuis {company.founded}.</p>
        </div>
        <div>
          <h2>Cabinet</h2>
          <address>{company.name}<br />{company.street}<br />{company.city}</address>
        </div>
        <div>
          <h2>Contact</h2>
          <p><a href={`tel:${company.phoneIntl}`}>{company.phone}</a><br /><a href={`mailto:${company.email}`}>{company.email}</a><br /><a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a></p>
        </div>
        <div>
          <h2>Prestations</h2>
          <ul>{services.map((s) => <li key={s.slug}><Link to={`/${s.slug}/`}>{s.title}</Link></li>)}</ul>
        </div>
      </div>
      <div className="grid footer-bottom"><span>© {new Date().getFullYear()} {company.name}</span><span>Images d’illustration générées par IA</span></div>
    </footer>
  )
}

function Kicker({ n, children }) {
  return <p className="kicker"><span>{n}</span>{children}</p>
}

function Chapters() {
  const ids = chapters.map((c) => c.id)
  const active = useActiveChapter(ids)
  return (
    <section className="chapters" aria-labelledby="chapters-title">
      <div className="grid">
        <aside className="chapter-index">
          <Kicker n="01">Votre parcours</Kicker>
          <h2 id="chapters-title">Un conseil à chaque étape de vie</h2>
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}><a href={`#${c.id}`} aria-current={active === c.id ? 'step' : undefined}><span>{pad(i + 1)}</span>{c.verb}</a></li>
            ))}
          </ol>
        </aside>
        <div className="chapter-list">
          {chapters.map((c, i) => {
            const s = c.service && getService(c.service)
            return (
              <article key={c.id} id={c.id} className="chapter reveal">
                <GenImage name={c.image} className="chapter-img" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="chapter-body">
                  <p className="chapter-num">{pad(i + 1)} / {pad(chapters.length)}</p>
                  <h3>{c.verb}</h3>
                  <p className="chapter-for">{s ? s.title : 'Succession et transmission'}</p>
                  <p>{c.text}</p>
                  <Link to={s ? `/${s.slug}/` : '/contact/'} className="arrow">
                    {s ? 'Voir les prestations' : 'En parler avec nous'} <Icon name="arrow" size={18} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="reveal">
          <span>{pad(i + 1)}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

function Values() {
  return (
    <div className="values">
      {company.values.map((v, i) => (
        <article key={v.title} className="reveal">
          <Icon name={valueIcons[i]} size={24} />
          <h3>{v.title}</h3>
          <p>{v.text}</p>
        </article>
      ))}
    </div>
  )
}

function FinalCta() {
  return (
    <section className="final">
      <div className="grid final-inner">
        <div>
          <p className="kicker kicker-light"><span>→</span>Prochaine étape</p>
          <h2>Commençons par un entretien.</h2>
          <p>Nous étudions votre situation et vous indiquons comment nous pouvons vous aider, sans engagement.</p>
        </div>
        <div className="final-actions">
          <Link to="/contact/" className="btn btn-white">Prendre rendez-vous <Icon name="arrow" size={18} /></Link>
          <a href={`tel:${company.phoneIntl}`} className="final-phone"><Icon name="phone" size={18} /> {company.phone}</a>
        </div>
      </div>
    </section>
  )
}

function Home() {
  useReveal()
  return (
    <>
      <section className="hero">
        <div className="grid hero-grid">
          <div className="hero-text">
            <Kicker n="FV">Cabinet indépendant · Martigny, Valais</Kicker>
            <h1>{company.tagline[0]} <em>{company.tagline[1]}</em> {company.tagline[2]}.</h1>
            <p className="lead">Conseils financiers, fiscaux et successoraux pour particuliers et entreprises, depuis {company.founded}. Aucun produit vendu : uniquement du conseil.</p>
            <div className="actions">
              <Link to="/contact/" className="btn">Prendre rendez-vous <Icon name="arrow" size={18} /></Link>
              <a href="#construire" className="btn btn-line">Découvrir le parcours</a>
            </div>
          </div>
          <figure className="hero-figure">
            <GenImage name="valais" eager sizes="(min-width: 1024px) 58vw, 100vw" />
          </figure>
        </div>
        <dl className="grid facts">
          <div><dt>{company.founded}</dt><dd>Fondation du cabinet</dd></div>
          <div><dt>0</dt><dd>Produit bancaire ou d’assurance vendu</dd></div>
          <div><dt>3</dt><dd>Expertises : finance, fiscalité, succession</dd></div>
          <div><dt>1</dt><dd>Programme de planification unique</dd></div>
        </dl>
      </section>

      <Chapters />

      <section className="section">
        <div className="grid method">
          <div className="method-head">
            <Kicker n="02">Méthode</Kicker>
            <h2>Simuler avant de décider</h2>
            <p className="muted">{about.tool}</p>
          </div>
          <GenImage name="planification" className="method-img reveal" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
        <div className="grid"><Steps /></div>
      </section>

      <section className="section section-tint">
        <div className="grid">
          <div className="section-head">
            <Kicker n="03">Valeurs</Kicker>
            <h2>Indépendance, transparence, confidentialité</h2>
          </div>
          <Values />
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function PageHead({ n, kicker, title, lead, image }) {
  return (
    <section className="page-head">
      <div className="grid page-head-grid">
        <div className="page-head-text">
          <Kicker n={n}>{kicker}</Kicker>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
        {image && <GenImage name={image} className="page-head-img" eager sizes="(min-width: 1024px) 42vw, 100vw" />}
      </div>
    </section>
  )
}

function About() {
  useReveal()
  return (
    <>
      <PageHead n="FV" kicker="Le cabinet" title="À propos" lead={about.intro[0]} image="valais" />
      <section className="section">
        <div className="grid two-col">
          <div className="reveal"><Kicker n="01">Approche</Kicker><p>{about.intro[1]}</p><p>{about.tool}</p></div>
          <div className="reveal">
            <Kicker n="02">Notre histoire</Kicker>
            <ol className="timeline">
              <li><strong>2003</strong><span>Création par M. Luigi Galante et deux associés.</span></li>
              <li><strong>2018</strong><span>M. Luigi Galante, cofondateur, dirige et administre le cabinet.</span></li>
              <li><strong>Aujourd’hui</strong><span>{about.history[1]}</span></li>
            </ol>
          </div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="grid"><Values /></div>
      </section>
      <FinalCta />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHead n="01" kicker="Prestations" title="Trois publics, une même exigence" lead="Chaque étape de vie et chaque projet ont des répercussions financières qui méritent d’être anticipées et optimisées." />
      <section className="section section-flush">
        <div className="grid tiles">
          {chapters.filter((c) => c.service).map((c, i) => {
            const s = getService(c.service)
            return (
              <Link key={s.slug} to={`/${s.slug}/`} className="tile">
                <GenImage name={c.image} className="tile-img" sizes="(min-width: 1024px) 33vw, 100vw" />
                <span className="chapter-num">{pad(i + 1)} · {c.verb}</span>
                <h2>{s.title}</h2>
                <p>{s.short}</p>
                <span className="arrow">Voir les prestations <Icon name="arrow" size={18} /></span>
              </Link>
            )
          })}
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function Service({ slug }) {
  const i = services.findIndex((s) => s.slug === slug)
  const s = services[i]
  const ch = chapters.find((c) => c.service === slug)
  return (
    <>
      <PageHead n={pad(i + 1)} kicker={ch.verb} title={s.title} lead={s.lead} image={ch.image} />
      <section className="section">
        <div className="grid service">
          <div className="service-intro">
            <p className="muted">{s.common}</p>
            <nav className="service-others" aria-label="Autres prestations">
              {services.filter((o) => o.slug !== slug).map((o) => (
                <Link key={o.slug} to={`/${o.slug}/`} className="arrow">{o.title} <Icon name="arrow" size={18} /></Link>
              ))}
            </nav>
          </div>
          <ol className="items">
            {s.items.map((it, k) => <li key={it}><span>{pad(k + 1)}</span>{it}</li>)}
          </ol>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function Contact() {
  return (
    <>
      <PageHead n="→" kicker="Contact" title="Prenons rendez-vous" lead="Un premier entretien pour comprendre votre situation et vos objectifs." />
      <section className="section section-flush">
        <div className="grid contact">
          <div className="contact-info">
            <div>
              <h2 className="h3">{contact.name}</h2>
              <p className="muted">{contact.role}</p>
              <ul className="contact-list">
                <li><Icon name="phone" size={18} /><a href={`tel:${contact.mobileIntl}`}>{contact.mobile}</a></li>
                <li><Icon name="phone" size={18} /><a href={`tel:${company.phoneIntl}`}>{contact.phone}</a></li>
                <li><Icon name="mail" size={18} /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li><Icon name="linkedin" size={18} /><a href={contact.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h2 className="h3">{company.name}</h2>
              <ul className="contact-list">
                <li><Icon name="pin" size={18} /><a href={mapsLink} target="_blank" rel="noopener">{company.street}, {company.city}</a></li>
                <li><Icon name="mail" size={18} /><a href={`mailto:${company.email}`}>{company.email}</a></li>
              </ul>
            </div>
          </div>
          <div className="form-panel">
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
  id: 'parcours',
  name: 'Parcours',
  summary: 'Récit par étapes de vie (construire, entreprendre, diriger, transmettre), grille suisse, nouvelles images générées autour du Valais.',
  themeColor: '#ffffff',
  Page,
}
