const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const USer = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        id: 1
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({
            error: 'Password is required and its minimum length is 3 characters'
        })
    }
    
})