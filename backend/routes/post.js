// Importation d'express
const express = require('express');

// création d'un router express
// Routage fait référence à la définition de points finaux d’application (URI) 
// et à la façon dont ils répondent aux demandes client
const router = express.Router();

// Importation du contrôleur pour les users
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

// application des fonctions du contrôleur à chaque route 
// [attention à ne pas appeler les fonctions]
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, postCtrl.createPost);
router.put('/modify/:id', auth, postCtrl.modifyPost);
router.delete('/delete/:id', auth, postCtrl.deletePost);
// router.post('/:id/like', postCtrl.likePost);

// Exportation du routeur
module.exports = router;