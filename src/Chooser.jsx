// Page d'accueil de la maquette : présente les propositions avec un aperçu
// desktop + mobile de chacune. `previews` est le dossier des vignettes
// (docs/apercus/vignettes/, servi tel quel en dev et copié au build).
import { routes } from './content.js'

const counts = ['Une', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six']

const palette = [
  { name: 'Bleu logo', value: '#355675' },
  { name: 'Bleu accent', value: '#004D71' },
  { name: 'Gris logo', value: '#9D9CA0' },
]

const pages = routes.map((r) => (r.path === '/' ? 'Accueil' : r.title.split(' – ')[0]))

export function Chooser({ variants, previews }) {
  return (
    <div className="chooser">
      <header className="chooser-head">
        <img className="chooser-logo" src="img/logo.png" width="1200" height="131" alt="Finaversum" />
        <p className="chooser-eyebrow">Refonte du site · maquettes</p>
        <h1>
          {counts[variants.length - 1] || variants.length} directions
          <br />
          <span>pour finaversum.ch</span>
        </h1>
        <p className="chooser-lead">
          Même contenu, même charte. Chaque proposition explore une façon différente de présenter le cabinet ; toutes sont
          navigables et fonctionnent sur mobile.
        </p>
        <dl className="chooser-facts">
          <div>
            <dt>Charte</dt>
            <dd className="chooser-swatches">
              {palette.map((c) => (
                <span key={c.value} title={`${c.name} ${c.value}`} style={{ background: c.value }} />
              ))}
              <span className="chooser-font">Karla</span>
            </dd>
          </div>
          <div>
            <dt>Pages</dt>
            <dd>{pages.length} par proposition</dd>
          </div>
        </dl>
      </header>

      <ol className="chooser-list">
        {variants.map((v, i) => (
          <li key={v.id}>
            <a className="chooser-card" href={v.href}>
              <figure className="chooser-preview" aria-hidden="true">
                <div className="chooser-browser">
                  <i />
                  <img src={`${previews}${v.id}-desktop.webp`} width="960" height="600" alt="" loading={i > 1 ? 'lazy' : undefined} />
                </div>
                <div className="chooser-phone">
                  <img src={`${previews}${v.id}-mobile.webp`} width="234" height="480" alt="" loading={i > 1 ? 'lazy' : undefined} />
                </div>
              </figure>
              <div className="chooser-body">
                <span className="chooser-num">{String(i + 1).padStart(2, '0')}</span>
                <h2>{v.name}</h2>
                <p>{v.summary}</p>
                <span className="chooser-cta">
                  Voir la proposition <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ol>

      <footer className="chooser-foot">
        <p>Pages incluses : {pages.join(' · ')}.</p>
        <p>Textes repris du site actuel. Maquettes de travail, non indexées.</p>
      </footer>
    </div>
  )
}
