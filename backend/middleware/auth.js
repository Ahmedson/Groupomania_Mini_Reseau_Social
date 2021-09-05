const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    // Récupération du token dans le header Authorization
    const token = req.headers.authorization.split(' ')[1];
    // verigy(token, signature) fonction qui décode le token et renvoie une erreur si non valide
    const decodedToken = jwt.verify(token, "token_key");

    const userId = decodedToken.userId;
    // Si il y a un userId dans la requête et qu'il ne correspond pas à celui de notre token on renvoie une erreur
    if (req.body.userId && req.body.userId !== userId){
      res.status(403).json({error : 'unauthorized request'})
    } else if (req.params.userId && req.params.userId != userId){
      res.status(403).json({error : 'unauthorized request'})
    }else {
      // Sinon passer au middleware suivant
      next();
    }
  }catch{
    res.status(401).json({error : true})
  }
}