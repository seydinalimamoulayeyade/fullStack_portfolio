# 🚀 Portfolio — Seydina Limamou Laye Yade

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production-brightgreen?style=flat-square)]()

> Portfolio personnel de **Seydina Limamou Laye Yade**, Développeur Full Stack basé à Dakar, Sénégal.  
> Construit avec **HTML5 pur + TailwindCSS** — sans framework JS, sans build system.  
> Déployé sur **GitHub Pages**.

<!-- **🔗 [Voir le portfolio en ligne →](https://seydinalimamoulayeyade.github.io/fullStack_portfolio/)**

---

## 📸 Aperçu

| Page              | Description                                           |
| ----------------- | ----------------------------------------------------- |
| **Accueil**       | Hero section, projets vedette, compétences, contact   |
| **Projets**       | Grille responsive de 6 projets avec filtres visuels   |
| **Détail projet** | Layout 2 colonnes, stack technique, fonctionnalités   |
| **Admin**         | Formulaire d'ajout de projet (accès discret, noindex) |

---

## ✨ Fonctionnalités

- **Design dark** moderne avec palette personnalisée (navy + accent rouge)
- **100% responsive** — mobile (320px), tablette, desktop (1280px+)
- **Navigation cohérente** avec menu mobile CSS-only (zéro JavaScript)
- **Fil d'ariane** sur toutes les pages pour la navigation et le SEO
- **SEO complet** : meta description, Open Graph, Twitter Card, canonical
- **Page admin protégée** : `noindex/nofollow`, barre de statut distincte
- **Bouton Supprimer supprimé** du portfolio public
- **Accessibilité** : `aria-label` sur tous les liens icônes, `alt` sur toutes les images

---

## 🛠️ Stack technique

| Technologie    | Usage                            | Version  |
| -------------- | -------------------------------- | -------- |
| HTML5          | Structure sémantique             | —        |
| TailwindCSS    | Styles et composants             | CDN Play |
| Inter          | Police principale (Google Fonts) | —        |
| JetBrains Mono | Police monospace (badges, code)  | —        |
| GitHub Pages   | Hébergement statique             | —        |

> **Pourquoi Tailwind CDN Play ?**
> Pour un site statique déployé sur GitHub Pages sans pipeline de build,
> le CDN Play de Tailwind est la solution officielle recommandée. Il compile
> les classes en temps réel dans le navigateur — aucune dépendance npm requise.

---

## 📁 Structure du projet

```
fullStack_portfolio/
│
├── index.html              # Accueil — Hero, projets vedette, compétences, contact
├── lister-projets.html     # Liste de tous les projets (6 cartes)
├── detailler-projet.html   # Détail d'un projet (layout 2 colonnes)
├── ajouter-projet.html     # Formulaire admin (noindex, accès discret)
│
├── images/
│   ├── projet1.jpg         # E-commerce
│   ├── projet2.jpg         # Gestionnaire de tâches
│   ├── projet3.jpg         # Blog personnel
│   └── og-preview.png      # Image Open Graph (1200×630px)
│
└── README.md
```

---

## 🚀 Installation & lancement local

Aucune dépendance à installer. Le projet tourne directement dans le navigateur.

### Option 1 — Cloner et ouvrir

```bash
# Cloner le dépôt
git clone https://github.com/seydinalimamoulayeyade/fullStack_portfolio.git

# Accéder au dossier
cd fullStack_portfolio

# Ouvrir dans le navigateur
open index.html
# ou sous Linux
xdg-open index.html
```

### Option 2 — Live Server (recommandé en développement)

Si vous utilisez **VS Code** :

1. Installer l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clic droit sur `index.html` → **Open with Live Server**
3. Le site se recharge automatiquement à chaque sauvegarde

### Option 3 — Serveur HTTP simple (Python)

```bash
# Python 3
python -m http.server 8080

# Ouvrir : http://localhost:8080
```

---

## 📦 Déploiement GitHub Pages

Le site est automatiquement déployé sur GitHub Pages depuis la branche `main`.

```bash
# Pousser les modifications
git add .
git commit -m "type(scope): description"
git push origin main

# GitHub Pages se met à jour automatiquement en ~1 minute
# URL : https://seydinalimamoulayeyade.github.io/fullStack_portfolio/
```

### Convention de commits (Conventional Commits)

| Préfixe   | Usage                    |
| --------- | ------------------------ |
| `feat`    | Nouvelle fonctionnalité  |
| `fix`     | Correction de bug        |
| `style`   | Changements CSS/Tailwind |
| `content` | Mise à jour du contenu   |
| `seo`     | Améliorations SEO        |
| `docs`    | Documentation            |
| `chore`   | Maintenance              |

**Exemples :**

```bash
git commit -m "feat(index): add skills section with three columns"
git commit -m "fix(nav): add missing Accueil link on lister-projets page"
git commit -m "seo(all): add Open Graph and Twitter Card meta tags"
git commit -m "content(projects): add dashboard analytics project card"
```

---

## 🔍 SEO & Performance

### Meta tags implémentés

| Balise                   | Pages                                                |
| ------------------------ | ---------------------------------------------------- |
| `<title>` personnalisé   | Toutes les pages                                     |
| `<meta description>`     | Toutes les pages publiques                           |
| `<meta keywords>`        | Pages publiques                                      |
| `<meta robots>`          | `index,follow` (public) · `noindex,nofollow` (admin) |
| `<link rel="canonical">` | Pages publiques                                      |
| Open Graph (`og:*`)      | Pages publiques                                      |
| Twitter Card             | Pages publiques                                      |

### Bonnes pratiques appliquées

- Images avec attribut `alt` descriptif sur toutes les balises `<img>`
- Liens icônes avec `aria-label` pour les lecteurs d'écran
- Structure HTML sémantique : `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`
- Hiérarchie des titres respectée (`h1` → `h2` → `h3`)
- `rel="noopener"` sur tous les liens `target="_blank"`

---

## 🗺️ Roadmap

- [x] Page d'accueil avec hero section et compétences
- [x] Liste des projets avec grille responsive
- [x] Page de détail avec layout 2 colonnes
- [x] Formulaire d'administration (accès discret)
- [x] SEO complet (OG, Twitter Card, canonical)
- [ ] Ajouter une vraie photo de profil
- [ ] Créer l'image `og-preview.png` (1200×630px)
- [ ] Ajouter le CV PDF téléchargeable
- [ ] Migrer vers Tailwind CLI pour la production (purge CSS)
- [ ] Ajouter les animations CSS d'entrée (fade-in au scroll)

---

## 📬 Contact

| Canal            | Lien                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| **GitHub**       | [@seydinalimamoulayeyade](https://github.com/seydinalimamoulayeyade) |
| **LinkedIn**     | [linkedin.com/in/seydina](https://linkedin.com)                      |
| **Email**        | seydina@example.com                                                  |
| **Localisation** | Dakar, Sénégal 🇸🇳                                                    |

---

## 📄 Licence

Ce projet est sous licence **MIT** — libre de s'en inspirer avec attribution.

---

<div align="center">
  <sub>Fait avec ❤️ à Dakar · <strong>Seydina Limamou Laye Yade</strong></sub>
</div> -->
