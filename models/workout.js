const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    exercises: [
        {
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
                required: true
            },

            weight: {
                type: Number,
                required: true
            },

            reps: {
                type: Number,
                required: true
            },
            
            sets: {
                type: Number,
                required: true
            },
        }
    ]
});

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        defualt: Date.now
    },
    
    exercises: [ExerciseSchema]
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;