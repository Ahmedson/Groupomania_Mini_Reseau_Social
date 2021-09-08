module.exports = (req, res, next) => {
  try{
    let pwd = req.body.password; 
    if ((pwd.match( /[0-9]/g) && pwd.match( /[A-Z]/g) && pwd.match(/[a-z]/g) 
    && pwd.match( /[^a-zA-Z\d]/g) && pwd.length >= 8)){
      next();
    } else {
      res.status(403).json({error : 'unauthorized request',
                            message: 'Mot de passe requis : minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spéciale'})
    }
  }catch{
    res.status(401).json({error : new Error('Invalid request !')})
  }
}