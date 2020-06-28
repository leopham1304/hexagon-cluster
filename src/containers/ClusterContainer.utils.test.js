import { renderHook } from "@testing-library/react-hooks";
import {
  useChangeRootHexagonInput,
  useChangeTargetHexagonInput,
  useChangePositionInput,
  useSelectHexagon,
  useAddHexagon,
  useRemoveHexagon,
} from "./ClusterContainer.utils";
import Cluster from "../utils/cluster";

const setRootHexagonInput = jest.fn();
const setTargetHexagonInput = jest.fn();
const setPositionInput = jest.fn();
const setSelectedHexagon = jest.fn();
const setCluster = jest.fn();
const setHexagonList = jest.fn();

describe("ClusterContainter.utils", () => {
  describe("useChangeRootHexagonInput", () => {
    it("should work properly", () => {
      const {
        result: { current: onChangeRootHexagonInput },
      } = renderHook(() => useChangeRootHexagonInput({ setRootHexagonInput }));

      onChangeRootHexagonInput({ target: { value: "1" } });

      expect(setRootHexagonInput).toBeCalled();
    });
  });
  describe("useChangeTargetHexagonInput", () => {
    it("should work properly", () => {
      const {
        result: { current: onChangeTargetHexagonInput },
      } = renderHook(() =>
        useChangeTargetHexagonInput({ setTargetHexagonInput })
      );

      onChangeTargetHexagonInput({ target: { value: "1" } });

      expect(setTargetHexagonInput).toBeCalled();
    });
  });
  describe("useChangePositionInput", () => {
    it("should work properly", () => {
      const {
        result: { current: onChangePositionInput },
      } = renderHook(() => useChangePositionInput({ setPositionInput }));

      onChangePositionInput(1);

      expect(setPositionInput).toBeCalled();
    });
  });
  describe("useSelectHexagon", () => {
    it("should work properly", () => {
      const {
        result: { current: onChangeSelectedHexagon },
      } = renderHook(() => useSelectHexagon({ setSelectedHexagon }));

      onChangeSelectedHexagon(1);

      expect(setSelectedHexagon).toBeCalled();
    });
  });
  describe("useAddHexagon and useRemoveHexagon", () => {
    it("should work properly", () => {
      const cluster = new Cluster();
      const {
        result: { current: onAddHexagon },
      } = renderHook(() =>
        useAddHexagon({
          cluster,
          setCluster,
          setHexagonList,
          rootHexagonInput: "Ax",
          targetHexagonInput: "Bx",
          positionInput: 1,
        })
      );
      const {
        result: { current: onRemoveHexagon },
      } = renderHook(() =>
        useRemoveHexagon({
          cluster,
          setCluster,
          setHexagonList,
          selectedHexagon: "Ax",
          setSelectedHexagon,
        })
      );
      onAddHexagon();
      expect(cluster.getAdjList()).toEqual({
        Ax: {
          "1": "Bx",
        },
        Bx: {
          "4": "Ax",
        },
      });
      onRemoveHexagon();
      expect(cluster.getAdjList()).toEqual({
        Bx: {},
      });
    });
  });
});
