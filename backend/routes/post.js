// Importation d'express
const express = require('express');

// création d'un router express
// Routage fait référence à la définition de points finaux d’application (URI) 
// et à la façon dont ils répondent aux demandes client
const router = express.Router();

// Importation du contrôleur pour les users
const postCtrl = require('../controllers/post');

// application des fonctions du contrôleur à chaque route 
// [attention à ne pas appeler les fonctions]
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.createPost);
router.put('/modify/:id', postCtrl.modifyPost);
router.delete('/delete/:id', postCtrl.deletePost);
// router.post('/:id/like', postCtrl.likePost);

// Exportation du routeur
module.exports = router;