const express = require('express');
const { tsp } = require('./tsp');

const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/tsp', (req, res) => {
    try {
        const { graph } = req.body;

        if (!graph || !Array.isArray(graph) || graph.length === 0) {
            return res.status(400).json({ error: 'Invalid input graph' });
        }

        const result = tsp(graph);
        res.json({
            shortestRouteCost: result.cost,
            route: result.route
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`TSP API is running at http://localhost:${PORT}`);
});
