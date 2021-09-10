// multer est package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

try {
  const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    "image.gif": "gif",
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  }); 

  module.exports = multer({storage}).single('image');
} catch (error) {
  console.log("Al errrooorr")
}

