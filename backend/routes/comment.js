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
router.get('/:postId', auth, commentCtrl.getAllCommentOnOnePost);
router.get('/:commentId', auth, commentCtrl.getOneComment);
router.post('/:userId/create', auth, commentCtrl.createComment);
router.put('/:userId/modify/:commentId', auth, commentCtrl.modifyComment);
router.delete('/:userId/delete/:commentId', auth, commentCtrl.deleteComment);

// Exportation du routeur
module.exports = router;