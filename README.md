# Social Media Microservices

Une application de réseau social basée sur une architecture orientée **Microservices**. Ce projet a été conçu pour démontrer la communication inter-services, l'agrégation de données et la sécurisation via une API Gateway.

## 🏗 Architecture & Ports

Le projet est découpé en plusieurs services indépendants :

| Service | Port | Description |
|:---|:---:|:---|
| **API Gateway** | `7000` | Point d'entrée unique. Gère l'authentification (JWT) et masque la complexité de l'architecture backend au frontend. |
| **User Service** | `5000` | Gère l'identité des utilisateurs (stockage et récupération). |
| **Post Service** | `6001` | Gère les publications. Protégé par JWT via le Gateway. |
| **Comment Service** | `5002` | Gère les commentaires liés aux posts. Protégé par JWT. |
| **Feed Service** | `5003` | Gère le fil d'actualité. Utilise le *Design Pattern Aggregator* pour appeler les autres services et combiner les données en un seul point de terminaison. |

## 🚀 Fonctionnalités Clés
- **Pattern API Gateway** : Routage transparent HTTP proxy et centralisation de la sécurité.
- **Pattern Aggregator** : Optimisation des appels réseau inter-services grâce au `feed-service`.
- **Interface de Démo** : Front-end minimaliste en Vanilla HTML/JS (`frontend/index.html`) permettant l'authentification et l'interaction avec le projet de bout en bout.

## 🛠 Technologies Utilisées
- **Serveur :** Node.js avec Express.js
- **Base de données :** MongoDB (Mongoose)
- **Dépendances majeures :** Axios (appels internes), jsonwebtoken (Auth), http-proxy-middleware, dotenv.
- **Frontend :** HTML, CSS, JavaScript (Fetch API)

## 🏃 Lancer le Projet Localement

1. Démarrer une instance locale ou cloud de MongoDB.
2. Lancer les 5 microservices. Il faut ouvrir 5 terminaux distincts :

```bash
cd api-gateway && npm run dev     # (ou node server.js)
cd user-service && npm run dev        
cd post-service && npm run dev        
cd comment-service && npm run dev     
cd feed-service && npm run dev        
```

3. Ouvrez le fichier `frontend/index.html` dans un navigateur Web récent.
4. Générer un Token JWT via l'encart d'authentification pour utiliser les services sécurisés.
