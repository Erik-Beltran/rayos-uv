import React from "react";
import Definicion from "../../components/Definicion/Definicion";
import { shallow } from "enzyme";

describe("when the Definicion components is render", () => {
  const wrapper = shallow(<Definicion />);

  it("should render correctly", () => {
    const definicion = wrapper.find(".container-definicion");
    expect(definicion.exists()).toBe(true);
  });
});
