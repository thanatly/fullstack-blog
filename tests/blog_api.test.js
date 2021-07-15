const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('verifying the existence of id', async () => {
  const response = await api.get('/api/blogs')
  
  const contents = response.body.map(r => r.id)
  expect(contents).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = 
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      id: "5a422b3a1b54a676234d17f9"
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Canonical string reduction'
  )
})

test('if like missing, default to 0', async () => {
  const nolikeBlog = 
    {
      title: "No like",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      id: "5a422a851b54a676234d17f0"
    }
  await api
  .post('/api/blogs')
  .send(nolikeBlog)
  .expect(200)

  const response = await api.get('/api/blogs')
  const addedNote = response.body
  expect(addedNote[addedNote.length-1].likes).toEqual(0)
}, 100000)

test('blog without title and url is not added', async () => {
  const incompleteBlog = 
    {
      author: "Edsger W. Dijkstra",
      likes: 12,
      id: "5a422b3a1b54a676234d17ff"
    }
  await api
  .post('/api/blogs')
  .send(incompleteBlog)
  .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

afterAll( async () => {
  await mongoose.connection.close()
})