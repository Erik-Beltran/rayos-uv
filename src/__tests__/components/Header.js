import React from "react";
import Header from "../../components/Header/Header";
import { shallow } from "enzyme";

describe("when the Header components is render", () => {
  const wrapper = shallow(<Header />);

  it("should render correctly", () => {
    const header = wrapper.find(".contenedor-header");
    expect(header.exists()).toBe(true);
  });
});
