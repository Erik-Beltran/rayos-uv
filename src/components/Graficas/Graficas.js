import React, { useEffect, useRef, useState } from 'react'
import noData from './no data.png'

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
    const año = fecha.getFullYear()
    console.log("reg", registros)
    const handleChecked = (e) => {
        setShowCompleted(!showCompleted)
    }

    // const getRegistros = (registros) => {
    //     const datosHoy = registros.filter(registro => registro.dia === dia && registro.año === año && registro.mes === mes)
    //     datosHoy.forEach(element => {
    //         setData([...data, { x: element.hora, y: element.indice }])
    //     });
    // }

    function usePrevious(registros) {
        const ref = useRef();
        useEffect(() => {
            ref.current = registros;
        }, [registros]);
        return ref.current;
    }
    const prevRegistros = usePrevious(registros);

    useEffect(() => {
        console.log("out if")
        if (registros !== prevRegistros) {
            console.log("in if")
            const datosHoy = registros.filter(registro => registro.dia === dia && registro.año === año && registro.mes === mes)
            console.log("registros hoy", datosHoy)
            datosHoy.forEach(element => {
                setData(prev => [...prev, { x: element.hora, y: element.indice }])
                console.log("data", data)
            });
        }
    }, [registros, prevRegistros, dia, año, mes, data])

    return (
        <>
            <div className="grafica">
                <h3>{`Valores de hoy ${dia} de ${mes}`}</h3>
                {data.length>0
                    ?
                    <div className="showGrafica">
                        <XYPlot width={width} height={300} xType="ordinal" >
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis title="Hora" style={{ text: { fontSize: "20px" } }} position="middle" />
                            <YAxis title=" Indice de Radiacion" position="middle" />
                            <LineMarkSeries
                                className="linemark-series-example-2"
                                curve={"curveMonotoneX"}
                                style={{ transform: "rotate(-90)" }}
                                data={data}
                            />
                        </XYPlot>
                    </div>
                    : <img src={noData} alt="no data"></img>
                }

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
                {showCompleted && <Table array={registros.reverse()} />}
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
