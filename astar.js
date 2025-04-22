class Node {
    constructor(city, cost, heuristic, path) {
        this.city = city;
        this.cost = cost;
        this.heuristic = heuristic;
        this.total = cost + heuristic;
        this.path = path;
    }
}

const heuristic = (current, goal, graph) => {
    if (
        current === undefined ||
        goal === undefined ||
        !graph[current] ||
        !graph[current][goal]
    ) return Infinity;

    return graph[current][goal];
};

const adjustCost = (from, to, baseCost, preference, fitnessPaths = [], trafficPaths = [], trafficDelays = []) => {
    switch (preference) {
        case "fitness":
            return fitnessPaths.some(([a, b]) =>
                (a === from && b === to) || (a === to && b === from)
            ) ? baseCost * 0.7 : baseCost;

        case "eco":
            return trafficPaths.some(([a, b]) =>
                (a === from && b === to) || (a === to && b === from)
            ) ? baseCost * 1.2 : baseCost * 0.9;

        case "time-sensitive":
            return baseCost + (trafficDelays?.[from]?.[to] || 0);

        default:
            return baseCost;
    }
};

function aStar(graph, start, goal, preference = "default", fitnessPaths = [], trafficDelays = [], trafficPaths = []) {
    const n = graph.length;

    if (start < 0 || goal < 0 || start >= n || goal >= n) {
        return { error: "Start or goal node is out of bounds", cost: Infinity, path: [] };
    }

    const openSet = [new Node(start, 0, heuristic(start, goal, graph), [start])];
    const visited = new Set();

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.total - b.total);
        const current = openSet.shift();

        if (current.city === goal) {
            return { cost: current.cost, path: current.path };
        }

        visited.add(current.city);

        for (let next = 0; next < n; next++) {
            if (graph[current.city][next] !== 0 && !visited.has(next)) {
                const baseCost = graph[current.city][next];
                const adjustedCost = adjustCost(current.city, next, baseCost, preference, fitnessPaths, trafficPaths, trafficDelays);
                let newCost = current.cost + adjustedCost;
                let newPath = [...current.path, next];

                if (
                    preference === "time-sensitive" &&
                    trafficDelays?.[current.city]?.[next] > 1 &&
                    !current.path.includes("BREAK")
                ) {
                    newPath.splice(newPath.length - 1, 0, "BREAK");
                    newCost += 1;
                }

                const newNode = new Node(
                    next,
                    newCost,
                    heuristic(next, goal, graph),
                    newPath
                );

                openSet.push(newNode);
            }
        }
    }

    return { cost: Infinity, path: [] };
}

module.exports = { aStar };
