const express = require('express');

const { sequelize } = require('./models/Models')

const path = require('path');
const postRoutes = require('./routes/post');
const postImgRoutes = require('./routes/postImg');
const commentRoutes = require('./routes/comment');
const commentImgRoutes = require('./routes/commentImg');
const userRoutes = require('./routes/user');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  })

const app = express();

app.use((req, res, next) => {
  // Permet l'accès à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Permet d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
// Enregistrement du routeur pour les posts sur le chemin /comment
app.use('/comment', commentRoutes);
// Enregistrement du routeur pour les posts sur le chemin /comment
app.use('/commentImg', commentImgRoutes);
// Enregistrement du routeur pour les posts sur le chemin /post
app.use('/post', postRoutes);
// Enregistrement du routeur pour les posts multimédia sur le chemin /postImg
app.use('/postImg', postImgRoutes);
// Enregistrement du routeur pour les utilisateurs sur le chemin /auth
app.use('/auth', userRoutes);

module.exports = app;
