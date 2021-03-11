const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app = express();
const Schema = mongoose.Schema;

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

      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model('workout', WorkoutSchema);

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