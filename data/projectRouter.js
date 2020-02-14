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

router.get('/:id/actions', validateProjectActionsID, (req, res) => {
    res.status(200).json(req.project)
});

router.post('/', validateProject, (req, res) => {
    console.log(`router post ${req.body}`)
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error while saving this project to the database' })
        })
});

router.delete('/:id', validateProjectID, (req, res) => {
    Projects.remove(req.params.id)
        .then(removed => {
            res.status(200).json(removed)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'The project could not be removed'})
        })
});

router.put('/:id', validateProjectID, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Project cannot be updated' })
        })
});

function validateProject(req, res, next) {
    console.log(`middleware validate project ${req.body.description} ${req.body.name}`)
    if(!req.body.description || !req.body.name){
        res.status(400).json({ message: 'Project does not have a description or a name' })
    }else{
      next()
    }
}

function validateProjectID (req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            project ? (req.project = project) & next() : 
            res.status(400).json({ message: "Error retrieving the project" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Error retrieving the project" })
        })
}

function validateProjectActionsID (req, res, next) {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            project ? (req.project = project) & next() : 
            res.status(400).json({ message: "Error retrieving the project" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Error retrieving the project" })
        })
}

module.exports = router