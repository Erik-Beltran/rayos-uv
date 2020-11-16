import React from "react";
import gafas from "./img/sun-glasses.png";
import mangaLarga from "./img/manga-larga.png";
import sunScreen from "./img/protectorsolar.png";
import sombrero from "./img/gorra.svg";
import sombrilla from "./img/sombrilla.png";
import "./recomendaciones.css";

export const Recomendaciones = ({ indice }) => {
  const uvBajo = [
    { descripcion: "Utilizar anteojos de sol", img: gafas },
    {
      descripcion: "Aplicarse protector solar de amplio espectro",
      img: sunScreen,
    },
  ];
  const uvModerado = [
    { descripcion: "Utilizar anteojos de sol", img: gafas },
    {
      descripcion: "Aplicarse protector solar de amplio espectro",
      img: sunScreen,
    },
    { descripcion: "Utilizar sombrero de ala ancha", img: sombrero },
  ];
  const uvAltoMuyAlto = [
    { descripcion: "Utilizar anteojos de sol", img: gafas },
    { descripcion: "Utilizar ropa de manga larga", img: mangaLarga },
    {
      descripcion: "Aplicarse protector solar de amplio espectro",
      img: sunScreen,
    },
    { descripcion: "Utilizar sombrero de ala ancha", img: sombrero },
    { descripcion: "Mantenerse en la sombra", img: sombrilla },
  ];
  const uvExtremadamenteAlto = [
    { descripcion: "Utilizar anteojos de sol", img: gafas },
  ];

  const nivelRecomendacion = () => {
    if (indice >= 0 && indice <= 2) {
      return uvBajo;
    }
    if (indice >= 3 && indice <= 5) {
      return uvModerado;
    }
    if (indice >= 6 && indice <= 10) {
      return uvAltoMuyAlto;
    }
    if (indice >= 11) {
      return uvExtremadamenteAlto;
    }
  };

  return (
    <div className="contenedor-recomendaciones">
      <h2>RECOMENDACIONES</h2>
      <ul>
        {nivelRecomendacion().map((item) => (
          <li>
            <img src={item.img} alt={item.descripcion}></img>
            <p>{item.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recomendaciones;
