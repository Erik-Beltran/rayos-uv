import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios'
import './graficas.css'
import {
    XYPlot,
    LineMarkSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
} from "react-vis";


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

class Graficas extends Component {

    componentDidMount() {
        
        this.socket = io(); // 1. Handshake with the server
        console.log("indice", this.state.indice)
        this.socket.on('indice', (data) => {
            console.log(data)
            this.setState({
                indice: data
            })
        })
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
            showSpinner:true,
            showIndice:false
        })
        setTimeout(
        () => {
            this.setState({
                showSpinner:false,
                showIndice:!this.state.showIndice
            })
        }, 3000);
        const fecha = new Date();
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


        let id = Date.now().toString()
        let city = "medellin"
        //let year = fecha.getFullYear().toString();
        let month = meses[fecha.getMonth()];
        let day = fecha.getDate().toString();
        let hour = fecha.getHours();
        let minutes = fecha.getMinutes()
        let fechaString = `${hour}:${minutes}`
        console.log({ id, city, month, day, hour, minutes, fechaString })
        this.sendRegistro(id, city, fecha.getFullYear(), month, day, fechaString, "4")
        this.getRegistros()
    }
    handleChecked = (e) => {
        this.setState({
            showCompleted: !this.state.showCompleted
        })
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

    sendRegistro = async (id, city, year, month, day, hour, indice)  => {
        
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
            { x: 9, y: 0 }
        ];

        const { showSpinner, showIndice, showCompleted, showGrafica, width, registros } = this.state
        console.log(this.state.showSpinner)


        return (
            <div className="contenedor-graficas">
                <div className="texts">
                    <h1 class="cover-heading ">CALCULA EL ÍNDICE DE RADIACIÓN UV:</h1>
                    <p class="lead font-weight-normal">Aquí puedes consultar el estado actual del índice de radiacíon.</p>
                    <button onClick={this.handleSubmit} type="button" class="btn btn-primary">CALCULAR</button>

                    {showSpinner &&
                        <div class="lds-dual-ring"></div>
                    }
                    {showIndice &&
                        <input className="indice" value={this.state.indice}></input>
                    }
                </div>
                <div className="grafica">
                    {showGrafica && (
                        <div className="showGrafica">

                            <XYPlot width={width} height={300} >
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis title="Hora" style={{ text: { fontSize: "red" } }} position="middle" className="x" />
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
                        <input class="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                            onChange={this.handleChecked}
                            checked={this.state.showCompleted}
                        />
                        <label
                            class="form-check-label"
                            for="defaultCheck1">
                            Mostrar todos los registros
                        </label>

                    </div>
                    {showCompleted && <Table array={registros} />}
                </div>
            </div>
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
                {
                    array.map(registro => (
                        <tr>
                            <td>{registro.ciudad}</td>
                            <td>{registro.año}</td>
                            <td>{registro.mes}</td>
                            <td>{registro.dia}</td>
                            <td>{registro.hora}</td>
                            <td>{registro.indice}</td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default Graficas;
