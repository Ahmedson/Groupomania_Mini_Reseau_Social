// Les contrôleurs contiennent la logique métier, 
// et sont généralement importés par les routeurs, 
// qui attribuent cette logique aux routes spécifiques.

// bcrypt est un package de chiffrement (algorithme unidirectionnel de hachage)
const bcrypt = require('bcrypt');

const { User } = require('../models/Models');

// Ici, nous exposons la logique de nos routes en tant que fonctions que nous exportons

exports.signup = (req, res, next) => {
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
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré' }))
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
            connected: "yes"
          })
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error));
}