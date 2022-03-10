const Blog = require('../models/blog');

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new Blog' });       //we have created the function (of getting the blog create page here) and then exported it to blogRoutes.js
}

module.exports = {
    blog_create_get
}