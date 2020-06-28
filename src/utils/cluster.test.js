import Cluster from "./cluster.js";

describe("Cluster", () => {
  const cluster = new Cluster();

  it("should add the Hexagon correctly", () => {
    cluster.addHexagon("Ax");
    expect(cluster.getAdjList()).toEqual({ Ax: {} });
  });

  it("should add the edge correctly", () => {
    cluster.addHexagon("Ax");
    cluster.addHexagon("Bx");
    cluster.addEdge("Ax", "Bx", 2);
    expect(cluster.getAdjList()).toEqual({
      Ax: { "2": "Bx" },
      Bx: { "5": "Ax" },
    });
  });

  it("should set the coordinates correctly", () => {
    cluster.addHexagon("Ax");
    cluster.addHexagon("Bx");
    // cluster.addEdge("Ax", "Bx", 2);
    cluster.setHexagonCoordinate("Ax", "Bx", 2);
    expect(cluster.getCoordinateMap()).toEqual({
      Ax: {
        name: "Ax",
        x: 0,
        y: 0,
        z: 0,
      },
      Bx: {
        name: "Bx",
        x: 1,
        y: -1,
        z: 0,
      },
    });
  });

  it("link the hexagons correctly", () => {
    cluster.addHexagon("Ax");
    cluster.addHexagon("Bx");
    cluster.linkHexagons("Ax", "Bx", 2);
    expect(cluster.getAdjList()).toEqual({
      Ax: { "2": "Bx" },
      Bx: { "5": "Ax" },
    });
    expect(cluster.getCoordinateMap()).toEqual({
      Ax: {
        name: "Ax",
        x: 0,
        y: 0,
        z: 0,
      },
      Bx: {
        name: "Bx",
        x: 1,
        y: -1,
        z: 0,
      },
    });
  });

  it("remove the hexagon correctly", () => {
    cluster.addHexagon("Ax");
    cluster.addHexagon("Bx");
    cluster.linkHexagons("Ax", "Bx", 2);
    cluster.addHexagon("Cx");
    cluster.linkHexagons("Bx", "Cx", 2);
    expect(cluster.removeHexagon("Bx")).toBe(false);
    expect(cluster.removeHexagon("Ax")).toBe(true);
    expect(cluster.getAdjList()).toEqual({
      Bx: { 2: "Cx" },
      Cx: { 5: "Bx"}
    });
  });
});
