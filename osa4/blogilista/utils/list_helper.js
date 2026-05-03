const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        return favorite.likes > blog.likes ? favorite : blog
    }
    return blogs.length === 0 ? {} : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.countBy(blogs, 'author')
    const reducer = (most, author) => {
        return most.blogs > blogsByAuthor[author] ? most : { author : author, blogs : blogsByAuthor[author] }
    }
    return blogs.length === 0 ? {} : Object.keys(blogsByAuthor).reduce(reducer, 0)
}

module.exports = { 
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlogs
}