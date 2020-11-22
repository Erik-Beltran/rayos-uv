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
const Graficas = ({ registros, width }) => {
  const [data, setData] = useState([
    {
      x: "9:00",
      y: 5,
    },
    {
      x: "9:05",
      y: 8,
    },
    {
      x: "9:10",
      y: 2,
    },
    {
      x: "9:15",
      y: 3,
    },
    {
      x: "9:20",
      y: 1,
    },
    {
      x: "9:25",
      y: 0,
    },
    {
      x: "9:30",
      y: 4,
    },
    {
      x: "9:35",
      y: 6,
    },
  ]);
  const [showCompleted, setShowCompleted] = useState(false);
  const fecha = new Date();
  const dia = fecha.getDate().toString();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  console.log("reg", registros);
  const handleChecked = (e) => {
    setShowCompleted(!showCompleted);
  };

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
    console.log("out if");
    if (registros !== prevRegistros) {
      console.log("in if");
      const datosHoy = registros.filter(
        (registro) =>
          registro.dia === dia && registro.año === año && registro.mes === mes
      );
      console.log("registros hoy", datosHoy);
      datosHoy.forEach((element) => {
        setData((prev) => [...prev, { x: element.hora, y: element.indice }]);
        console.log("data", data);
      });
    }
  }, [registros, prevRegistros, dia, año, mes, data]);
  const registroPrueba = [
    {
      id: "1",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "2",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "3",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "4",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "5",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "6",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "7",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
    {
      id: "8",
      ciudad: "Medallo",
      año: "2020",
      mes: "11",
      dia: "21",
      hora: "9:56",
      indice: 5,
    },
  ];
  return (
    <>
      <div className="grafica">
        <h3>{`Valores de hoy ${dia} de ${mes}`}</h3>
        {data.length > 0 ? (
          <>
            <div className="showGrafica">
              <XYPlot width={width} height={300} xType="ordinal">
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
          </>
        ) : (
          <img src={noData} alt="no data"></img>
        )}
        {showCompleted && <Table array={registroPrueba.reverse()} />}
      </div>
    </>
  );
};

export default Graficas;
