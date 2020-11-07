import React from 'react'

export const Recomendaciones = () => {

    const uvBajo = [];
    const uvModerado = [
        { descripcion: "Utilizar anteojos de sol", img:"./img/sun-glasses.png"},
        {descripcion: "Utilizar ropa de manga larga", img:""},
        {descripcion: "Aplicarse protector solar de amplio espectro", img:""},
        {descripcion: "Utilizar sombrero de ala ancha", img:""},
        {descripcion: "Mantenerse en la sombra", img:""},
    ];
    const uvAlto = [];
    const uvMuyAlto = [];
    const uvExtremo = [];

    console.log(uvModerado)
    return (
        <div>
            <h2>RECOMENDACIONES</h2>

            <ul>
                {uvModerado.map(item => (
                    <li>
                        <p>{item.descripcion}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default Recomendaciones;