import React from "react";
import Main from "../../components/Main/Main";
import { shallow } from "enzyme";

jest.useFakeTimers();

describe("When starting Main", () => {
  const sendRegistro = jest.fn();
  const wrapper = shallow(<Main sendRegistro={sendRegistro} />);

  it("should render correctly", () => {
    const main = wrapper.find(".contenedor-graficas");
    expect(main.exists()).toBe(true);
  });

  it("should show the calculate index button", () => {
    const indexButton = wrapper.find("button").at(0);
    expect(indexButton.exists()).toBe(true);
  });

  it("when hitting the button should show spinner", () => {
    const indexButton = wrapper.find("button").at(0);
    indexButton.simulate("click");
    const spinner = wrapper.find("Spinner");
    expect(spinner.exists()).toBe(true);
  });

  it("when hitting the button setTiemout should work for 5 seconds", () => {
    const indexButton = wrapper.find("button").at(0);
    indexButton.simulate("click");
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

  describe("And State is setted", () => {
    it("Should show index value in a input", () => {
      const expectedIndex = 2;
      wrapper.setState({
        showIndice: true,
        indice: 2,
      });
      const indexCircle = wrapper.find("input");
      const indexValue = indexCircle.props().value;
      expect(indexCircle.exists()).toBe(true);
      expect(indexValue).toEqual(expectedIndex);
    });

    describe("should show the recomendation and correct message", () => {
      wrapper.setState({
        showIndice: true,
        showGrafica: true,
      });
      const expectedMessage = [
        "Es un indice Uv Bajo. Puede permanecer en el exterior sin riesgo",
        "Es un indice Uv Moderado. Necesita protección",
        "Es un indice Uv Alto. Necesita proteccion máxima",
        "Es un indice Uv Muy Alto. Necesita proteccion máxima",
        "Es un indice Uv Extremo. Evite exponerse al sol",
      ];

      it("if the value of index is 0", () => {
        wrapper.setState({
          indice: 0,
        });
        const indexMessage = wrapper.find(".info");
        const recomendations = wrapper.find("Recomendaciones");
        const message = indexMessage.props().children;

        expect(indexMessage.exists()).toBe(true);
        expect(recomendations.exists()).toBe(true);
        expect(message).toEqual(expectedMessage[0]);
      });

      it("if the value of index is 4", () => {
        wrapper.setState({
          indice: 4,
        });
        const indexMessage = wrapper.find(".info");
        const recomendations = wrapper.find("Recomendaciones");
        const message = indexMessage.props().children;

        expect(indexMessage.exists()).toBe(true);
        expect(recomendations.exists()).toBe(true);
        expect(message).toEqual(expectedMessage[1]);
      });

      it("if the value of index is 7", () => {
        wrapper.setState({
          indice: 7,
        });
        const indexMessage = wrapper.find(".info");
        const recomendations = wrapper.find("Recomendaciones");
        const message = indexMessage.props().children;

        expect(indexMessage.exists()).toBe(true);
        expect(recomendations.exists()).toBe(true);
        expect(message).toEqual(expectedMessage[2]);
      });

      it("if the value of index is 8", () => {
        wrapper.setState({
          indice: 8,
        });
        const indexMessage = wrapper.find(".info");
        const recomendations = wrapper.find("Recomendaciones");
        const message = indexMessage.props().children;

        expect(indexMessage.exists()).toBe(true);
        expect(recomendations.exists()).toBe(true);
        expect(message).toEqual(expectedMessage[3]);
      });

      it("if the value of index is 12", () => {
        wrapper.setState({
          indice: 12,
        });
        const indexMessage = wrapper.find(".info");
        const recomendations = wrapper.find("Recomendaciones");
        const message = indexMessage.props().children;

        expect(indexMessage.exists()).toBe(true);
        expect(recomendations.exists()).toBe(true);
        expect(message).toEqual(expectedMessage[4]);
      });
    });
  });

  describe("And looking at the grafics area", () => {
    const Graficas = wrapper.find("Graficas").shallow();

    it("should show the checkbox to se all records", () => {
      const checkboxRecords = Graficas.find("input");
      expect(checkboxRecords.exists()).toBe(true);
    });

    it("checkbox should be false by default", () => {
      const checkboxRecords = Graficas.find("input");
      const checked = checkboxRecords.props().checked;
      expect(checked).toEqual(false);
    });

    it("when hitting on the checkbox, should show table", () => {
      expect(Graficas.find("Table").exists()).toBe(false);
      Graficas.find("input").simulate("change", { target: { checked: true } });
      Graficas.update();
      const checkboxRecords = Graficas.find("input");
      const checked = checkboxRecords.props().checked;
      expect(Graficas.find("Table").exists()).toBe(true);
      expect(checked).toEqual(true);
    });
  });
});
