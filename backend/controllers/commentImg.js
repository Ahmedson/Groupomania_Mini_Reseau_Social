const { CommentImg } = require('../models/Models');

exports.createComment = (req, res, next) => {
  const comment = CommentImg.build({
    comment: req.body.comment,
    postImg_id: req.body.postImg_id,
    user_id: req.body.user_id
  })
  comment.save()
    .then(() => res.status(201).json({ message: "Commentaire posté", comment_id : comment.comment_id }))
    .catch(error => res.status(400).json(error))
}

exports.getAllCommentOnOnePost = (req, res, next) => {
  CommentImg.findAll({
    where: {
      postImg_id: req.params.postId
    }
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error))
}

exports.getOneComment = (req, res, next) => {
  CommentImg.findOne({ where: { comment_id: req.params.commentId } })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json(error))
}

exports.modifyComment = (req, res, next) => {
  CommentImg.update({ comment: req.body.comment }, {
    where: {
      comment_id: req.params.commentId
    }
  })
    .then(() => res.status(200).json({ message: "Commentaire modifié" }))
    .catch(error => res.status(400).json(error))
}

exports.deleteComment = (req, res, next) => {
  CommentImg.destroy({
    where: {
      comment_id: req.params.commentId
    }
  })
    .then(() => res.status(200).json("Commentaire supprimé !"))
    .catch(error => res.status(400).json(error))
}
