const express = require('express')

const Projects = require('./helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.headers)
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
});

router.get('/:id', validateProjectID, (req, res) => {
    res.status(200).json(req.project)
});

function validateProjectID (req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            project ? (req.project = project) & next() : 
            res.status(400).json({ message: "Error retrieving the action" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Error retrieving the action" })
        })
}

module.exports = router