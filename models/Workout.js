const mongoose = require('mongoose');
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

module.exports = Workout;