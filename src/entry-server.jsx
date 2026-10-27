import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import variant from '@variant'
import { App } from './app.jsx'
import { Chooser } from './Chooser.jsx'

export { routes, company } from './content.js'
export const meta = { id: variant.id, name: variant.name, summary: variant.summary, themeColor: variant.themeColor }

export const render = (path, base) => renderToString(<App variant={variant} path={path} base={base} />)
export const renderChooser = (variants, previews) => renderToStaticMarkup(<Chooser variants={variants} previews={previews} />)
