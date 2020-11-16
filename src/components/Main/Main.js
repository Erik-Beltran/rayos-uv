import React, { Component } from "react";
import Graficas from "../Graficas/Graficas";
import Recomendaciones from "../Recomendaciones/Recomendaciones";
import Definicion from "../Definicion/Definicion";
import Spinner from "@bit/nexxtway.react-rainbow.spinner";
import axios from "axios";

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
class Main extends Component {
  state = {
    showSpinner: false,
    showGrafica: false,
    width: "",
    indice: "",
    registros: [],
    showIndice: false,
  };

  handleSubmit = (e) => {
    this.setState({
      showSpinner: true,
      showIndice: false,
    });
    setTimeout(() => {
      this.setState({
        showSpinner: false,
        showIndice: !this.state.showIndice,
      });
    }, 3000);
    const fecha = new Date();
    const width =
      document.body.clientWidth < 767 ? document.body.clientWidth - 20 : 600;
    console.log(width);
    console.log("hola");
    this.setState({
      //showSpinner: !this.state.showSpinner,
      showGrafica: true,
      width,
    });

    this.socket.on("connect", () => {
      console.log("conect ");
    });

    this.socket.emit("calcular", true);

    let id = Date.now().toString();
    let city = "medellin";
    //let year = fecha.getFullYear().toString();
    let month = meses[fecha.getMonth()];
    let day = fecha.getDate().toString();
    let hour = fecha.getHours();
    let minutes = fecha.getMinutes();
    let fechaString = `${hour}:${minutes}`;
    console.log({ id, city, month, day, hour, minutes, fechaString });
    this.sendRegistro(
      id,
      city,
      fecha.getFullYear(),
      month,
      day,
      fechaString,
      "4"
    );
    this.getRegistros();
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

  sendRegistro = async (id, city, year, month, day, hour, indice) => {
    try {
      const sendRegistro = await axios.post("/registros", {
        id,
        city,
        year,
        month,
        day,
        hour,
        indice,
      });
      console.log(sendRegistro);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { showSpinner, showGrafica, width, indice, showIndice } = this.state;
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
              <input className="indice" value={this.state.indice}></input>
            )}
          </div>
          <Graficas showGrafica={showGrafica} width={width} />
        </div>
        {showGrafica && <Recomendaciones indice={indice} />}
        <Definicion />
      </div>
    );
  }
}

export default Main;
