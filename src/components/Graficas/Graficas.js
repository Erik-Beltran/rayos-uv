import React, { useEffect, useState } from 'react'

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
const Graficas = ({ registros, width }) => {

    const [data, setData] = useState([])
    const [showCompleted, setShowCompleted] = useState(false)
    const fecha = new Date()
    const dia = fecha.getDate().toString()
    const mes = meses[fecha.getMonth()]
    const año= fecha.getFullYear()
    console.log("reg", registros)
    const handleChecked = (e) => {
        setShowCompleted(!showCompleted)
    }

    useEffect(() => {
        console.log("object")
        console.log("reg effect", registros)
        console.log("dia", dia)
        const datosHoy = registros.filter(registro => registro.dia === dia && registro.año === año && registro.mes === mes)
        console.log("hoy",datosHoy)
        datosHoy.forEach(element => {
            setData([...data, { x: element.hora, y: element.indice }])
        });
    }, [data, dia, registros])

    return (
        <>
            <div className="grafica">
                <h3>{`Valores de hoy ${dia} de ${mes}`}</h3>
                <div className="showGrafica">
                    <XYPlot width={width} height={300} xType="ordinal" >
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

                <div class="form-check">
                    <input class="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                        onChange={handleChecked}
                        checked={showCompleted}
                    />
                    <label
                        class="form-check-label"
                        for="defaultCheck1">
                        Mostrar todos los registros
                        </label>

                </div>
                {showCompleted && <Table array={registros} />}
            </div>
        </>
    );

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
