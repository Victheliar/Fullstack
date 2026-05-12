const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('correct amount of blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog id is defined as id', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0].id, helper.initialBlogs[0]._id)
})

test('a valid blog can be added', async() => {
    const newBlog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://www.testblog.com",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].title, newBlog.title)
})

test('if likes property is missing, it defaults to 0', async() => {
    const newBlog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://www.testblog.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})