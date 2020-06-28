import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import HexagonGrid from "./HexagonGrid.jsx";

describe("HexagonGrid", () => {
  const wrapper = shallow(<HexagonGrid hexagonList={[{name: "test", x: 1, y:2, z:3}]} />);

  it("should render the HexagonGrid Component correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
