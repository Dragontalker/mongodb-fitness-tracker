const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app = express();
const Schema = mongoose.Schema;

// I was spliting my files into diffrent directory, everything worked fine locally. However, 
// when I deployed to Heroku, my server app always crash. Took my several hours to debug, I 
// found out that I have to put the schema files and server connections in the same Javascript
// file, otherwise it does not work not Heroku. The reason still remains unknown for now, but 
// the best solution I can provide is to put schema and routes into this server main file. 

// Originally, 
// schema should be stored in ./models/workout.js
// api handlers should be stored in ./routes/api-routes.js
// html handlers should be stored in ./routes/html-routes.js

// I will convert the directory structure into best practice once I figure out the reason behind the crashes on Heroku.

// MongoDB schema starts here =============================
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },

  totalDuration: {
    type: Number,
    default: 0
  },

  exercises: [
    {
      type: {
        type: String,
        enum: ['resistance', 'cardio']
      },

      name: {
        type: String,
        trim: true
      },

      distance: Number,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model('workout', WorkoutSchema);
// MongoDB schema ends here =============================

// Express middlewares starts here ======================
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/exercise.html'));
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/stats.html'));
});

app.get('/api/workouts', async (req, res) => {
  const result = await Workout.find({});
  res.json(result);
});

app.get('/api/workouts/range', async (req, res) => {
  await Workout.deleteMany({'totalDuration': 0}); 
  await Workout.deleteMany({'exercises': {$elemMatch: {'duration': 0}}});
  const result = await Workout.find({}).sort({day: -1}).limit(7);
  const reverse = result.reverse();
  res.json(reverse);
});

app.post('/api/workouts', async (req, res) => {
  const result = await Workout.create({});
  res.json(result);
});

app.put('/api/workouts/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const duration = data.duration;
  const workout = await Workout.findOneAndUpdate(
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
// Express middlewares ends here ======================

// Server set up starts here ==========================
const mongoParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', mongoParams)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`);
    });
  });
// Server set up endss here ===========================