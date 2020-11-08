import React from "react";
import "./footer.css";
import logo from '../Recomendaciones/img/sita-footer.png'

const Footer = () => {
  return (
    <div className="contenedor-footer">
      <h3>Politécnico Colombiano Jaime Isaza Cadavid © 2020</h3>

      <p>
        <b>Sede Medellín</b>
        <br />
        Carrera 48 No. 7 – 151 | El Poblado | PBX: (+57 4) 444 76 54 - (+57 4)
        319 79 00 | NIT: 890980136-6
      </p>
      <p>
        <img src={logo} alt="sita" className="logo-sita"></img>
        <b>Semillero de Investigacion de Telecomunicaciones Aplicadas</b>
        <br />
        Carrera 48 No. 7 – 151 | El Poblado | PBX: (+57 4) 444 76 54 - (+57 4)
        319 79 00 | NIT: 890980136-6
      </p>
    </div>
  );
};

export default Footer;
