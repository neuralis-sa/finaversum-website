// Contenu repris du site actuel finaversum.ch, partagé par les trois propositions.

export const company = {
  name: 'Finaversum SA',
  tagline: ['Avoir des désirs,', 'des objectifs', 'et les réaliser'],
  founded: 2003,
  street: 'Av. de la Gare 66',
  city: '1920 Martigny',
  phone: '027 721 61 41',
  phoneIntl: '+41277216141',
  email: 'info@finaversum.ch',
  geo: { lat: 46.10557, lng: 7.07609 },
  values: [
    { title: 'Indépendance', text: 'Nous ne vendons aucun produit bancaire ou d’assurance. Notre approche est exclusivement celle du conseil personnalisé.' },
    { title: 'Transparence', text: 'Des recommandations claires, argumentées et adaptées à vos véritables besoins, sans conflit d’intérêts.' },
    { title: 'Confidentialité', text: 'Chaque dossier est traité avec la plus grande discrétion, de la première rencontre au suivi à long terme.' },
  ],
}

export const contact = {
  name: 'Luigi Galante',
  role: 'Administrateur-délégué',
  email: 'luigi.galante@finaversum.ch',
  mobile: '079 170 62 62',
  mobileIntl: '+41791706262',
  phone: '027 721 61 41',
  linkedin: 'https://www.linkedin.com/in/luigi-galante-a1b91965/',
}

export const about = {
  intro: [
    'Finaversum est un cabinet de conseils financiers, fiscaux et successoraux indépendant à la pointe de l’innovation. Cabinet de taille humaine, nous proposons des conseils pointus dans l’ensemble du pays.',
    'Soucieux d’offrir à nos clients privés et commerciaux un accompagnement personnalisé, nous leur prodiguons un conseil exclusif, pluridisciplinaire et adapté à leurs véritables besoins, et ce grâce à notre réseau de partenaires spécialisés.',
  ],
  tool: 'Nous avons développé un programme de planification financière unique capable de simuler tous les scénarios de vie rencontrés par les particuliers et les entreprises. Outil de décisions par excellence, il permet d’anticiper toutes les problématiques liées aux aspects financiers, fiscaux et successoraux.',
  history: [
    'Créé en 2003 par M. Luigi Galante et deux associés, Finaversum est dirigé et administré depuis 2018 par M. Luigi Galante, cofondateur. Il est soutenu dans ses activités par des collaborateurs administratifs qui partagent les valeurs du cabinet.',
    'Depuis sa création, notre société a fait de son expertise en conseils financiers, fiscaux et successoraux la pierre angulaire de son activité.',
  ],
}

const common = 'Notre cabinet permet à ses clients de se concentrer sur l’essentiel en leur prodiguant un accompagnement de qualité, sur le long terme, notamment grâce à son programme unique de planification financière.'

export const services = [
  {
    slug: 'particuliers',
    title: 'Particuliers',
    short: 'Anticiper chaque étape de vie : fiscalité, prévoyance, retraite, immobilier et succession.',
    lead: 'La complexité juridique et légale liée aux questions financières et fiscales peut parfois poser problème aux particuliers. Chaque étape de vie et chaque projet ont des répercussions financières qui méritent d’être anticipées et optimisées.',
    common,
    photo: 1,
    items: [
      'Conseils juridiques spécifiques (domiciliation, fiscalité en Suisse ou à l’étranger, …)',
      'Projection dynamique et détaillée dans le temps de l’intégralité du patrimoine',
      'Utilisation optimale des différents instruments de placement (banque et assurance)',
      'Utilisation pointue des aspects légaux afin de réduire la charge fiscale',
      'Intégration des questions d’ordre successoral',
      'Analyse et conseils sur mesure en matière de prévoyance professionnelle',
      'Analyse de la faisabilité d’une retraite anticipée',
      'Analyse de la faisabilité de financements immobiliers et prêts hypothécaires (gestion de la dette)',
    ],
  },
  {
    slug: 'societes-de-personnes',
    title: 'Sociétés de personnes',
    short: 'Maîtriser le risque entrepreneurial et préparer la transmission de votre entreprise.',
    lead: 'La maîtrise du risque et la planification sont des parts importantes de la vie d’entrepreneur. Nous nous engageons auprès de nos clients commerciaux et les aiguillons en matière de questions financières, fiscales et de transmission d’entreprises.',
    common,
    photo: 2,
    items: [
      'Transmission d’entreprises',
      'Analyse de la valeur de l’entreprise en cas de vente ou d’acquisition',
      'Conseils juridiques spécifiques (contrats de vente, transformations, fusions, …)',
      'Projection dynamique et détaillée dans le temps de l’intégralité du patrimoine',
      'Utilisation optimale des différents instruments de placement (banque et assurance)',
      'Utilisation pointue des aspects légaux afin de réduire la charge fiscale',
      'Analyse et conseils sur mesure en matière de prévoyance professionnelle',
      'Analyse de la faisabilité de financements immobiliers et prêts hypothécaires (gestion de la dette)',
    ],
  },
  {
    slug: 'societes-morales',
    title: 'Sociétés morales',
    short: 'Accompagner les dirigeants : valorisation, transmission, salaire ou dividendes.',
    lead: 'La maîtrise du risque et la planification sont des parts importantes de la vie des dirigeants. Nous nous engageons auprès de nos clients commerciaux et les aiguillons en matière de questions financières, fiscales et de transmission d’entreprises.',
    common,
    photo: 3,
    items: [
      'Transmission d’entreprise',
      'Analyse de la valeur de l’entreprise en cas de vente ou d’acquisition',
      'Conseils juridiques spécifiques (contrats de vente, transformations, fusions)',
      'Utilisation optimale des différents instruments de placement (banque et assurance)',
      'Utilisation pointue des aspects légaux afin de réduire la charge fiscale',
      'Analyse et conseils sur mesure en matière de prévoyance professionnelle',
      'Analyse de la faisabilité de financements immobiliers et prêts hypothécaires (gestion de la dette)',
      'Étude de la question salaires versus dividendes',
    ],
  },
]

export const nav = [
  { path: '/a-propos/', label: 'À propos' },
  { path: '/prestations/', label: 'Prestations', children: services.map((s) => ({ path: `/${s.slug}/`, label: s.title })) },
  { path: '/contact/', label: 'Contact' },
]

// Une entrée par page générée. `page` est la clé du composant dans chaque variante.
export const routes = [
  { path: '/', page: 'home', title: 'Finaversum – Conseils financiers, fiscaux et successoraux indépendants', description: 'Cabinet indépendant de conseils financiers, fiscaux et successoraux à Martigny. Planification financière pour particuliers et entreprises depuis 2003.' },
  { path: '/a-propos/', page: 'about', title: 'À propos – Finaversum', description: 'Cabinet de taille humaine fondé en 2003 à Martigny. Indépendance, transparence et confidentialité.' },
  { path: '/prestations/', page: 'services', title: 'Prestations – Finaversum', description: 'Conseils pour particuliers, sociétés de personnes et sociétés morales.' },
  ...services.map((s) => ({ path: `/${s.slug}/`, page: 'service', service: s.slug, title: `${s.title} – Finaversum`, description: s.short })),
  { path: '/contact/', page: 'contact', title: 'Contact – Finaversum', description: `Finaversum SA, ${company.street}, ${company.city}. Tél. ${company.phone}.` },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
