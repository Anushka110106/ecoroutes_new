const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    preferences: {
        travelMode: { type: String, default: "car" },
        avoidTolls: { type: Boolean, default: false },
        ecoFriendly: { type: Boolean, default: false }
    },
    savedRoutes: [
        {
            name: String,
            waypoints: [String],
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
