// Les contrôleurs contiennent la logique métier, 
// et sont généralement importés par les routeurs, 
// qui attribuent cette logique aux routes spécifiques.

// bcrypt est un package de chiffrement (algorithme unidirectionnel de hachage)
const bcrypt = require('bcrypt');

// JWT sont des jetons générés par un serveur lors de 
// l'authentification d'un utilisateur sur une application Web
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { User } = require('../models/Models');

// Ici, nous exposons la logique de nos routes en tant que fonctions que nous exportons

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { user_id: req.params.id } })
    .then(user => {
        oneUser = {
          "user_id" : user.user_id,
          "firstName" : user.firstName,
          "lastName" : user.lastName,
          "email" : user.email,
          "createdAt" : user.createdAt,
          "picture" : user.picture
        }
      res.status(200).json(oneUser)
    })
    .catch(error => res.status(400).json(error))
}

exports.getAllUser = (req, res, next) => {
  User.findAll()
    .then(users => {
      let allUsers = [];
      for(let user of users) {
        let theUser = {
          "user_id" : user.user_id,
          "firstName" : user.firstName,
          "picture" : user.picture
        }
        allUsers.push(theUser)
      }
      res.status(200).json(allUsers)
    })
    .catch(error => res.status(400).json(error))
}

exports.modifyEmail = (req, res, next) => {
  User.update({ email: req.body.email }, {
    where: {
      user_id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: "Email modifié" }))
    .catch(error => res.status(400).json(error))
}

exports.modifyPicture = (req, res, next) => {
  User.findOne({ where: { user_id: req.params.id } })
    .then( user => {
      let filename;
      if (user.picture !== null ){
        filename = user.picture.split('/images')[1];
      fs.unlink(`images/${filename}`, () => {
        User.update({ picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }, {
          where: {
            user_id: req.params.id
          }
        })
        .then(() => res.status(200).json({ message: "Photo de profil modifié" }))
        .catch(error => res.status(400).json(error))
      })
    } else {
      User.update({ picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }, {
        where: {
          user_id: req.params.id
        }
      })
      .then(() => res.status(200).json({ message: "Photo de profil modifié" }))
      .catch(error => res.status(400).json(error))
    }
    })
    .catch(error => res.status(400).json(error))
}

exports.deleteUser = (req, res, next) => {
  User.destroy({
    where: {
      user_id: req.params.id
    }
  })
    .then(() => res.status(200).json("Utilisateur supprimé !"))
    .catch(error => res.status(400).json(error))
}

exports.signup = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user) {
        return res.status(200).json({ message: 'Adresse email déjà utilisé', emailAlreadyUsed : true });
      }
    })
    .catch(error => res.status(500).json(error))
  // hash(pwd, nombre de salage) fonction qui retourne une promesse avec le mot de passe hashé
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = User.build({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(async () =>  {
          await User.findOne({ where: { email: req.body.email } })
            .then( async user => {
              await res.status(201).json({
                message: 'Utilisateur enregistré',
                userId : user.user_id,
                token: jwt.sign(
                  {userId : user.user_id},
                  "token_key",
                  {expiresIn : '1h'})
                })
            })
            .catch(error => res.status(400).json(error))
          res.status(201).json({ message: 'Utilisateur enregistré'})
        })
        .catch(error => res.status(400).json(error))
    })
    .catch(error => res.status(500).json(error))
}

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid) {
            return res.status(401).json({ error : 'Mot de passe incorrect !'});
          }
          res.status(200).json({
            userId : user.user_id,
            token: jwt.sign(
              {userId : user.user_id},
              "token_key",
              {expiresIn : '8h'}
            )
          })
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error));
}