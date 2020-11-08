import React, { Component } from 'react'
import io from 'socket.io-client';
import './graficas.css'
import {
    XYPlot,
    LineMarkSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
} from "react-vis";

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
    }


    state = {
        showSpinner: false,
        indice: "",
        showCompleted: false,
        showGrafica: false,
        width:""
    }

    handleSubmit = (e) => {
        const width = document.body.clientWidth < 767 ?  document.body.clientWidth -20: 600 
console.log(width)
        console.log("hola")
        this.setState({
            showSpinner: !this.state.showSpinner,
            showGrafica: true,
            width

        })

        this.socket.on('connect', () => {
            console.log("conect ")
        });


    }
    handleChecked = (e) => {
        this.setState({
            showCompleted: !this.state.showCompleted
        })
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

        const { showSpinner, showCompleted, showGrafica, width } = this.state
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
                    {!showSpinner &&
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
                    {showCompleted && <Table />}
                </div>
            </div>

        )
    }
}

const Table = () => {
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
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Graficas;
