import React from "react";
import HexagonGrid from "../components/HexagonGrid";
import { Select, Input, Button, InputNumber, Row, Col } from "antd";
import {
  useClusterContainer,
  useCreateCluster,
} from "./ClusterContainer.utils";
import "./ClusterContainer.css";

const { Option } = Select;

const ClusterContainer = () => {
  const {
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
    setHexagonList,
  } = useClusterContainer();

  useCreateCluster({ setCluster, setHexagonList });

  return (
    <div>
      <h2 className="clusterHeader">Covid Cluster</h2>
      <div>
        <Row
          gutter={[12, 12]}
          align="middle"
          justify="center"
          className="addHexagonWrapper"
        >
          <Col span={4}>
            <div id="label"> Root Hexagon </div>
            <Input
              value={rootHexagonInput}
              onChange={onChangeRootHexagonInput}
            />
          </Col>
          <Col span={4}>
            <div id="label"> Target Hexagon </div>
            <Input
              value={targetHexagonInput}
              onChange={onChangeTargetHexagonInput}
            />
          </Col>
          <Col span={1}>
            <div id="label"> Position </div>
            <InputNumber
              value={positionInput}
              onChange={onChangePositionInput}
              min={0}
              max={5}
            />
          </Col>
          <Col span={4}>
            <Button onClick={onAddHexagon}> Add Hexagon </Button>
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col span={3}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a hexagon"
              optionFilterProp="children"
              value={selectedHexagon}
              onChange={onSelectHexagon}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {hexagonList.map((hex) => (
                <Option value={hex.name} key={hex.name}>
                  {hex.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={1}>
            <Button onClick={onRemoveHexagon}> Remove Hexagon </Button>
          </Col>
        </Row>
      </div>
      <HexagonGrid hexagonList={hexagonList} />
    </div>
  );
};

export default ClusterContainer;
