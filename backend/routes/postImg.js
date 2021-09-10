// Importation d'express
const express = require('express');

// création d'un router express
// Routage fait référence à la définition de points finaux d’application (URI) 
// et à la façon dont ils répondent aux demandes client
const router = express.Router();

// Importation du contrôleur pour les users
const postImgCtrl = require('../controllers/postImg');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

// application des fonctions du contrôleur à chaque route 
// [attention à ne pas appeler les fonctions]
router.get('/', auth, postImgCtrl.getAllPost);
router.get('/:id', auth, postImgCtrl.getOnePost);
router.post('/:userId', auth, multer, postImgCtrl.createPost);
router.put('/:userId/modify/:postImgId', auth, multer, postImgCtrl.modifyPost);
router.delete('/:userId/delete/:postImgId', auth, multer, postImgCtrl.deletePost);
// router.post('/:id/like', postCtrl.likePost);

// Exportation du routeur
module.exports = router;