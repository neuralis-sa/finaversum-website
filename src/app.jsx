import { SiteContext } from './shared.jsx'
import { routes } from './content.js'

export function App({ variant, path, base }) {
  const route = routes.find((r) => r.path === path) || routes[0]
  const { Page } = variant
  return (
    <SiteContext.Provider value={{ base, path: route.path }}>
      <Page route={route} />
    </SiteContext.Provider>
  )
}
