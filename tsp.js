function tsp(graph) {
    const n = graph.length;
    const VISITED_ALL = (1 << n) - 1; 
    const dp = Array.from({ length: n }, () => Array(1 << n).fill(-1)); 
    const nextCity = Array.from({ length: n }, () => Array(1 << n).fill(-1)); 

    function visit(city, mask) {
        if (mask === VISITED_ALL) return graph[city][0] || Infinity;
        if (dp[city][mask] !== -1) return dp[city][mask]; 
       
        let minCost = Infinity;
        let bestNextCity = -1;

        for (let next = 0; next < n; next++) {
            if ((mask & (1 << next)) === 0 && graph[city][next] !== 0) {
                const cost = graph[city][next] + visit(next, mask | (1 << next));
                if (cost < minCost) {
                    minCost = cost;
                    bestNextCity = next; 
                }
            }
        }

        dp[city][mask] = minCost;
        nextCity[city][mask] = bestNextCity;
        return minCost;
    }

    function getRoute() {
        const route = [0]; 
        let mask = 1; 
        let currentCity = 0;

        while (route.length < n) {
            currentCity = nextCity[currentCity][mask];
            route.push(currentCity);
            mask |= (1 << currentCity);
        }

        route.push(0); 
        return route;
    }

    const cost = visit(0, 1);
    const route = getRoute();

    return { cost, route };
}

module.exports = { tsp };


