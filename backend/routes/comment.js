// Importation d'express
const express = require('express');

// création d'un router express
// Routage fait référence à la définition de points finaux d’application (URI) 
// et à la façon dont ils répondent aux demandes client
const router = express.Router();

// Importation du contrôleur pour les users
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// application des fonctions du contrôleur à chaque route 
// [attention à ne pas appeler les fonctions]
router.post('/', auth, commentCtrl.getAllCommentOnOnePost);
router.get('/:id', auth, commentCtrl.getOneComment);
router.post('/create', auth, commentCtrl.createComment);
router.put('/modify/:id', auth, commentCtrl.modifyComment);
router.delete('/delete/:id', auth, commentCtrl.deleteComment);

// Exportation du routeur
module.exports = router;