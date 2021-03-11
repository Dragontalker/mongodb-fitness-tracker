const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    
    totalDuration: {
        type: Number,
        default: 0,
        min: [0, 'Minimum total duration is 0 minutes.']
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
        
            duration: {
                type: Number
            },
        
            distance: {
                type: Number
            },
        
            weight: {
                type: Number
            },
        
            reps: {
                type: Number
            },
        
            sets: {
                type: Number
            }
        }
    ]
}, {
    versionKey: false
});

const Workout = mongoose.model('workout', WorkoutSchema);
module.exports = Workout;