// initiate the router
const express = require('express');
const router = express.Router();

// connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// load the data model schema
const db = require('../models');


router.get('/', async (req, res) => {
    const result = await db.Workout.find({})
    res.json(result);
});

router.post('/', async (req, res) => {
    await db.Workout.create({});
});

router.get('/deleteAll', async (req, res) => {
    await db.Workout.deleteMany({'totalDuration': 0});
    res.redirect('/');
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const duration = data.duration;
    console.log(id);
    console.log(data);
    console.log(duration);
});

module.exports = router;