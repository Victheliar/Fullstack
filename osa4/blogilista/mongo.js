const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

Blog.find({}).then((result) => {
    result.forEach((blog) => {
        console.log(blog)
    })
    mongoose.connection.close()
})