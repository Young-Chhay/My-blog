const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User can have many Blogs posted 
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Blog belong to each specifi users 
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// User can have many comment posted 
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Blogs has many comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// Comment belongs to User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
// Comment belongs to blogs. 
Comment.belongsTo(Blog, {
    foreignKey: "blog_id",
  });

module.exports = { User, Blog, Comment };





