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
 * POST MULTIMEDIA
 */
const PostImg = sequelize.define('postImg', {
  postImg_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
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
 * COMMENT MULTIMEDIA
 */
 const CommentImg = sequelize.define('commentImg', {
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
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

User.hasMany(Post, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
});
Post.belongsTo(User, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
})
User.hasMany(PostImg, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
});
PostImg.belongsTo(User, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
})
User.hasMany(Comment, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
})
User.hasMany(CommentImg, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
});
CommentImg.belongsTo(User, {
  foreignKey: "user_id",
  constraints: false,
  onDelete: 'cascade'
})
Post.hasMany(Comment, {
  foreignKey: "post_id",
  constraints: false,
  onDelete: 'cascade'
});
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  constraints: false,
  onDelete: 'cascade'
})
PostImg.hasMany(CommentImg, {
  foreignKey: "postImg_id",
  constraints: false,
  onDelete: 'cascade'
});
CommentImg.belongsTo(PostImg, {
  foreignKey: "postImg_id",
  constraints: false,
  onDelete: 'cascade'
})

// sequelize.sync({ force: true})
//   .then((data) => {
//     console.log('Table and model synced successfully')
//   })
//   .catch((error) => {
//     console.log('Error syncing the table and model')
//   })

module.exports = {
  User,
  Post,
  PostImg,
  Comment,
  CommentImg,
  sequelize
};