const { PostImg } = require('../models/Models');

const fs = require('fs');

exports.createPost = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  const post = PostImg.build({
    title: req.body.title,
    imageUrl: url,
    user_id: req.params.userId
  })
  
  post.save()
    .then(() => res.status(201).json({ message: 'Message posté' }))
    .catch(error => res.status(400).json(error))
}

exports.getAllPost = (req, res, next) => {
  PostImg.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error))
}

exports.getOnePost = (req, res, next) => {
  PostImg.findOne({ where: { postImg_id: req.params.postImgId } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json(error))
}

exports.modifyPost = (req, res, next) => {
  PostImg.findOne({ where: { postImg_id: req.params.postImgId } })
  .then(post => {
    const filename = post.imageUrl.split('/images')[1];

    fs.unlink(`images/${filename}`, () => {

    PostImg.update({ 
      // ...req.body
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }, {
      where: {
        postImg_id: req.params.postImgId
      }
    })
      .then(() => res.status(200).json({ message: "Post modifié !" }))
      .catch(error => res.status(400).json(error))
    })
  })
  .catch(error => res.status(400).json(error))

}

exports.deletePost = (req, res, next) => {
  PostImg.findOne({ where: { postImg_id: req.params.postImgId } })
  .then(post => {
    const filename = post.imageUrl.split('/images')[1];

    fs.unlink(`images/${filename}`, () => {
      PostImg.destroy({
        where: {
          postImg_id: req.params.postImgId
        }
      })
        .then(() => res.status(200).json("Post supprimé !"))
        .catch(error => res.status(400).json(error))
    })
  })
  .catch(error => res.status(400).json(error))

}