import React from "react";
import Footer from "../../components/Footer/Footer";
import { shallow } from "enzyme";

describe("when the Footer components is render", () => {
  const wrapper = shallow(<Footer />);

  it("should render correctly", () => {
    const footer = wrapper.find(".contenedor-footer");
    expect(footer.exists()).toBe(true);
  });
});
