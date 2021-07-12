const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .catch(error => next(error))
    response.json(blogs)
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
