import React from "react";
import Graficas from "../../components/Graficas/Graficas";
import { shallow } from "enzyme";
import cloneDeep from "lodash/cloneDeep";

describe("when the Graficas components has no data nor records", () => {
  const data = [];
  const width = 100;
  const records = [];
  const wrapper = shallow(
    <Graficas
      data={data}
      width={width}
      records={records}
      showCompleted={false}
    />
  );

  it("an image should be showend instead of the grafic", () => {
    const img = wrapper.find("img");
    const XYPlot = wrapper.find("XYPlot");
    expect(img.exists()).toBe(true);
    expect(XYPlot.exists()).toBe(false);
  });

  it("when hitting on the checkbox, should show table with no data", () => {
    wrapper.find("input").simulate("change", { target: { checked: true } });
    wrapper.update();
    const table = wrapper.find("Table").shallow();
    const dataTable = table.find("BootstrapTable").props().data;
    expect(dataTable).toEqual([]);
  });
});

describe("when the Graficas components has data and records", () => {
  const data = [
    { x: "6:30", y: 0 },
    { x: "7:30", y: 2 },
    { x: "8:30", y: 8 },
    { x: "9:30", y: 1 },
  ];
  const width = 100;
  const records = cloneDeep(require("../records.json"));
  const wrapper = shallow(
    <Graficas
      data={data}
      width={width}
      records={records}
      showCompleted={false}
    />
  );

  it("the grafic should be showend instead of the image", () => {
    const img = wrapper.find("img");
    const XYPlot = wrapper.find("XYPlot");
    expect(img.exists()).toBe(false);
    expect(XYPlot.exists()).toBe(true);
  });

  it("the grafics labels should be correct", () => {
    const XAxis = wrapper.find("XAxis");
    const YAxis = wrapper.find("YAxis");
    expect(XAxis.exists()).toBe(true);
    expect(YAxis.exists()).toBe(true);
    expect(XAxis.props().title).toEqual("Hora");
    expect(YAxis.props().title).toEqual("Indice de Radiacion");
  });

  it("the grafics data should be correct", () => {
    const dataGrafics = wrapper.find("LineMarkSeries").props().data;
    expect(dataGrafics).toEqual(data);
  });

  it("the grafics title should render and show the actual day", () => {
    const meses = cloneDeep(require("../months.json"));
    const fecha = new Date();
    const dia = fecha.getDate().toString();
    const mes = meses[fecha.getMonth()];
    const expectedMessage = `Valores de hoy ${dia} de ${mes}`;
    const h3Message = wrapper.find("h3").props().children;
    expect(h3Message).toEqual(expectedMessage);
  });

  it("when hitting on the checkbox, should show table with the correct data", () => {
    wrapper.find("input").simulate("change", { target: { checked: true } });
    wrapper.update();
    const table = wrapper.find("Table").shallow();
    const dataTable = table.find("BootstrapTable").props().data;
    expect(dataTable).toEqual(records);
  });

  it("should show table with the correct columns", () => {
    const table = wrapper.find("Table").shallow();
    const dataTable = table.find("BootstrapTable").props().children;
    expect(dataTable.length).toBe(7);
    const id = table.find("TableHeaderColumn").at(0).props().children;
    const city = table.find("TableHeaderColumn").at(1).props().children;
    const year = table.find("TableHeaderColumn").at(2).props().children;
    const month = table.find("TableHeaderColumn").at(3).props().children;
    const day = table.find("TableHeaderColumn").at(4).props().children;
    const hour = table.find("TableHeaderColumn").at(5).props().children;
    const index = table.find("TableHeaderColumn").at(6).props().children;
    expect(id).toEqual("Id");
    expect(city).toEqual("Ciudad");
    expect(year).toEqual("Año");
    expect(month).toEqual("Mes");
    expect(day).toEqual("Dia");
    expect(hour).toEqual("Hora");
    expect(index).toEqual("Indice");
  });

  it("shouldn't show tha ID column", () => {
    const table = wrapper.find("Table").shallow();
    const id = table.find("TableHeaderColumn").at(0).props().hidden;
    expect(id).toEqual(true);
  });
});
