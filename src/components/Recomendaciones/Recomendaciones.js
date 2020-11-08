import React from 'react'
import gafas from './img/sun-glasses.png'
import mangaLarga from './img/manga-larga.png'
import sunScreen from './img/protectorsolar.png'
import sombrero from './img/gorra.svg'
import sombrilla from './img/sombrilla.png'
import './recomendaciones.css'

export const Recomendaciones = () => {


    const uvModerado = [
        {descripcion: "Utilizar anteojos de sol", img: gafas},
        {descripcion: "Utilizar ropa de manga larga", img:mangaLarga},
        {descripcion: "Aplicarse protector solar de amplio espectro", img:sunScreen},
        {descripcion: "Utilizar sombrero de ala ancha", img:sombrero},
        {descripcion: "Mantenerse en la sombra", img:sombrilla},
    ];


    console.log(uvModerado)
    return (
        <div className="contenedor-recomendaciones">
            <h2>RECOMENDACIONES</h2>
            <ul>
                {uvModerado.map(item => (
                    <li>
                        <img src={item.img} alt={item.descripcion}></img>
                        <p>{item.descripcion}</p>
                       
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Recomendaciones;