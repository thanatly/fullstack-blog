const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//make all router in async/ wait syntax  
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
// 4.13 delete
// 4.14 update blog
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    try { 
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
  })

module.exports = blogsRouter
