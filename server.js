console.log("🔄 Starting server.js...");

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
console.log("✅ dotenv loaded");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
console.log("🛠 PORT:", PORT);
console.log("🌐 MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("✅ MongoDB Connected");

    // Health Check Route
    app.get('/', (req, res) => {
        res.send('✅ Server is live!');
    });

    // Import Routes
    const userRoutes = require('./routes/userRoutes.js');
    app.use('/api/users', userRoutes);

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});
