const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
});

// blogsRouter.get('/:id', (request, response, next) => {
//     Blog.findById(request.params.id)
//         .then((blog) => {
//             if (blog) {
//                 response.json(blog)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch((error) => next(error))
// })

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogsRouter.post('/', userExtractor, async (request, response, next) => {
    const body = request.body
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }
    // const user = await User.findById(decodedToken.id)
    // get user from request object
    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { author, title, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)
        if (blog) {
            blog.author = author
            blog.title = title
            blog.url = url
            blog.likes = likes

            const updatedBlog = await blog.save()
            response.status(200).json(updatedBlog)
        }
    })

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    // await Blog.findByIdAndDelete(request.params.id)
    // // response.status(204).end()
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'only the owner can delete a blog ' })
    }
})

module.exports = blogsRouter
