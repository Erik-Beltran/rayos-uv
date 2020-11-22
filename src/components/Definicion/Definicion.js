import React from "react";
import './definicion.css'
import radiacionUv from './que-es2.jpg'
import beneficios from './beneficios.jpg'
import riesgos1 from './riesgos1.jpg'
import ojosRojos from './ojos-rojos.jpg'
import cancer from './cancer-de-piel.jpg'

function Definicion() {
  return (
    <div className="container-definicion">
      <div className="queEs">
        <div className="queEs-text">
          <h2>¿Que es la radiacion UV?</h2>
          <p>
            La radiación ultravioleta (UV) es una forma de radiación no ionizante
            emitida por el sol y fuentes artificiales, como las camas
            bronceadoras. Aunque ofrece algunos beneficios a las personas, como la
            producción de vitamina D, también puede causar riesgos para la salud.
        </p>
        </div>
        <img src={radiacionUv} alt="radiacion uv"></img>
      </div>
      <div className="beneficios">
        <img src={beneficios} alt="beneficios"></img>
        <div className="beneficios-text">
          <h2>Beneficios de la radiacion UV</h2>
          <p>
            Los efectos beneficiosos de la radiación UV incluyen la producción de
            vitamina D, una vitamina esencial para la salud humana. La vitamina D
            ayuda al cuerpo a absorber el calcio y el fósforo de los alimentos y
            contribuye a la formación de los huesos. La Organización Mundial de la
            Salud (OMS) recomienda de 5 a 15 minutos de exposición al sol, 2 o 3
            veces por semana.
        </p>
        </div>
      </div>
      <div className="riesgos">
        <h2>Riesgos</h2>
        <ul>
          <li>
            Las quemaduras solares son un signo de sobrexposición corta a la
            radiación UV, mientras que el envejecimiento prematuro y el cáncer
            de piel son los efectos secundarios de la exposición prolongada.
          </li>
          <img src={riesgos1} alt="manchas en la piel"></img>
          <li>
            Puede que algunos medicamentos orales y tópicos así como algunos
            cosméticos, aumenten la sensibilidad de la piel y los ojos a la
            radiación UV, en todos los tipos de piel.
          </li>
          <li>
            La exposición a la radiación UV aumenta el riesgo de presentar
            enfermedades que podrían causar ceguera si no se usa protección para
            los ojos.
          </li>
          <img src={ojosRojos} alt="ojos rojos"></img>
          <li>
            La sobrexposición a la radiación UV puede causar graves problemas de
            salud, incluido el cáncer. El cáncer de piel es el tipo de cáncer
            más común en los Estados Unidos. Los dos tipos de cáncer de piel más
            comunes son el carcinoma de células basales y el carcinoma de
            células escamosas. Por lo general, se forman en la cabeza, la cara,
            el cuello, las manos y los brazos porque estas son las partes del
            cuerpo que más se exponen a la radiación UV. La mayoría de los casos
            de melanoma, el tipo de cáncer de piel más mortal, es causada por
            exposición a la radiación UV.
          </li>
          <img src={cancer} alt="cancer de piel"></img>
          <p>
            Cualquier persona puede tener cáncer de piel, pero es más común en
            las personas que:
          </p>
          <ul className="persons">
            <li>Pasan mucho tiempo al sol o han tenido quemaduras de sol.</li>
            <li>Tienen la piel, el cabello y los ojos claros.</li>
            <li>Tienen un familiar con cáncer de piel.</li>
            <li>Tienen más de 50 años.</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default Definicion;