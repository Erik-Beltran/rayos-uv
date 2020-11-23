import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import Graficas from "../Graficas/Graficas";
import Recomendaciones from "../Recomendaciones/Recomendaciones";
import Spinner from "@bit/nexxtway.react-rainbow.spinner";
import Definicion from "../Definicion/Definicion";


const meses = [
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

const mensajes = {
  bajo: "Es un indice Uv Bajo. Puede permanecer en el exterior sin riesgo",
  moderado: "Es un indice Uv Moderado. Necesita protección",
  alto: "Es un indice Uv Alto. Necesita proteccion máxima",
  muyAlto: "Es un indice Uv Muy Alto. Necesita proteccion máxima",
  extremo: "Es un indice Uv Extremo. Evite exponerse al sol"
}

class Main extends Component {
  componentDidMount() {
    this.socket = io();
    this.getRegistros()
    const width =
      document.body.clientWidth < 767 ? document.body.clientWidth - 20 : 600;
    this.setState({
      width,
    });

    setTimeout(() => {
      const fecha = new Date()
      let dia = fecha.getDate().toString()
      let mes = meses[fecha.getMonth()];
      let año = fecha.getFullYear()
      console.log(dia, mes, año)
      console.log("in if");
      console.log("registros", this.state.registros)
      const datosHoy = this.state.registros.filter(
        (registro) =>
          registro.dia === dia && registro.año === año && registro.mes === mes
      );
      console.log("registros hoy", datosHoy);
      datosHoy.forEach((element) => {

        this.setState(prevState => ({
          data: [...prevState.data, { x: element.hora, y: element.indice }]
        }))
      });

      console.log("data", this.state.data)
    }, 500);

  }

  // componentDidUpdate(prevState) {

  //   if (this.state.registros !== prevState.registros) {
  //     const fecha = new Date()
  //     let dia = fecha.getDate().toString()
  //     let mes = meses[fecha.getMonth()];
  //     let año = fecha.getFullYear()
  //     console.log(dia, mes, año)
  //     console.log("in if");
  //     console.log("registros", this.state.registros)
  //     const datosHoy = this.state.registros.filter(
  //       (registro) =>
  //         registro.dia === dia && registro.año === año && registro.mes === mes
  //     );
  //     console.log("registros hoy", datosHoy);
  //     datosHoy.forEach((element) => {

  //       this.setState(prevState => ({
  //         data: [...prevState.data, { x: element.hora, y: element.indice }]
  //       }))

  //     });
  //   }
  // }

  state = {
    showSpinner: false,
    showIndice: false,
    indice: "",
    showCompleted: false,
    showGrafica: false,
    width: "",
    registros: [],

    data: []
  };

  handleSubmit = (e) => {
    this.socket.on("connect", () => {
      console.log("conect ");
    });
    const fecha = new Date();
    this.setState({
      showSpinner: true,
      showIndice: false,
    });
    var newIndex;
    this.socket.on("indice", (data) => {
      console.log("data type", data);
      newIndex = data;
    });
    console.log("new indice", newIndex)
    setTimeout(() => {
      this.setState({
        indice: Math.round(Number(newIndex)),
        showSpinner: false,
        showIndice: !this.state.showIndice,
        showGrafica: true,
      });
      console.log("indice state", this.state.indice)

      this.socket.emit("calcular", true);
      const body = {
        id: Date.now(),
        ciudad: "Medellín",
        año: fecha.getFullYear(),
        mes: meses[fecha.getMonth()],
        dia: fecha.getDate(),
        hora: `${fecha.getHours()}:${fecha.getMinutes()}`,
        indice: this.state.indice,
      };
      this.setState(prevState => ({
        data: [...prevState.data, { x: `${fecha.getHours()}:${fecha.getMinutes()}`, y: this.state.indice }]
      }))

      this.sendRegistro(body);
      this.getRegistros();
    }, 5000);
  };

  getRegistros = async () => {
    try {
      const registros = await axios.get("/registros");
      console.log("los", registros.data);
      this.setState({
        registros: registros.data,
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
      return colors.bajo
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
  mensaje = () => {

    const { indice } = this.state;
    if (indice >= 0 && indice <= 2) {
      return mensajes.bajo
    }
    if (indice >= 3 && indice <= 5) {
      return mensajes.moderado
    }
    if (indice >= 6 && indice <= 7) {
      return mensajes.alto
    }
    if (indice >= 8 && indice <= 10) {
      return mensajes.muyAlto
    }
    if (indice >= 11) {
      return mensajes.extremo
    }
  };

  render() {
    const {
      showSpinner,
      showIndice,
      showGrafica,
      width,
      registros,
      indice,
      data
    } = this.state;
    console.log(this.state.showSpinner);
    const colorIndex = this.color();

    const info = this.mensaje();
    console.log("info", info)
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
                <p
                  style={{ color: colorIndex }}
                  className="info">
                  {info}
                </p>
              </div>
            )}
          </div>
          <Graficas
            showGrafica={showGrafica}
            width={width}
            registros={registros}
            data={data}
          />
        </div>
        {
          showGrafica &&
          <Recomendaciones indice={indice} />
        }
        <Definicion />
      </div>
    );
  }
}

export default Main;
