require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./constrollers/blogs')
const loginRouter = require('./constrollers/login')
const usersRouter = require('./controllers/users')

const app = express()