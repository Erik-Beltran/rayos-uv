import React from 'react'
import './graficas.css'
import { XYPlot, LineSeries } from 'react-vis';

const Graficas = () => {
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

    return (
        <div className="container grafica-container">
            <div className="texts">
                <h3 class="display-4 font-weight-normal">CALCULA EL ÍNDICE DE RADIACIÓN UV:</h3>
                <p class="lead font-weight-normal">Aquí puedes consultar el estado actual del índice de radiacíon.</p>
                <button type="button" class="btn btn-primary">CALCULAR</button>

                <input className="indice" value="23"></input> 
            </div>
            <div className="grafica">
                <XYPlot height={300} width={300}>
                    <LineSeries data={data} />
                </XYPlot>

            </div>
        </div>
    )
}

export default Graficas
