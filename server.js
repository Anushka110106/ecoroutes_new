require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { aStar } = require("./astar/index");
const tsp = require("./travelsalesman/index");

const app = express();
const PORT = 10000;

app.use(express.json());
app.use(cors());

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; 

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/astar", (req, res) => {
    const { graph, start, goal } = req.body;

    if (!graph || !Array.isArray(graph) || graph.length === 0 || start === undefined || goal === undefined) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const result = aStar(graph, start, goal);
    res.json({
        shortestPathCost: result.cost,
        route: result.path,
    });
});

app.post("/tsp", (req, res) => {
    const { graph } = req.body;

    if (!graph || !Array.isArray(graph) || graph.length === 0) {
        return res.status(400).json({ error: "Invalid input graph" });
    }

    const result = tsp(graph);
    res.json({
        shortestRouteCost: result.cost,
        route: result.route,
    });
});

app.post("/directions", async (req, res) => {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required" });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
            params: {
                origin,
                destination,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === "OK") {
            return res.json(response.data);
        } else {
            return res.status(400).json({ error: response.data.error_message });
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch directions" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
