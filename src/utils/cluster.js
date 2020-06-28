export default class Cluster {
  constructor() {
    this.AdjList = {};
    this.CoordinateMap = {};
    this.CounterPositionMap = {
      0: 3,
      1: 4,
      2: 5,
      3: 0,
      4: 1,
      5: 2,
    };
  }

  getAdjList = () => {
    return this.AdjList;
  };

  setAdjList = adjList => {
    this.AdjList = adjList;
  }

  setCoordinateMap = coordinateMap => {
    this.CoordinateMap = coordinateMap;
  }
  
  getCoordinateMap = () => {
    return this.CoordinateMap;
  };

  // add an empty hexagon and create its coordinate
  addHexagon = (hexagon) => {
    if (!(hexagon in this.AdjList)) {
      this.AdjList[hexagon] = {};
      this.CoordinateMap[hexagon] = { name: hexagon, x: 0, y: 0, z: 0 };
      return true;
    }
    return false;
  };

  addEdge = (hexagon, targetHexagon, position) => {
    let isAdded = false;
    if (position > 5 || position < 0) {
      return isAdded;
    }
    const counterPosition = this.CounterPositionMap[position];
    if (hexagon in this.AdjList) {
      if (targetHexagon in this.AdjList) {
        let list1 = this.AdjList[hexagon];
        let list2 = this.AdjList[targetHexagon];
        if (!(position in list1)) {
          list1[position] = targetHexagon;
          isAdded = true;
        }
        if (!(counterPosition in list2)) {
          list2[counterPosition] = hexagon;
          isAdded = true;
        }
        return isAdded;
      } else {
        return isAdded;
      }
    } else {
      return isAdded;
    }
  };

  // set hexagon coord based on the position of the edge linked to another hexagon
  // hexagon: the root hexagon to be set. position: relative position linked to another hexagon
  setHexagonCoordinate = (rootHexagon, targetedHexagon, position) => {
    const targetedHexagonCoord = this.CoordinateMap[targetedHexagon];
    const rootHexagonCoord = this.CoordinateMap[rootHexagon];
    if (
      targetedHexagonCoord.x !== 0 &&
      (targetedHexagonCoord.y !== 0) & (targetedHexagonCoord.z !== 0)
    ) {
      return;
    }
    switch (position) {
      case 0:
        targetedHexagonCoord.x = rootHexagonCoord.x;
        targetedHexagonCoord.y = rootHexagonCoord.y + 1;
        targetedHexagonCoord.z = rootHexagonCoord.z - 1;
        break;
      case 1:
        targetedHexagonCoord.x = rootHexagonCoord.x + 1;
        targetedHexagonCoord.y = rootHexagonCoord.y;
        targetedHexagonCoord.z = rootHexagonCoord.z - 1;
        break;
      case 2:
        targetedHexagonCoord.x = rootHexagonCoord.x + 1;
        targetedHexagonCoord.y = rootHexagonCoord.y - 1;
        targetedHexagonCoord.z = rootHexagonCoord.z;
        break;
      case 3:
        targetedHexagonCoord.x = rootHexagonCoord.x;
        targetedHexagonCoord.y = rootHexagonCoord.y - 1;
        targetedHexagonCoord.z = rootHexagonCoord.z + 1;
        break;
      case 4:
        targetedHexagonCoord.x = rootHexagonCoord.x - 1;
        targetedHexagonCoord.y = rootHexagonCoord.y;
        targetedHexagonCoord.z = rootHexagonCoord.z + 1;
        break;
      case 5:
        targetedHexagonCoord.x = rootHexagonCoord.x - 1;
        targetedHexagonCoord.y = rootHexagonCoord.y + 1;
        targetedHexagonCoord.z = rootHexagonCoord.z;
        break;
      default:
        targetedHexagonCoord.x = 0;
        targetedHexagonCoord.y = 0;
        targetedHexagonCoord.z = 0;
    }
  };

  // call recursion to link the hexagons
  linkHexagons = (root, node, position) => {
    let leftNeighborPosition = position === 0 ? 5 : position - 1;
    let rightNeighborPosition = position === 5 ? 0 : position + 1;
    let leftNeighborHexagon = this.AdjList[root][leftNeighborPosition];
    let rightNeighborHexagon = this.AdjList[root][rightNeighborPosition];
    let isAdded = this.addEdge(root, node, position);
    if (isAdded) {
      this.setHexagonCoordinate(root, node, position);
    }
    if (leftNeighborHexagon && isAdded) {
      this.linkHexagons(leftNeighborHexagon, node, rightNeighborPosition);
    }
    if (rightNeighborHexagon && isAdded) {
      this.linkHexagons(rightNeighborHexagon, node, leftNeighborPosition);
    }
  };

  // traverse the graph
  bfs(cluster, startingHexagon, visited) {
    const q = [];
    visited[startingHexagon] = true;
    q.push(startingHexagon);
    while (q.length) {
      let current = q.pop();
      let list = cluster[current];
      for (let key of Object.keys(list)) {
        let hexagon = list[key];
        if (!visited[hexagon]) {
          visited[hexagon] = true;
          q.unshift(hexagon);
        }
      }
    }
  }

  // check if the cluster is connected using bfs
  isClusterConnected = (cluster) => {
    //if nothing is left in cluster, it is the last node => return true
    if (!Object.keys(cluster)[0]) {
      return true;
    }
    const visited = {};
    for (let key of Object.keys(cluster)) {
      visited[key] = false;
    }
    this.bfs(cluster, Object.keys(cluster)[0], visited);
    for (let v of Object.keys(visited)) {
      if (visited[v] === false) {
        return false;
      }
    }
    return true;
  };

  // remove the hexagon if the removal does not disconnect the graph
  removeHexagon = (hexagon) => {
    // deep clone the graph, adding O(n) space but avoid messing up order of hexagons
    const copiedAdjList = JSON.parse(JSON.stringify(this.AdjList));
    const copiedCoordMap = { ...this.CoordinateMap };
    delete copiedAdjList[hexagon];
    delete copiedCoordMap[hexagon];
    for (let key of Object.keys(copiedAdjList)) {
      const childMap = copiedAdjList[key];
      for (let childKey of Object.keys(childMap)) {
        if (childMap[childKey] === hexagon) {
          delete childMap[childKey];
        }
      }
    }
    if (this.isClusterConnected(copiedAdjList)) {
      this.AdjList = copiedAdjList;
      this.CoordinateMap = copiedCoordMap;
      return true;
    }
    return false;
  };
}
