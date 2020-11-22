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
        const width = document.body.clientWidth < 767 ? document.body.clientWidth - 20 : 600
        this.setState({
            width
        })
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
        const fecha = new Date();
        this.setState({
            showSpinner: true,
            showIndice: false,
        })
        var newIndex;
        this.socket.on('indice', (data) => {
            console.log("data type", data)
            newIndex = data;
        })
        setTimeout(() => {

            this.setState({
                indice: Math.round(Number(newIndex)),
                showSpinner: false,
                showIndice: !this.state.showIndice,
                showGrafica: true,
            })


            // setTimeout(
            //     () => {
            //         this.setState({
            //             showSpinner: false,
            //             showIndice: !this.state.showIndice
            //         })
            //     }, 3000);


            // this.setState({
            //     showGrafica: true,
            // })

            this.socket.on('connect', () => {
                console.log("conect ")
            });
            this.socket.emit('calcular', true)
            const body = {
                id: Date.now(),
                ciudad: "Medellín",
                año: fecha.getFullYear(),
                mes: meses[fecha.getMonth()],
                dia: fecha.getDate(),
                hora: `${fecha.getHours()}:${fecha.getMinutes()}`,
                indice: this.state.indice
            }
            this.sendRegistro(body)
            this.getRegistros()
        }, 5000);
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

    sendRegistro = async (body) => {
        try {
            const sendRegistro = await axios.post('/registros', {
                body
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
                    </div>
                    <Graficas showGrafica={showGrafica} width={width} registros={registros} />
                </div>
                {
                    // showGrafica &&
                    <Recomendaciones indice={8} />
                }
                <Definicion />
            </div>

        );
    }
}

export default Main;
