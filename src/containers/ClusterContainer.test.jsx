import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ClusterContainer from "./ClusterContainer.jsx";

describe("ClusterContainer", () => {
  const wrapper = shallow(<ClusterContainer />);

  it("should render the ClusterContainer Component correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
