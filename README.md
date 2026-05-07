# Plateforme_Orchestration_AI_Frontend


## Objectif du projet


Ce projet est le frontend d'une plateforme d'orchestration IA developpe avec **Next.js**. Il contient des pages de **Signup**, **Login** et **Analyze** avec des styles modulaires. Le projet est conteneurise avec **Docker** pour faciliter le deploiement.


## Structure du projet

```
frontend/
│
├─ app/
│ ├─ signup/
│ │ ├─ page.jsx
│ │ └─ signup_styles.module.css
│ │
│ ├─ login/
│ │ ├─ page.jsx
│ │ └─ login_styles.module.css
│ │
│ ├─ analyze/
│ │ ├─ page.jsx
│ │ └─ analyze_styles.module.css
│ │
│ └─ globals.css
│
├─ public/
│ └─ (images, favicon, assets)
│
├─ Dockerfile
├─ package.json
├─ package-lock.json
└─ README.md
```


---

## Pages et fonctionnalités

### Signup

- Fichier : `app/signup/page.jsx`
- Styles : `app/signup/signup_styles.module.css`
- Permet à un utilisateur de créer un compte.

### Login

- Fichier : `app/login/page.jsx`
- Styles : `app/login/login_styles.module.css`
- Permet à un utilisateur de se connecter et de recevoir un token stocké dans `localStorage`.

### Analyze

- Fichier : `app/analyze/page.jsx`
- Styles : `app/analyze/analyze_styles.module.css`
- Page pour analyser du texte ou interagir avec le backend IA.

---

## Installation

### Prérequis

- Node.js >= 20
- npm
- Docker (optionnel pour exécuter dans un conteneur)

### Installation locale

1. Cloner le projet :
```shell
git clone <URL_DU_PROJET>
cd frontend
```


2. Installer les dependances :

```sell
npm install
```

3. Lancer le serveur de developpement :

```shell
npm run dev
```

4. Ouvrir le navigateur a :
```shell
http://localhost:3000
```

### Execution avec Docker

1. Construire l’image Docker :

```shell
docker build -t nextjs-frontend .
```

2. Lancer le conteneur :

```shell
docker run -p 3001:3000 nextjs-frontend
```

3. Acceder à l’application :

```shell
http://localhost:3001
```

 
