# Finaversum – refonte du site (sans WordPress)

Site statique généré avec **React + Vite** (pré-rendu SSR → HTML pur, hydraté pour les quelques interactions).
Quatre propositions partagent le même contenu (`src/content.js`, repris de finaversum.ch) et la charte :

| Élément | Valeur |
|---|---|
| Logo | `public/img/logo.png` (+ `logo-white.png` pour fonds sombres) |
| Bleu logo | `#355675` |
| Bleu accent (site actuel) | `#004D71` |
| Gris logo | `#9D9CA0` |
| Police | Karla (police du thème actuel, via Google Fonts) |

| # | Proposition | Direction | Aperçu |
|---|---|---|---|
| 1 | **Classique** | Lumineux, institutionnel : grande photo, cartes de prestations, valeurs. Continuité modernisée du site actuel. | [desktop](docs/apercus/1-classique-desktop.jpg) · [mobile](docs/apercus/1-classique-mobile.jpg) |
| 2 | **Éditorial** | Minimal, typographique : capitales fines espacées inspirées du logo, sections numérotées, menu plein écran. | [desktop](docs/apercus/2-editorial-desktop.jpg) · [mobile](docs/apercus/2-editorial-mobile.jpg) |
| 3 | **Prestige** | Sombre, premium : bleu nuit, motif « ΛV » du logo, photos duotone, onglets par type de client. | [desktop](docs/apercus/3-prestige-desktop.jpg) · [mobile](docs/apercus/3-prestige-mobile.jpg) |
| 4 | **Parcours** | Récit par étapes de vie (construire, entreprendre, diriger, transmettre), grille suisse 12 colonnes, index de chapitres sticky, barre de progression, apparitions au défilement. **Nouvelles images générées par IA** (Valais, vignes, clients). | [desktop](docs/apercus/4-parcours-desktop.jpg) · [mobile](docs/apercus/4-parcours-mobile.jpg) |

Pages générées pour chaque proposition : accueil, à propos, prestations, particuliers, sociétés de personnes, sociétés morales, contact (+ 404, `sitemap.xml`, `robots.txt`, balises SEO/Open Graph, JSON-LD).

## Commandes

```bash
pnpm install
pnpm dev            # http://localhost:5173/ → sélecteur, puis /classique/, /editorial/, /prestige/, /parcours/
pnpm build          # dist/ : les 4 propositions + page de sélection
pnpm preview        # sert dist/ sur http://localhost:4173/
```

Mise en ligne d'une seule proposition à la racine du domaine :

```bash
VARIANT=classique BASE=/ SITE_URL=https://finaversum.ch pnpm build
# puis déposer le contenu de dist/ chez l'hébergeur (Infomaniak, Netlify, Cloudflare Pages…)
```

## Proposition 4 – démarche

Design system issu du skill `ui-ux-pro-max` (`.claude/skills/ui-ux-pro-max`) :
pattern *Trust & Authority* + *Scroll-triggered storytelling* (chapitres avec mini-CTA, CTA final),
style *Swiss Modernism 2.0* (grille 12 colonnes, un seul accent `#004D71`), règles d'accessibilité
(contraste ≥ 4.5:1, focus visible, cibles ≥ 44 px, `prefers-reduced-motion` respecté, contenu lisible sans JS).
Palette et typographie proposées par l'outil écartées au profit de la charte Finaversum.

Images : `public/img/gen/` (générées via Gamma, mention « Images d'illustration générées par IA » en pied de page).
À remplacer par de vraies photos du cabinet si souhaité.

## Formulaire de contact

Le site étant statique, le formulaire poste vers un service externe défini par `VITE_FORM_ENDPOINT`
(ex. Formspree, Basin, ou un script PHP chez Infomaniak). Sans cette variable, il ouvre le client e-mail
avec le message pré-rempli vers info@finaversum.ch.

## Structure

```
src/content.js            contenu (textes, coordonnées, routes)
src/shared.jsx            composants communs (photo, logo, icônes, formulaire, carte)
src/variants/<id>/        une proposition = index.jsx (pages) + styles.css
scripts/build.mjs         build client + SSR et pré-rendu HTML de chaque route
```

Non repris : la version allemande (`/de/`, désactivée sur le site actuel) – la structure permet de l'ajouter.
