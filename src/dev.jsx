// Serveur de dev : /<variante>/<route>/ rendu côté client, / affiche le sélecteur.
import { createRoot } from 'react-dom/client'
import { App } from './app.jsx'
import { Chooser } from './Chooser.jsx'
import { variantIds } from './variants/index.js'

const loaders = import.meta.glob('./variants/*/index.jsx')
const [, id, ...rest] = location.pathname.split('/')
const root = createRoot(document.getElementById('root'))

if (variantIds.includes(id)) {
  loaders[`./variants/${id}/index.jsx`]().then(({ default: variant }) => {
    root.render(<App variant={variant} path={'/' + rest.filter(Boolean).map((s) => s + '/').join('')} base={`/${id}/`} />)
  })
} else {
  import('./chooser.css')
  Promise.all(variantIds.map((v) => loaders[`./variants/${v}/index.jsx`]())).then((mods) => {
    root.render(<Chooser variants={mods.map(({ default: v }) => ({ id: v.id, name: v.name, summary: v.summary, href: `/${v.id}/` }))} previews="/docs/apercus/vignettes/" />)
  })
}
