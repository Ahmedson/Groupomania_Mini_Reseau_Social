// Importation d'express
const express = require('express');

// création d'un router express
// Routage fait référence à la définition de points finaux d’application (URI) 
// et à la façon dont ils répondent aux demandes client
const router = express.Router();

// Importation du contrôleur pour les users
const commentCtrl = require('../controllers/comment');

// application des fonctions du contrôleur à chaque route 
// [attention à ne pas appeler les fonctions]
router.get('/', commentCtrl.getAllCommentOnOnePost);
router.get('/:id', commentCtrl.getOneComment);
router.get('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

// Exportation du routeur
module.exports = router;