const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function getTrafficDelay(origin, destination) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&departure_time=now&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const element = data.rows[0]?.elements[0];

        if (element?.duration && element?.duration_in_traffic) {
            const normalTime = element.duration.value; 
            const trafficTime = element.duration_in_traffic.value;

            const delayInSeconds = trafficTime - normalTime;
            return delayInSeconds > 0 ? delayInSeconds / 60 : 0; 
        } else {
            console.warn("No traffic data found for this route.");
        }
    } catch (error) {
        console.error("Google Maps API error:", error.message);
    }

    return 0;
}

module.exports = { getTrafficDelay };
