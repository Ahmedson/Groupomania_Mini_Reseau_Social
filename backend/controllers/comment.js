const { Comment } = require('../models/Models');

exports.createComment = (req, res, next) => {
  const comment = Comment.build({
    comment: req.body.comment,
    post_id: req.body.post_id,
    user_id: req.body.user_id
  })
  comment.save()
    .then(() => res.status(201).json({ message: "Commentaire posté", comment_id : comment.comment_id }))
    .catch(error => res.status(400).json(error))
}

exports.getAllCommentOnOnePost = (req, res, next) => {
  Comment.findAll({
    where: {
      post_id: req.body.post_id
    }
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error))
}

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { comment_id: req.params.id } })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json(error))
}

exports.modifyComment = (req, res, next) => {
  Comment.update({ comment: req.body.comment }, {
    where: {
      comment_id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: "Commentaire modifié" }))
    .catch(error => res.status(400).json(error))
}

exports.deleteComment = (req, res, next) => {
  Comment.destroy({
    where: {
      comment_id: req.params.id
    }
  })
    .then(() => res.status(200).json("Commentaire supprimé !"))
    .catch(error => res.status(400).json(error))
}
