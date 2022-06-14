const Blog = require('../models/blog');

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
}

module.exports = {
    blog_create_get
}