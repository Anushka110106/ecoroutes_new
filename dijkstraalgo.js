function dijkstra(graph, start) {
    const distances = {}; 
    const visited = new Set(); 
    const previous = {}; 
    const queue = Object.keys(graph); 

    queue.forEach(node => {
        distances[node] = node === start ? 0 : Infinity;
    });

    while (queue.length > 0) {
        const current = queue.reduce((minNode, node) => 
            distances[node] < distances[minNode] ? node : minNode, queue[0]);
        queue.splice(queue.indexOf(current), 1);
        visited.add(current);
        for (const neighbor in graph[current]) {
            if (!visited.has(neighbor)) {
                const newDistance = distances[current] + graph[current][neighbor];
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = current;
                }
            }
        }
    }

    return { distances, previous };
}

module.exports = dijkstra;
