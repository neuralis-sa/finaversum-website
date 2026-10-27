import './styles.css'
import { company, contact, about, services, nav, getService } from '../../content.js'
import { Link, Logo, Photo, Icon, ContactForm, MapEmbed, SkipLink, mapsLink, useToggle, useSite, valueIcons } from '../../shared.jsx'

function Header() {
  const [open, toggle] = useToggle()
  const { path } = useSite()
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo"><Logo /></Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="nav" onClick={toggle}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
          <span className="sr-only">Menu</span>
        </button>
        <nav id="nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          <ul>
            {nav.map((item) => (
              <li key={item.path} className={item.children ? 'has-sub' : undefined}>
                <Link to={item.path} className={item.children?.some((c) => c.path === path) ? 'is-active' : undefined}>
                  {item.label}
                  {item.children && <Icon name="chevron" size={16} />}
                </Link>
                {item.children && (
                  <ul className="sub">
                    {item.children.map((c) => (
                      <li key={c.path}><Link to={c.path}>{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <a className="button button-small" href={`tel:${company.phoneIntl}`}>
            <Icon name="phone" size={16} /> {company.phone}
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo white className="footer-logo" />
          <p>Conseils financiers, fiscaux et successoraux indépendants depuis {company.founded}.</p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>{company.name}<br />{company.street}<br />{company.city}</p>
          <p><a href={`tel:${company.phoneIntl}`}>T {company.phone}</a><br /><a href={`mailto:${company.email}`}>{company.email}</a></p>
        </div>
        <div>
          <h2>Prestations</h2>
          <ul>{services.map((s) => <li key={s.slug}><Link to={`/${s.slug}/`}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Cabinet</h2>
          <ul>
            <li><Link to="/a-propos/">À propos</Link></li>
            <li><Link to="/contact/">Contact</Link></li>
            <li><a href={contact.linkedin} rel="noopener" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {company.name} · Martigny, Valais</div>
    </footer>
  )
}

function PageHero({ title, eyebrow, photo = 2 }) {
  return (
    <section className="page-hero">
      <Photo n={photo} className="page-hero-img" eager />
      <div className="container page-hero-content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>Parlons de vos projets</h2>
          <p>Un premier entretien pour comprendre votre situation et vos objectifs.</p>
        </div>
        <div className="cta-actions">
          <Link to="/contact/" className="button button-light">Prendre rendez-vous</Link>
          <a href={`tel:${company.phoneIntl}`} className="cta-phone"><Icon name="phone" /> {company.phone}</a>
        </div>
      </div>
    </section>
  )
}

function Values() {
  return (
    <div className="values">
      {company.values.map((v, i) => (
        <article key={v.title} className="value">
          <span className="value-icon"><Icon name={valueIcons[i]} size={26} /></span>
          <h3>{v.title}</h3>
          <p>{v.text}</p>
        </article>
      ))}
    </div>
  )
}

function ServiceCards() {
  return (
    <div className="cards">
      {services.map((s) => (
        <Link key={s.slug} to={`/${s.slug}/`} className="card">
          <Photo n={s.photo} className="card-img" sizes="(min-width: 900px) 33vw, 100vw" />
          <div className="card-body">
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <span className="card-link">Découvrir <Icon name="arrow" size={18} /></span>
          </div>
        </Link>
      ))}
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="hero">
        <Photo n={2} className="hero-img" eager />
        <div className="container hero-content">
          <p className="eyebrow">Cabinet indépendant · Martigny</p>
          <h1>{company.tagline[0]} <strong>{company.tagline[1]}</strong> {company.tagline[2]}</h1>
          <p className="hero-lead">Conseils financiers, fiscaux et successoraux pour particuliers et entreprises, sans aucun produit à vendre.</p>
          <div className="hero-actions">
            <Link to="/contact/" className="button">Prendre rendez-vous</Link>
            <Link to="/prestations/" className="button button-ghost">Nos prestations</Link>
          </div>
        </div>
      </section>

      <section className="facts" aria-label="En bref">
        <div className="container facts-grid">
          <div><strong>Depuis {company.founded}</strong><span>au service de nos clients</span></div>
          <div><strong>100 % indépendant</strong><span>aucun produit bancaire ou d’assurance</span></div>
          <div><strong>Pluridisciplinaire</strong><span>finance, fiscalité et succession</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Nos prestations</p>
            <h2>Un accompagnement adapté à chaque situation</h2>
          </header>
          <ServiceCards />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <Photo n={3} className="split-img" sizes="(min-width: 900px) 50vw, 100vw" />
          <div>
            <p className="eyebrow">Planification financière</p>
            <h2>Un programme unique pour simuler tous les scénarios de vie</h2>
            <p>{about.tool}</p>
            <ul className="checks">
              <li><Icon name="check" /> Projection détaillée de l’intégralité du patrimoine</li>
              <li><Icon name="check" /> Optimisation fiscale dans le respect du cadre légal</li>
              <li><Icon name="check" /> Prévoyance, retraite et succession intégrées</li>
            </ul>
            <Link to="/a-propos/" className="text-link">En savoir plus sur le cabinet <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow">Nos valeurs</p>
            <h2>La confiance comme fondement</h2>
          </header>
          <Values />
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function About() {
  return (
    <>
      <PageHero title="À propos" eyebrow="Le cabinet" photo={1} />
      <section className="section">
        <div className="container prose-grid">
          <div className="prose">
            <p className="lead">{about.intro[0]}</p>
            <p>{about.intro[1]}</p>
            <p>{about.tool}</p>
          </div>
          <aside className="timeline" aria-label="Notre histoire">
            <h2>Notre histoire</h2>
            <ol>
              <li><strong>2003</strong><span>Création de Finaversum par M. Luigi Galante et deux associés.</span></li>
              <li><strong>2018</strong><span>M. Luigi Galante, cofondateur, dirige et administre le cabinet.</span></li>
              <li><strong>Aujourd’hui</strong><span>Une équipe de taille humaine et un réseau de partenaires spécialisés.</span></li>
            </ol>
          </aside>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="prose prose-center">
            {about.history.map((p) => <p key={p}>{p}</p>)}
            <p><strong>Indépendance, transparence et confidentialité</strong> sont les valeurs avec lesquelles nous abordons chaque dossier.</p>
          </div>
          <Values />
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHero title="Nos prestations" eyebrow="Conseil personnalisé" photo={3} />
      <section className="section">
        <div className="container">
          <p className="lead section-intro">Particuliers, entrepreneurs ou dirigeants : nous vous aidons à anticiper et optimiser les répercussions financières, fiscales et successorales de vos projets.</p>
          <ServiceCards />
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function Service({ slug }) {
  const s = getService(slug)
  return (
    <>
      <PageHero title={s.title} eyebrow="Nos prestations" photo={s.photo} />
      <section className="section">
        <div className="container service-grid">
          <div>
            <p className="lead">{s.lead}</p>
            <p>{s.common}</p>
            <h2 className="h3">Prestations</h2>
            <ul className="service-list">
              {s.items.map((it) => <li key={it}><Icon name="check" /> {it}</li>)}
            </ul>
          </div>
          <aside className="aside">
            <div className="aside-card">
              <h2 className="h4">Un premier entretien ?</h2>
              <p>{contact.name}, {contact.role}</p>
              <p><a href={`tel:${contact.mobileIntl}`}><Icon name="phone" size={16} /> {contact.mobile}</a></p>
              <p><a href={`mailto:${contact.email}`}><Icon name="mail" size={16} /> {contact.email}</a></p>
              <Link to="/contact/" className="button button-block">Nous contacter</Link>
            </div>
            <nav className="aside-card" aria-label="Autres prestations">
              <h2 className="h4">Autres prestations</h2>
              <ul>
                {services.filter((o) => o.slug !== slug).map((o) => (
                  <li key={o.slug}><Link to={`/${o.slug}/`}>{o.title} <Icon name="arrow" size={16} /></Link></li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </>
  )
}

function Contact() {
  return (
    <>
      <PageHero title="Contact" eyebrow="Rendez-vous" photo={2} />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-cards">
            <article className="aside-card">
              <h2 className="h4">{contact.name}</h2>
              <p className="muted">{contact.role}</p>
              <p><a href={`tel:${contact.mobileIntl}`}><Icon name="phone" size={16} /> M {contact.mobile}</a></p>
              <p><a href={`tel:${company.phoneIntl}`}><Icon name="phone" size={16} /> T {contact.phone}</a></p>
              <p><a href={`mailto:${contact.email}`}><Icon name="mail" size={16} /> {contact.email}</a></p>
              <p><a href={contact.linkedin} target="_blank" rel="noopener"><Icon name="linkedin" size={16} /> LinkedIn</a></p>
            </article>
            <article className="aside-card">
              <h2 className="h4">{company.name}</h2>
              <p><Icon name="pin" size={16} /> {company.street}, {company.city}</p>
              <p><a href={`tel:${company.phoneIntl}`}><Icon name="phone" size={16} /> {company.phone}</a></p>
              <p><a href={`mailto:${company.email}`}><Icon name="mail" size={16} /> {company.email}</a></p>
            </article>
          </div>
          <div className="form-card">
            <h2>Formulaire de contact</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="map-section" aria-label="Notre emplacement">
        <MapEmbed className="map" />
        <a className="map-link" href={mapsLink} target="_blank" rel="noopener"><Icon name="pin" size={16} /> Itinéraire</a>
      </section>
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
  id: 'classique',
  name: 'Classique',
  summary: 'Institutionnel et lumineux : grande photo, cartes de prestations, valeurs. La continuité modernisée du site actuel.',
  themeColor: '#355675',
  Page,
}
