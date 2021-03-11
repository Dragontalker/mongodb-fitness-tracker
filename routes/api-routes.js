// initiate the router
const express = require('express');
const router = express.Router();


// load the data model schema
const db = require('../models');

// connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
);


router.get('/', async (req, res) => {
    const result = await db.Workout.find({})
    res.json(result);
});

router.post('/', async (req, res) => {
    const result = await db.Workout.create({});
    res.json(result);
});

router.get('/range', async (req, res) => {
    await db.Workout.deleteMany({'totalDuration': 0});
    await db.Workout.deleteMany({'exercises': {$elemMatch: {'duration': 0}}});
    const result = await db.Workout.find({}).sort({day: -1}).limit(7);
    const reverse = result.reverse();
    res.json(reverse);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const duration = data.duration;
    const workout = await db.Workout.findOneAndUpdate(
        { _id: id },
        { 
            $push: { exercises: data },
            $inc: { totalDuration: duration}
        }, 
        {new: true}
    );
    const result = await workout.save();
    res.json(result);
});

module.exports = router;