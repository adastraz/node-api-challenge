const express = require('express')
const helmet = require('helmet')

const actionRouter = require('./data/actionRouter.js')
const projectRouter = require('./data/projectRouter.js')

const server = express()

const logger = (req, res, next) => {
    console.log(`${req.method} Requests to ${req.originalUrl}`)
    next()
}

server.use(express.json())
server.use(helmet())

server.use('/api/actions', actionRouter)
// server.use('/api/projects', projectRouter)

server.get('/', logger, (req, res) => {
    const newThing = ({ thing: 'Cool', yep: 'yes'})
    res.status(200).json(newThing)
})

port = 5000
server.listen(port, () => {
    console.log(`\n* ${Date(Date.now).toString()}Server listening on https://localhost:${port} *\n`)
})