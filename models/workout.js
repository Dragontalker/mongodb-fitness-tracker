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
                enum: ['resistence', 'cardio']
            },
        
            name: {
                type: String,
                trim: true,
            },
        
            duration: {
                type: Number,
                min: [1, 'Minimum duration is 1 minutes.']
            },
        
            distance: {
                type: Number,
                min: [0, 'Minimum distance is 0 miles.']
            },
        
            weight: {
                type: Number,
                min: [1, 'Minimum weight is 1 lbs.']
            },
        
            reps: {
                type: Number,
                min: [1, 'Minimum number of repititions is 1.']
            },
        
            sets: {
                type: Number,
                min: [1, 'Minimum number of sets is 1.']
            }
        }
    ]
}, {
    versionKey: false
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;