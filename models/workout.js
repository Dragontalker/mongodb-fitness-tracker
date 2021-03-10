const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        enum: ['resistence', 'cardio']
    },

    name: {
        type: String,
        trim: true,
        required: true
    },

    duration: {
        type: Number,
        required: true,
        min: [1, 'Minimum duration is 1 minutes.']
    },

    weight: {
        type: Number,
        required: true,
        min: [1, 'Minimum weight is 1 lbs.']
    },

    reps: {
        type: Number,
        required: true,
        min: [1, 'Minimum number of repititions is 1.']
    },

    sets: {
        type: Number,
        required: true,
        min: [1, 'Minimum number of sets is 1.']
    }
});

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        defualt: Date.now
    },
    
    totalDuration: {
        type: Number,
        default: 0,
        min: [0, 'Minimum total duration is 0 minutes.']
    },

    exercises: [ExerciseSchema]
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;