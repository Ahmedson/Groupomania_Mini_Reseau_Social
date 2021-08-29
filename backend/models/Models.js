const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

/**
 * POST
 */
const Post = sequelize.define('post', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  post: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

/**
 * COMMENT
 */
const Comment = sequelize.define('comment', {
  comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

/**
 * USER
 */
 const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Post.belongsTo(User);
Comment.belongsTo(User);
Comment.belongsTo(Post);

sequelize.sync()
  .then((data) => {
    console.log('Table and model synced successfully')
  })
  .catch((error) => {
    console.log('Error syncing the table and model')
  })

module.exports = { sequelize };