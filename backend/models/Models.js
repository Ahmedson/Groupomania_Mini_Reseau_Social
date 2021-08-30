const { Sequelize, DataTypes, STRING } = require('sequelize');

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
  title: {
    type: DataTypes.STRING,
    allowNull: false
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

User.hasMany(Post, {
  foreignKey: "user_id",
  constraints: false
});
Post.belongsTo(User, {
  foreignKey: "user_id",
  constraints: false
})
User.hasMany(Comment, {
  foreignKey: "user_id",
  constraints: false
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  constraints: false
})
Post.hasMany(Comment, {
  foreignKey: "post_id",
  constraints: false
});
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  constraints: false
})

// sequelize.sync({ alter: true})
//   .then((data) => {
//     console.log('Table and model synced successfully')
//   })
//   .catch((error) => {
//     console.log('Error syncing the table and model')
//   })

module.exports = { 
  User,
  Post,
  sequelize 
};