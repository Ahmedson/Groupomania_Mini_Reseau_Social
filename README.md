# Projet 7 OpenClassrooms : GROUPOMANIA - Créez un réseau social d’entreprise

![logo Groupomania](https://github.com/Ahmedson/groupomania/blob/main/frontend/src/assets/logoLogin.png)
## Spécifications 

- La création d'un compte doit être simple et possible depuis un téléphone mobile.
- Le profil doit contenir très peu d'informations pour que sa complétion soit rapide.
- La suppression d'un compte doit être possible.
- L'accès à un forum ou les salariés publient des textes doit être présents.
- L'accès à un forum ou les salariés publient des contenus multimédia doit être présents.
- Les utilisateur doivent pouvoir facilement repéter les dernières participations des employés
- Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés

***

## Requis pour le lancement du projet

Node.js / MySQL / Vue.js 

***

## Base de données

1. Créer une base données MYSQL
2. Dans le fichier Models.js (backend/models/Models.js) ligne 3 : remplacer les renseignements d'accès à la DB par les vôtres :
```
3 const sequelize = new Sequelize('DB_NAME', 'USER_NAME', 'PASSWORD', {
```
3. Dans le fichier Models.js : décommenter les lignes 176 à 182 pour créer les tables lors du lancement du serveur, une fois la connection effectué, les recommenter :
```
176 // sequelize.sync({ force: true})
177 //   .then((data) => {
178 //     console.log('Table and model synced successfully')
179 //   })
180 //   .catch((error) => {
181 //     console.log('Error syncing the table and model')
182 //   })
```
***

## Backend

1. Dans le dossier backend, depuis votre terminal lancer la commande :

```
npm install
```

2. puis

```
node server (ou nodemon server)
```

***

## Frontend

1. Dans le dossier front, depuis votre terminal lancer la commande :

```
npm install
```

2. puis

```
npm run serve
```

3. Rendez vous à l'adresse

```
http://localhost/8080
```

***

## Utilisation

- L'application est prête à être utilisée
- Aucun compte existant
- Le premier compte crée est le seul qui possédera les droits administrateur
- Découvrez l'application de manière intuitive
- 
***