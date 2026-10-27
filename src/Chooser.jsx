// Page d'accueil de la maquette : présente les trois propositions.
export function Chooser({ variants }) {
  return (
    <main className="chooser">
      <img className="chooser-logo" src="img/logo.png" width="1200" height="131" alt="Finaversum" />
      <h1>Refonte du site – trois propositions</h1>
      <p className="chooser-lead">Même contenu, même charte (logo, bleu Finaversum, gris, police Karla), trois directions visuelles.</p>
      <ol className="chooser-list">
        {variants.map((v, i) => (
          <li key={v.id}>
            <a href={v.href}>
              <span className="chooser-num">0{i + 1}</span>
              <strong>{v.name}</strong>
              <span>{v.summary}</span>
            </a>
          </li>
        ))}
      </ol>
    </main>
  )
}
