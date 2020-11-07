import React, { Component } from 'react'
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
state={
    showSpinner:false
}

handleSubmit=(e)=>{
    console.log("hola")
this.setState({
    showSpinner: !this.state.showSpinner
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

const {showSpinner} = this.state
console.log(this.state.showSpinner)
        return (
            <div className="container grafica-container">
                <div className="texts">
                    <h3 class="display-4 font-weight-normal">CALCULA EL ÍNDICE DE RADIACIÓN UV:</h3>
                    <p class="lead font-weight-normal">Aquí puedes consultar el estado actual del índice de radiacíon.</p>
                    <button onClick={this.handleSubmit}type="button" class="btn btn-primary">CALCULAR</button>
                    
                    {showSpinner &&
                    <div class="lds-dual-ring"></div>
                    }
                    {!showSpinner &&
                        <input className="indice" value="23"></input>
                    }
                </div>
                <div className="grafica">
                    <XYPlot width={600} height={300}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Hora" style={{ text: { fontSize: "red" } }} position="middle" className="x" />
                        <YAxis title=" Indice de Radiacion" position="middle" />


                        <LineMarkSeries
                            className="linemark-series-example-2"
                            curve={"curveMonotoneX"}
                           style={{transform:"rotate(-90)"}}
                            data={data}
                        />
                    </XYPlot>
                </div>
            </div>

        )
    }
}

export default Graficas;
