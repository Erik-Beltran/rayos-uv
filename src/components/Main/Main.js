import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import Graficas from "../Graficas/Graficas";
import Recomendaciones from "../Recomendaciones/Recomendaciones";
import Spinner from "@bit/nexxtway.react-rainbow.spinner";
import Definicion from "../Definicion/Definicion";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const colors = {
  bajo: "#42be5c",
  moderado: "#e9b842",
  alto: "#f1854b",
  muyAlto: "#f2375a",
  extremo: "#4f4368",
};

const messages = {
  bajo: "Es un indice Uv Bajo. Puede permanecer en el exterior sin riesgo",
  moderado: "Es un indice Uv Moderado. Necesita protección",
  alto: "Es un indice Uv Alto. Necesita proteccion máxima",
  muyAlto: "Es un indice Uv Muy Alto. Necesita proteccion máxima",
  extremo: "Es un indice Uv Extremo. Evite exponerse al sol",
};

class Main extends Component {
  componentDidMount() {
    this.socket = io();
    this.getRegistros();
    const width =
      document.body.clientWidth < 767 ? document.body.clientWidth - 20 : 600;
    this.setState({
      width,
    });

    setTimeout(() => {
      const date = new Date();
      let day = date.getDate().toString();
      let month = months[date.getMonth()];
      let año = date.getFullYear();
      const dayData = this.state.records.filter(
        (record) =>
          record.day === day && record.año === año && record.month === month
      );
      dayData.forEach((element) => {
        this.setState((prevState) => ({
          data: [...prevState.data, { x: element.hora, y: element.indice }],
        }));
      });
    }, 500);
  }

  state = {
    showSpinner: false,
    showIndice: false,
    indice: "",
    showCompleted: false,
    showGrafica: false,
    width: "",
    records: [],
    data: [],
  };

  handleSubmit = (e) => {
    this.socket.on("connect", () => {
      console.log("conect ");
    });
    const date = new Date();
    this.setState({
      showSpinner: true,
      showIndice: false,
    });
    var newIndex;
    this.socket.on("indice", (data) => {
      newIndex = data;
    });
    setTimeout(() => {
      this.setState({
        indice: Math.round(Number(newIndex)),
        showSpinner: false,
        showIndice: !this.state.showIndice,
        showGrafica: true,
      });

      this.socket.emit("calcular", true);
      const body = {
        id: Date.now(),
        ciudad: "Medellín",
        año: date.getFullYear(),
        mes: months[date.getMonth()],
        day: date.getDate(),
        hora: `${date.getHours()}:${date.getMinutes()}`,
        indice: this.state.indice,
      };
      this.setState((prevState) => ({
        data: [
          ...prevState.data,
          {
            x: `${date.getHours()}:${date.getMinutes()}`,
            y: this.state.indice,
          },
        ],
      }));

      this.sendRegistro(body);
      this.getRegistros();
    }, 5000);
  };

  getRegistros = async () => {
    try {
      const records = await axios.get("/registros");
      this.setState({
        records: records.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  sendRegistro = async (body) => {
    try {
      const sendRegistro = await axios.post("/registros", {
        body,
      });
      console.log(sendRegistro);
    } catch (error) {
      console.log(error);
    }
  };

  color = () => {
    const { indice } = this.state;
    if (indice >= 0 && indice <= 2) {
      return colors.bajo;
    }
    if (indice >= 3 && indice <= 5) {
      return colors.moderado;
    }
    if (indice >= 6 && indice <= 7) {
      return colors.alto;
    }
    if (indice >= 8 && indice <= 10) {
      return colors.muyAlto;
    }
    if (indice >= 11) {
      return colors.extremo;
    }
  };
  message = () => {
    const { indice } = this.state;
    if (indice >= 0 && indice <= 2) {
      return messages.bajo;
    }
    if (indice >= 3 && indice <= 5) {
      return messages.moderado;
    }
    if (indice >= 6 && indice <= 7) {
      return messages.alto;
    }
    if (indice >= 8 && indice <= 10) {
      return messages.muyAlto;
    }
    if (indice >= 11) {
      return messages.extremo;
    }
  };

  render() {
    const {
      showSpinner,
      showIndice,
      showGrafica,
      width,
      records,
      indice,
      data,
    } = this.state;
    const colorIndex = this.color();

    const info = this.message();
    return (
      <div>
        <div className="contenedor-graficas">
          <div className="texts">
            <h1 class="cover-heading ">CALCULA EL ÍNDICE DE RADIACIÓN UV:</h1>
            <p class="lead font-weight-normal">
              Aquí puedes consultar el estado actual del índice de radiacíon.
            </p>
            <button
              onClick={this.handleSubmit}
              type="button"
              class="btn btn-primary"
            >
              CALCULAR
            </button>

            {showSpinner && (
              <div style={{ width: "auto", height: 100 }}>
                <Spinner
                  style={{
                    position: "relative",
                    height: 100,
                    width: 100,
                  }}
                  size="large"
                />
              </div>
            )}
            {showIndice && (
              <div>
                <input
                  style={{ color: colorIndex }}
                  className="indice"
                  value={this.state.indice}
                ></input>
                <p style={{ color: colorIndex }} className="info">
                  {info}
                </p>
              </div>
            )}
          </div>
          <Graficas
            showGrafica={showGrafica}
            width={width}
            records={records}
            data={data}
          />
        </div>
        {showGrafica && <Recomendaciones indice={indice} />}
        <Definicion />
      </div>
    );
  }
}

export default Main;
