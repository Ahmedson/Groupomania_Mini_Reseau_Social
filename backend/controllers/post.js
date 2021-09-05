const { Post } = require('../models/Models');

exports.createPost = (req, res, next) => {
  const post = Post.build({
    title: req.body.title,
    post: req.body.post,
    user_id: req.body.user_id
  })
  post.save()
    .then(() => res.status(201).json({ message: 'Message posté' }))
    .catch(error => res.status(400).json(error))
}

exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error))
}

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { post_id: req.params.postId } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json(error))
}

exports.modifyPost = (req, res, next) => {
  Post.update({ ...req.body }, {
    where: {
      post_id: req.params.postId
    }
  })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch(error => res.status(400).json(error))
}

exports.deletePost = (req, res, next) => {
  Post.destroy({
    where: {
      post_id: req.params.postId
    }
  })
    .then(() => res.status(200).json("Post supprimé !"))
    .catch(error => res.status(400).json(error))
}