import React from "react";
import Recomendaciones from "../../components/Recomendaciones/Recomendaciones";
import { shallow } from "enzyme";
import cloneDeep from "lodash/cloneDeep";

describe("When the Recomendaciones components recieves the index", () => {
  const messages = cloneDeep(require("../messages.json"));

  it("should render correctly", () => {
    const indice = 0;
    const wrapper = shallow(<Recomendaciones indice={indice} />);
    const component = wrapper.find(".contenedor-recomendaciones");
    expect(component.exists()).toBe(true);
  });

  it("should show the correct info if index is 0", () => {
    const indice = 0;
    const wrapper = shallow(<Recomendaciones indice={indice} />);
    const img1 = wrapper.find("img").at(0).props().alt;
    const img2 = wrapper.find("img").at(1).props().alt;
    expect(img1).toEqual(messages[0]);
    expect(img2).toEqual(messages[1]);
  });

  it("should show the correct info if index is 4", () => {
    const indice = 4;
    const wrapper = shallow(<Recomendaciones indice={indice} />);
    const img1 = wrapper.find("img").at(0).props().alt;
    const img2 = wrapper.find("img").at(1).props().alt;
    const img3 = wrapper.find("img").at(2).props().alt;
    expect(img1).toEqual(messages[0]);
    expect(img2).toEqual(messages[1]);
    expect(img3).toEqual(messages[2]);
  });

  it("should show the correct info if index is 8", () => {
    const indice = 8;
    const wrapper = shallow(<Recomendaciones indice={indice} />);
    const img1 = wrapper.find("img").at(0).props().alt;
    const img2 = wrapper.find("img").at(1).props().alt;
    const img3 = wrapper.find("img").at(2).props().alt;
    const img4 = wrapper.find("img").at(3).props().alt;
    const img5 = wrapper.find("img").at(4).props().alt;

    expect(img1).toEqual(messages[0]);
    expect(img2).toEqual(messages[3]);
    expect(img3).toEqual(messages[1]);
    expect(img4).toEqual(messages[2]);
    expect(img5).toEqual(messages[4]);
  });

  it("should show the correct info if index is 12", () => {
    const indice = 12;
    const wrapper = shallow(<Recomendaciones indice={indice} />);
    const img1 = wrapper.find("img").at(0).props().alt;
    expect(img1).toEqual(messages[0]);
  });
});
