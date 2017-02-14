'use strict';
let Router = require('express').Router;
//let mongojs = require('mongojs');
//let db = mongojs('mongodb://navaneeth:navaneeth@ds139989.mlab.com:39989/mytasklist_nava', ['tasks'])
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myTodoList');
//let db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection Error'));
let taskSchema = require('../models/taskmodel');
//let db = new taskSchema();
class Api {
    constructor() {
        this.router = Router();
        this.init();
    }
    init() {

        //Get All Tasks
        this.router.get('/tasks', (req, res, next) => {
            taskSchema.find((err, tasks) => {
                if (err) {
                    res.send(err);
                }
                res.json(tasks);
            })
        });

        //Get Single Task
        this.router.get('/task/:id', (req, res, next) => {
            taskSchema.findOne({
                _id: mongoose.Types.ObjectId(req.params.id)
            }, (err, task) => {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            })
        });

        //Save Task
        this.router.post('/task', (req, res, next) => {
            var task = req.body;
            console.log("enter save method");
            console.log(task);
            if (!task.title || !(task.isDone + '')) {
                console.log("enterd if in save method");
                res.status(400);
                res.json({
                    "error": "Bad Data"
                });
            } else {
                console.log("enterd else in save method");
                let taskInst = new taskSchema(task);
                taskInst.taskify();
                taskInst.save((err, task) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(task);
                });
            }
        })

        //Delete Task
        this.router.delete('/task/:id', (req, res, next) => {
            taskSchema.remove({
                _id: mongoose.Types.ObjectId(req.params.id)
            }, (err, task) => {
                if (err) {
                    res.send(err);
                }
                //console.log(task);
                res.json(task);
            })
        });

        //Update Task
        this.router.put('/task/:id', (req, res, next) => {
            var task = req.body;
            var updTask = {};

            if (task.isDone) {
                updTask.isDone = task.isDone;
            }

            if (task.title) {
                updTask.title = task.title;
            }

            if (!updTask) {
                res.status(400);
                res.json({
                    error: 'Bad Data'
                })
            } else {
                taskSchema.update({
                    _id: mongoose.Types.ObjectId(req.params.id)
                }, updTask, {}, (err, task) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(task);
                })
            }
        });
    }
}

module.exports = new Api().router;
