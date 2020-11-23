import React, { useEffect, useRef, useState } from "react";
import noData from "./no data.png";
import Table from "../Table/Table";

import "./graficas.css";
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
  "Diciembre",
];
const Graficas = ({ registros, width, data }) => {
  //const [data, setData] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const fecha = new Date();
  const dia = fecha.getDate().toString();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  console.log("reg", registros);

  const handleChecked = (e) => {
    setShowCompleted(!showCompleted);
  };

  // function usePrevious(registros) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = registros;
  //   }, [registros]);
  //   return ref.current;
  // }
  // const prevRegistros = usePrevious(registros);

  // useEffect(() => {
  //   console.log("out if");
  //   if (registros !== prevRegistros) {
  //     console.log("in if");
  //     const datosHoy = registros.filter(
  //       (registro) =>
  //         registro.dia === dia && registro.año === año && registro.mes === mes
  //     );
  //     console.log("registros hoy", datosHoy);
  //     datosHoy.forEach((element) => {
  //       setData((prev) => [...prev, { x: element.hora, y: element.indice }]);
  //       console.log("data", data);
  //     });
      
  //   }
  // }, [registros, prevRegistros, dia, año, mes, data])


  return (
    <>
      <div className="grafica">
        <h3>{`Valores de hoy ${dia} de ${mes}`}</h3>
        {data.length > 0 ? (
            <div className="showGrafica">
              <XYPlot width={width} height={300} xType="ordinal" animation>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis
                  title="Hora"
                  style={{
                    text: { fontSize: "20px" },
                    title: { fontSize: "15px" },
                  }}
                  position="middle"
                />
                <YAxis
                  title=" Indice de Radiacion"
                  position="middle"
                  style={{
                    text: { fontSize: "20px" },
                    title: { fontSize: "15px" },
                  }}
                />
                <LineMarkSeries
                  className="linemark-series-example-2"
                  curve={"curveMonotoneX"}
                  style={{ transform: "rotate(-90)" }}
                  data={data}
                />
              </XYPlot>
            </div>
        ) : (
          <img src={noData} alt="no data"></img>
        )}
        <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
                onChange={handleChecked}
                checked={showCompleted}
              />
              <label class="form-check-label" for="defaultCheck1">
                Mostrar todos los registros
              </label>
            </div>
        {showCompleted && <Table array={registros.reverse()} />}
      </div>
    </>
  );
};

export default Graficas;
