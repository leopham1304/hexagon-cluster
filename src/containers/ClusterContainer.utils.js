import { useCallback, useEffect, useState } from "react";
import Cluster from "../utils/cluster";
import { getStorageWithExpiry, setStorageWithExpiry } from "../utils/index";

export const useCreateCluster = ({ setCluster, setHexagonList }) =>
  useEffect(() => {
    const savedCluster = getStorageWithExpiry("cluster");
    if (savedCluster) {
      const {CoordinateMap, AdjList} = savedCluster;
      const hexagons = Object.keys(CoordinateMap).map(
        (key) => CoordinateMap[key]
      );
      const cluster = new Cluster();
      cluster.setAdjList(AdjList);
      cluster.setCoordinateMap(CoordinateMap);
      setCluster(cluster);
      setHexagonList(hexagons);
      return;
    }
    const cluster = new Cluster();
    setCluster(cluster);
  }, []);

export const useChangeRootHexagonInput = ({ setRootHexagonInput }) =>
  useCallback(
    (event) => {
      setRootHexagonInput(event.target.value);
    },
    [setRootHexagonInput]
  );

export const useChangeTargetHexagonInput = ({ setTargetHexagonInput }) =>
  useCallback(
    (event) => {
      setTargetHexagonInput(event.target.value);
    },
    [setTargetHexagonInput]
  );

export const useChangePositionInput = ({ setPositionInput }) =>
  useCallback(
    (value) => {
      setPositionInput(value);
    },
    [setPositionInput]
  );

export const useSelectHexagon = ({ setSelectedHexagon }) =>
  useCallback(
    (value) => {
      setSelectedHexagon(value);
    },
    [setSelectedHexagon]
  );

export const useAddHexagon = ({
  cluster,
  setCluster,
  setHexagonList,
  rootHexagonInput,
  targetHexagonInput,
  positionInput,
}) =>
  useCallback(() => {
    if (!rootHexagonInput || !targetHexagonInput || !positionInput) {
      alert("Please fill all the boxes");
      return;
    }
    
    const isRootAdded = cluster.addHexagon(rootHexagonInput);
    const isTargetAdded = cluster.addHexagon(targetHexagonInput);

    if (isRootAdded || isTargetAdded) {
      cluster.linkHexagons(rootHexagonInput, targetHexagonInput, positionInput);
      const coordinateMap = cluster.getCoordinateMap();
      const hexagons = Object.keys(coordinateMap).map(
        (key) => coordinateMap[key]
      );

      setHexagonList(hexagons);
      setCluster(cluster);
      setStorageWithExpiry("cluster", cluster, 86400000); // set local storage with expiry time of 24 hours
    }
  }, [
    cluster,
    setCluster,
    setHexagonList,
    rootHexagonInput,
    targetHexagonInput,
    positionInput,
  ]);

export const useRemoveHexagon = ({
  cluster,
  setCluster,
  setHexagonList,
  selectedHexagon,
  setSelectedHexagon,
}) =>
  useCallback(() => {
    const isRemoved = cluster.removeHexagon(selectedHexagon);

    if (isRemoved) {
      const coordinateMap = cluster.getCoordinateMap();
      const hexagons = Object.keys(coordinateMap).map(
        (key) => coordinateMap[key]
      );

      setSelectedHexagon("");
      setHexagonList(hexagons);
      setCluster(cluster);
      setStorageWithExpiry("cluster", cluster, 86400000); // set local storage with expiry time of 24 hours
    } else {
      alert("You cannot remove a hexagon which is the only link between different hexagons.")
    }
  }, [
    cluster,
    setCluster,
    setHexagonList,
    selectedHexagon,
    setSelectedHexagon,
  ]);

export const useClusterContainer = () => {
  const [cluster, setCluster] = useState({});
  const [hexagonList, setHexagonList] = useState([]);
  const [selectedHexagon, setSelectedHexagon] = useState("");
  const [rootHexagonInput, setRootHexagonInput] = useState("");
  const [targetHexagonInput, setTargetHexagonInput] = useState("");
  const [positionInput, setPositionInput] = useState("");

  const onChangeRootHexagonInput = useChangeRootHexagonInput({
    setRootHexagonInput,
  });
  const onChangeTargetHexagonInput = useChangeTargetHexagonInput({
    setTargetHexagonInput,
  });
  const onChangePositionInput = useChangePositionInput({ setPositionInput });
  const onAddHexagon = useAddHexagon({
    cluster,
    setCluster,
    setHexagonList,
    rootHexagonInput,
    targetHexagonInput,
    positionInput,
  });
  const onSelectHexagon = useSelectHexagon({ setSelectedHexagon });
  const onRemoveHexagon = useRemoveHexagon({
    cluster,
    setCluster,
    setHexagonList,
    selectedHexagon,
    setSelectedHexagon,
  });

  return {
    hexagonList,
    onChangeRootHexagonInput, 
    onChangeTargetHexagonInput,
    onChangePositionInput,
    onAddHexagon,
    onSelectHexagon,
    onRemoveHexagon,
    setCluster, 
    rootHexagonInput,
    targetHexagonInput,
    positionInput,
    selectedHexagon,
    setHexagonList
  }
}