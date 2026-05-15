const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', (request, response, next) => {
    const { author, title, url, likes } = request.body

    Blog.findById(request.params.id)
        .then((blog) => {
            if (!blog) {
                return response.status(404).end()
            }

            blog.author = author
            blog.title = title
            blog.url = url
            blog.likes = likes

            return blog.save().then((updatedBlog) => {
                response.json(updatedBlog)
            })
        })
        .catch((error) => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
