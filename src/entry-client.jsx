import { hydrateRoot } from 'react-dom/client'
import variant from '@variant'
import { App } from './app.jsx'

const { path, base } = JSON.parse(document.getElementById('__page').textContent)
hydrateRoot(document.getElementById('root'), <App variant={variant} path={path} base={base} />)
