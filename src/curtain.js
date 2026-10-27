// Rideau de chargement, sur le modèle de celui de Neuralis Desk : le « ΛV » du
// logo apparaît, « FIN » et « ERSUM » se dévoilent de part et d'autre, la
// marque bat tant que la page charge, puis on plonge à travers elle pendant
// que le voile s'ouvre.
//
// Du HTML/CSS inline, injecté par scripts/build.mjs (et vite.config.js en dev),
// hors de #root pour ne pas gêner l'hydratation. Une fois par session d'onglet ;
// sans JavaScript ou avec le mouvement réduit, il ne s'affiche jamais.

// Découpe du logo (1200 × 131) : FIN | ΛV | ERSUM, en % de la largeur.
const parts = [
  ['fin', 0, 26.5],
  ['mark', 26.5, 20.25],
  ['ersum', 46.75, 53.25],
]

const css = `
.fv-curtain{display:none}
html.fv-loading .fv-curtain{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;overflow:hidden}
.fv-veil{position:absolute;inset:0;background-color:#f6f7f9;background-image:radial-gradient(60% 55% at 50% 50%,rgba(53,86,117,.14) 0%,transparent 70%),radial-gradient(rgba(53,86,117,.14) 1.2px,transparent 1.6px);background-size:100% 100%,22px 22px;background-position:center}
.fv-logo{position:relative;width:clamp(260px,56vw,720px);aspect-ratio:1200/131;transform-origin:36.5% 50%;will-change:transform}
.fv-part{position:absolute;top:0;bottom:0;overflow:hidden}
.fv-part img{position:absolute;top:0;height:100%;max-width:none}
${parts
  .map(([id, left, width]) => `.fv-${id}{left:${left}%;width:${width}%}.fv-${id} img{left:${(-left / width) * 100}%;width:${(100 / width) * 100}%}`)
  .join('')}
.fv-mark{animation:fv-mark-in .52s cubic-bezier(.2,.8,.3,1) backwards,fv-beat 1.4s ease-in-out .9s infinite}
.fv-fin{animation:fv-from-right .38s cubic-bezier(.2,.8,.3,1) .38s backwards}
.fv-ersum{animation:fv-from-left .38s cubic-bezier(.2,.8,.3,1) .38s backwards}
@keyframes fv-mark-in{from{opacity:0;transform:translateY(18%) scale(.6)}}
@keyframes fv-beat{50%{opacity:.55;transform:scale(.96)}}
@keyframes fv-from-right{from{opacity:0;clip-path:inset(0 0 0 100%);transform:translateX(14px)}to{clip-path:inset(0)}}
@keyframes fv-from-left{from{opacity:0;clip-path:inset(0 100% 0 0);transform:translateX(-14px)}to{clip-path:inset(0)}}
html.fv-curtain-out .fv-curtain{pointer-events:none}
html.fv-curtain-out .fv-mark{animation:none}
html.fv-curtain-out .fv-fin{animation:fv-fin-out .2s ease-in forwards}
html.fv-curtain-out .fv-ersum{animation:fv-ersum-out .2s ease-in forwards}
html.fv-curtain-out .fv-logo{animation:fv-plunge .62s forwards}
html.fv-curtain-out .fv-veil{animation:fv-open .42s cubic-bezier(.45,0,.25,1) .2s forwards}
@keyframes fv-fin-out{to{opacity:0;transform:translateX(10px)}}
@keyframes fv-ersum-out{to{opacity:0;transform:translateX(-10px)}}
@keyframes fv-plunge{0%{transform:scale(1);animation-timing-function:ease-out}22%{transform:scale(.94);animation-timing-function:cubic-bezier(.6,0,.9,.4)}70%{opacity:1}100%{transform:scale(9);opacity:0}}
@keyframes fv-open{to{opacity:0}}
`

// Dans <head> : décide avant le premier rendu, sans flash.
const decide = `try{if(!sessionStorage.getItem('fv-curtain')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('fv-curtain','1');document.documentElement.classList.add('fv-loading')}}catch(e){}`

// Fin de <body> : sort après le chargement complet, l'entrée jouée au moins
// (1,2 s), au plus tard à 4 s.
const release = `(function(){var h=document.documentElement;if(!h.classList.contains('fv-loading'))return;var t0=Date.now(),done=0;function out(){if(done++)return;setTimeout(function(){h.classList.add('fv-curtain-out');setTimeout(function(){h.classList.remove('fv-loading','fv-curtain-out')},700)},Math.max(0,1200-(Date.now()-t0)))}if(document.readyState==='complete')out();else addEventListener('load',out);setTimeout(out,4000)})()`

export const curtainHead = () => `<style>${css.trim()}</style>\n<script>${decide}</script>`

export const curtainBody = (base) => {
  const logo = `${base}img/logo.png`
  return `<div class="fv-curtain" aria-hidden="true"><div class="fv-veil"></div><div class="fv-logo">${parts
    .map(([id]) => `<span class="fv-part fv-${id}"><img src="${logo}" alt=""></span>`)
    .join('')}</div></div>\n<script>${release}</script>`
}
