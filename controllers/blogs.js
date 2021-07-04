const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
      .catch(error => next(error))
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(savedBlog => {
        response.json(savedBlog.toJSON())
      })
      .catch(error => next(error))
  })

module.exports = blogsRouter
