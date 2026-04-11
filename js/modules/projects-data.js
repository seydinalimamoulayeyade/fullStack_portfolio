export const PROJECTS = [
  {
    id: 1,
    title: "Application E-commerce",
    slug: "ecommerce",
    category: "web",
    categoryLabel: "Application Web",
    date: "Janvier 2025",
    duration: "3 mois",
    status: "Terminé",
    role: "Développeur Full Stack",
    image: "images/projet1.jpg",
    demoUrl: null,
    githubUrl: "https://github.com/seydinalimamoulayeyade",
    ogImage: "images/projet1.jpg",
    shortDesc:
      "Plateforme complète avec catalogue produits, panier, authentification et tableau de bord administrateur.",
    description: [
      "Ce projet a été développé dans le cadre de ma formation Full Stack. L'objectif était de créer une application e-commerce de bout en bout, couvrant aussi bien l'expérience utilisateur que la gestion back-end des commandes et produits.",
      "L'application repose sur une architecture Node.js / Express côté serveur et une base de données MongoDB pour la persistance des données. L'interface utilisateur est construite en HTML5/CSS3 avec une approche mobile-first.",
      "Une attention particulière a été portée à la sécurité : hachage des mots de passe avec bcrypt, gestion des sessions, et validation des données côté serveur.",
    ],
    features: [
      "Catalogue de produits avec filtres",
      "Panier d'achat dynamique",
      "Authentification utilisateur (JWT)",
      "Tableau de bord administrateur",
      "Gestion des commandes",
      "Interface responsive mobile-first",
      "Système de recherche produits",
      "API RESTful documentée",
    ],
    learned: [
      "Conception d'une architecture REST évolutive avec Express",
      "Gestion des sessions et sécurité des routes avec middleware JWT",
      "Modélisation de données avec Mongoose et gestion des relations",
      "Déploiement et gestion de versions avec Git / GitHub",
    ],
    stack: {
      frontend: ["HTML5", "CSS3 / Flexbox / Grid", "JavaScript ES6+"],
      backend: ["Node.js", "Express.js", "JWT", "bcrypt"],
      tools: ["MongoDB", "Mongoose", "Git", "Postman"],
    },
    tags: ["Node.js", "MongoDB", "JavaScript"],
  },
  {
    id: 2,
    title: "Gestionnaire de Tâches",
    slug: "task-manager",
    category: "web",
    categoryLabel: "Application Web",
    date: "Février 2025",
    duration: "2 mois",
    status: "Terminé",
    role: "Développeur Full Stack",
    image: "images/projet2.jpg",
    demoUrl: null,
    githubUrl: "https://github.com/seydinalimamoulayeyade",
    ogImage: "images/projet2.jpg",
    shortDesc:
      "Application web de gestion de tâches quotidiennes avec synchronisation en temps réel.",
    description: [
      "TaskFlow est une application de gestion de tâches au format Kanban, pensée pour les équipes de développement. Chaque tâche peut être déplacée entre les colonnes À faire, En cours et Terminé.",
      "L'application utilise React côté client pour une interface réactive et Node.js/Express pour l'API. Les mises à jour en temps réel sont gérées via des requêtes périodiques vers le serveur.",
      "Un système de priorités (Haute/Moyenne/Faible) et d'assignation de membres permet de coordonner le travail en équipe efficacement.",
    ],
    features: [
      "Board Kanban 3 colonnes",
      "Création et édition de tâches",
      "Priorités et assignation de membres",
      "Barres de progression par tâche",
      "Filtrage par projet",
      "Interface responsive",
    ],
    learned: [
      "Architecture composants React avec état local et props",
      "Synchronisation état client / serveur",
      "Gestion des formulaires contrôlés en React",
      "Design patterns de dashboard (sidebar + main)",
    ],
    stack: {
      frontend: ["React", "CSS3", "JavaScript ES6+"],
      backend: ["Node.js", "Express.js", "REST API"],
      tools: ["MongoDB", "Git", "VS Code"],
    },
    tags: ["React", "Node.js", "Express"],
  },
  {
    id: 3,
    title: "Blog Personnel",
    slug: "blog",
    category: "web",
    categoryLabel: "Application Web",
    date: "Mars 2025",
    duration: "6 semaines",
    status: "Terminé",
    role: "Développeur Full Stack",
    image: "images/projet3.jpg",
    demoUrl: null,
    githubUrl: "https://github.com/seydinalimamoulayeyade",
    ogImage: "images/projet3.jpg",
    shortDesc:
      "Blog moderne avec système de commentaires et partage sur les réseaux sociaux.",
    description: [
      "DevNotes est un blog de développement web personnel. Il propose une interface claire pour la lecture d'articles techniques avec système de catégories, sidebar auteur et newsletter.",
      "La partie back-end est développée en PHP avec une base de données MySQL. Les articles sont rédigés en Markdown et convertis en HTML à l'affichage.",
      "Le blog intègre des fonctionnalités de partage sur les réseaux sociaux et un système de commentaires modéré par l'administrateur.",
    ],
    features: [
      "Liste d'articles avec thumbnail et catégorie",
      "Système de commentaires",
      "Sidebar auteur avec bio",
      "Catégories et tags",
      "Newsletter intégrée",
      "Partage sur les réseaux sociaux",
      "Espace d'administration",
    ],
    learned: [
      "Architecture MVC en PHP natif",
      "Optimisation des requêtes MySQL",
      "Sécurisation contre les injections SQL et XSS",
      "Pagination et tri des données côté serveur",
    ],
    stack: {
      frontend: ["HTML5", "CSS3", "JavaScript"],
      backend: ["PHP", "MySQL"],
      tools: ["Apache", "Git", "phpMyAdmin"],
    },
    tags: ["PHP", "MySQL", "HTML5"],
  },
  {
    id: 4,
    title: "Application Météo",
    slug: "meteo",
    category: "mobile",
    categoryLabel: "Application Mobile",
    date: "Avril 2025",
    duration: "3 semaines",
    status: "Terminé",
    role: "Développeur Mobile",
    image: "images/projet4.jpg",
    demoUrl: null,
    githubUrl: "https://github.com/seydinalimamoulayeyade",
    ogImage: "images/projet4.jpg",
    shortDesc:
      "Application mobile de consultation météo avec géolocalisation et prévisions sur 7 jours.",
    description: [
      "WeatherSN est une application météo centrée sur les villes du Sénégal. Elle récupère les données en temps réel via une API météorologique externe et les présente dans une interface claire.",
      "L'application est développée en React Native pour un déploiement cross-platform (iOS/Android). La géolocalisation native permet d'afficher automatiquement la météo de l'utilisateur.",
      "Les prévisions sur 7 jours, l'index de qualité de l'air et les horaires de lever/coucher du soleil sont calculés et affichés en temps réel.",
    ],
    features: [
      "Météo en temps réel",
      "Géolocalisation automatique",
      "Prévisions sur 7 jours",
      "Index de qualité de l'air",
      "Lever et coucher du soleil",
      "Recherche par ville",
    ],
    learned: [
      "Développement cross-platform avec React Native",
      "Consommation d'API REST externe (OpenWeather)",
      "Permissions système (géolocalisation)",
      "Gestion du cache pour réduire les appels API",
    ],
    stack: {
      frontend: ["React Native", "JavaScript ES6+"],
      backend: ["API REST", "OpenWeather API"],
      tools: ["Expo", "Git", "Postman"],
    },
    tags: ["React Native", "API REST", "JavaScript"],
  },
  {
    id: 5,
    title: "API de Gestion des Utilisateurs",
    slug: "api-users",
    category: "api",
    categoryLabel: "API / Back-End",
    date: "Mai 2025",
    duration: "4 semaines",
    status: "Terminé",
    role: "Développeur Back-End",
    image: "images/projet5.jpg",
    demoUrl: null,
    githubUrl: "https://github.com/seydinalimamoulayeyade",
    ogImage: "images/projet5.jpg",
    shortDesc:
      "API RESTful sécurisée avec authentification JWT, rôles et permissions.",
    description: [
      "UserAPI est une API RESTful complète de gestion des utilisateurs, conçue pour servir de base à n'importe quelle application nécessitant un système d'authentification robuste.",
      "Elle implémente un système de rôles (admin/user) avec des permissions granulaires, un token d'accès JWT à courte durée de vie et un refresh token sécurisé en cookie HttpOnly.",
      "L'API est entièrement documentée avec des exemples de requêtes et réponses pour chaque endpoint.",
    ],
    features: [
      "Authentification JWT + Refresh Token",
      "Système de rôles et permissions",
      "CRUD complet sur les utilisateurs",
      "Rate limiting et protection contre les abus",
      "Validation des données (express-validator)",
      "Documentation interactive des endpoints",
    ],
    learned: [
      "Architecture REST avec séparation routes / controllers / services",
      "Sécurité avancée : CORS, helmet, rate-limit",
      "Stratégie Access Token + Refresh Token",
      "Tests d'API avec Postman et Jest",
    ],
    stack: {
      frontend: [],
      backend: ["Node.js", "Express.js", "JWT", "bcrypt", "express-validator"],
      tools: ["MongoDB", "Mongoose", "Postman", "Jest", "Git"],
    },
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    id: 6,
    title: "Dashboard Analytics",
    slug: "dashboard",
    category: "web",
    categoryLabel: "Application Web",
    date: "Juin 2025",
    duration: "2 mois",
    status: "Terminé",
    role: "Développeur Full Stack",
    image: "images/projet6.jpg",
    demoUrl: null,
    githubUrl: "https://github.com/seydinalimamoulayeyade",
    ogImage: "images/projet6.jpg",
    shortDesc:
      "Tableau de bord de visualisation de données avec graphiques interactifs et exports.",
    description: [
      "DataView est un tableau de bord analytique complet destiné aux gestionnaires d'une boutique en ligne. Il centralise les KPIs clés, les graphiques de ventes et les dernières commandes.",
      "Les graphiques (barres et donut) sont construits en SVG natif pour des performances optimales sans dépendance externe. Les données sont chargées via des appels API asynchrones.",
      "Un système d'export CSV et de filtrage par période permet aux utilisateurs d'analyser leurs performances sur des intervalles personnalisés.",
    ],
    features: [
      "KPI cards avec évolution vs période précédente",
      "Graphique de revenus mensuels (SVG)",
      "Répartition par catégorie (donut SVG)",
      "Tableau des dernières commandes",
      "Filtrage par période",
      "Export CSV",
      "Sidebar de navigation",
    ],
    learned: [
      "Construction de graphiques SVG natifs sans librairie",
      "Optimisation des rendus avec requestAnimationFrame",
      "Architecture dashboard (sidebar + main + cards)",
      "Design system cohérent avec CSS variables",
    ],
    stack: {
      frontend: ["React", "Chart.js", "SVG natif", "CSS3"],
      backend: ["Node.js", "Express.js", "MySQL"],
      tools: ["Git", "Postman", "VS Code"],
    },
    tags: ["React", "Chart.js", "Node.js", "MySQL"],
  },
];

/**
 * Récupère un projet par son id.
 * @param {number} id
 * @returns {object|null}
 */
export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id) ?? null;
}

/**
 * Lit le paramètre ?id= dans l'URL courante.
 * @returns {number} l'id (1 par défaut si absent ou invalide)
 */
export function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  return Number.isFinite(id) && id >= 1 ? id : 1;
}
