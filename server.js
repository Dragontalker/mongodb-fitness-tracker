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
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

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

app.get('/api/workouts', (req, res) => {
  res.json({msg: 'Hello world!'});
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