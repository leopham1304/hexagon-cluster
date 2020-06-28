import React from "react";
import { HexGrid, Layout, Hexagon, Text } from "react-hexgrid";
import PropTypes from "prop-types";
import "./HexagonGrid.css";

const HexagonGrid = ({ hexagonList }) => (
  <HexGrid width="100%" height={1000} viewBox="-50 -50 100 100">
    <Layout
      className="tiles"
      size={{ x: 8, y: 8 }}
      flat={true}
      spacing={1.005}
      origin={{ x: 0, y: 0 }}
    >
      {hexagonList.map((hex, i) => (
        <Hexagon key={i} q={hex.x} r={hex.z} s={hex.y} data={hex}>
          <Text className="name">{hex.name}</Text>
        </Hexagon>
      ))}
    </Layout>
  </HexGrid>
);

HexagonGrid.propTypes = {
  hexagonList: PropTypes.PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HexagonGrid;
