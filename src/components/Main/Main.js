import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios'
import Graficas from '../Graficas/Graficas';
import Recomendaciones from '../Recomendaciones/Recomendaciones';
import Spinner from "@bit/nexxtway.react-rainbow.spinner";
import Definicion from '../Definicion/Definicion';

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
    "Diciembre"
]
const colors = {
    bajo: "#42be5c",
    moderado: "#e9b842",
    alto: "#f1854b",
    muyAlto: "#f2375a",
    extremo: "#4f4368"
}

class Main extends Component {

    componentDidMount() {
        this.socket = io(); // 1. Handshake with the server
        // console.log("indice", this.state.indice)
        // this.socket.on('indice', (data) => {
        //     console.log(data)
        //     this.setState({
        //         indice: data
        //     })
        // })
        this.getRegistros()
    }

    state = {
        showSpinner: false,
        showIndice: false,
        indice: "",
        showCompleted: false,
        showGrafica: false,
        width: "",
        registros: []
    }

    handleSubmit = (e) => {
        this.setState({
            showSpinner: true,
            showIndice: false
        })
        setTimeout(
            () => {
                this.setState({
                    showSpinner: false,
                    showIndice: !this.state.showIndice
                })
            }, 3000);
        //const fecha = new Date();
        const width = document.body.clientWidth < 767 ? document.body.clientWidth - 20 : 600
        console.log(width)
        console.log("hola")
        this.setState({
            //showSpinner: !this.state.showSpinner,
            showGrafica: true,
            width
        })

        this.socket.on('connect', () => {
            console.log("conect ")
        });

        this.socket.emit('calcular', true)

        // let id = Date.now().toString()
        // let city = "medellin"
        // //let year = fecha.getFullYear().toString();
        // let month = meses[fecha.getMonth()];
        // let day = fecha.getDate().toString();
        // let hour = fecha.getHours();
        // let minutes = fecha.getMinutes()
        // let fechaString = `${hour}:${minutes}`
        // console.log({ id, city, month, day, hour, minutes, fechaString })
        // this.sendRegistro(id, city, fecha.getFullYear(), month, day, fechaString, "4")
        this.getRegistros()
    }

    getRegistros = async () => {
        try {
            const registros = await axios.get('/registros')
            console.log("los", registros.data)
            this.setState({
                registros: registros.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    sendRegistro = async (id, city, year, month, day, hour, indice) => {
        try {
            const sendRegistro = await axios.post('/registros', {
                id,
                city,
                year,
                month,
                day,
                hour,
                indice
            })
            console.log(sendRegistro)
        } catch (error) {
            console.log(error)
        }
    }

    color = () => {
        const { indice } = this.state
        if (indice >= 0 && indice <= 2) {
            return colors.bajo;
        }
        if (indice >= 3 && indice <= 5) {
            return colors.moderado;
        }
        if (indice >= 6 && indice <= 7) {
            return colors.alto;
        } if (indice >= 8 && indice <= 10) {
            return colors.muyAlto
        }
        if (indice >= 11) {
            return colors.extremo;
        }
    }

    render() {

        const { showSpinner, showIndice, showGrafica, width, registros, indice } = this.state
        console.log(this.state.showSpinner)
        const colorIndex = this.color()
        return (
            <div>
                <div className="contenedor-graficas">
                    <div className="texts">
                        <h1 class="cover-heading ">CALCULA EL ÍNDICE DE RADIACIÓN UV:</h1>
                        <p class="lead font-weight-normal">Aquí puedes consultar el estado actual del índice de radiacíon.</p>
                        <button onClick={this.handleSubmit} type="button" class="btn btn-primary">CALCULAR</button>

                        {showSpinner &&
                            <div style={{ width: "auto", height: 100 }}>
                                <Spinner
                                    style={{
                                        position: "relative",
                                        height: 100,
                                        width: 100,
                                    }}
                                    size="large"
                                />
                            </div>}
                        {showIndice &&
                            <div>
                                <input style={{ color: colorIndex }} className="indice" value={this.state.indice}></input>
                            </div>
                        }
                        {/* <p style={{ color: colors.bajo }}>BAJO</p>
                        <p style={{ color: colors.moderado }}>MODERADO</p>
                        <p style={{ color: colors.alto }}>ALTO</p>
                        <p style={{ color: colors.muyAlto }}>MUY ALTO</p>
                        <p style={{ color: colors.extremo }}>EXTREMO</p> */}

                    </div>
                    <Graficas showGrafica={showGrafica} width={width} registros={registros} />
                </div>
                {
                    showGrafica && <Recomendaciones indice={indice} />
                }
                <Definicion />
            </div>

        );
    }
}

export default Main;
