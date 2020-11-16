import React, { Component } from "react";
import io from "socket.io-client";
import "./graficas.css";
import {
  XYPlot,
  LineMarkSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from "react-vis";

class Graficas extends Component {
  state = {
    showIndice: false,
    indice: "",
    showCompleted: false,
    showGrafica: false,
    width: "",
    registros: [],
  };
  componentDidMount() {
    this.socket = io(); // 1. Handshake with the server
    console.log("indice", this.state.indice);
    this.socket.on("indice", (data) => {
      console.log(data);
      this.setState({
        indice: data,
      });
    });
    this.getRegistros();
  }

  handleChecked = (e) => {
    this.setState({
      showCompleted: !this.state.showCompleted,
    });
  };

  render() {
    const data = [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 8, y: 2 },
      { x: 9, y: 0 },
    ];

    const { showCompleted } = this.state;
    const { showGrafica, width } = this.props;
    return (
      <>
        <div className="grafica">
          {showGrafica && (
            <div className="showGrafica">
              <XYPlot width={width} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis
                  title="Hora"
                  style={{ text: { fontSize: "red" } }}
                  position="middle"
                  className="x"
                />
                <YAxis title=" Indice de Radiacion" position="middle" />
                <LineMarkSeries
                  className="linemark-series-example-2"
                  curve={"curveMonotoneX"}
                  style={{ transform: "rotate(-90)" }}
                  data={data}
                />
              </XYPlot>
            </div>
          )}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
              onChange={this.handleChecked}
              checked={this.state.showCompleted}
            />
            <label class="form-check-label" for="defaultCheck1">
              Mostrar todos los registros
            </label>
          </div>
          {showCompleted && <Table />}
        </div>
      </>
    );
  }
}

const Table = ({ array }) => {
  return (
    <table class="table table-hover table-bordered ">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Ciudad</th>
          <th scope="col">Año</th>
          <th scope="col">Mes</th>
          <th scope="col">Dia</th>
          <th scope="col">Hora</th>
          <th scope="col">Indice</th>
        </tr>
      </thead>
      <tbody>
        {array.map((registro) => (
          <tr>
            <td>{registro.ciudad}</td>
            <td>{registro.año}</td>
            <td>{registro.mes}</td>
            <td>{registro.dia}</td>
            <td>{registro.hora}</td>
            <td>{registro.indice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Graficas;
