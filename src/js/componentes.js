//import '../css/componentes.css';// 
//import webpacklogo from '../assets/img/webpack-logo.png'; asi genera el archivo o imagen extra en el build de production que es dist
import * as _ from 'underscore'; // npm install underscore --save-dev

const body = document.body;
let espacioJuegoHTML;

let carta1, carta2;
let baraja;
let numErrores;
let contadorParejasEncontradas;
let numParejas;
let mensajeFinalDivHTML;
let barajaHTML;
let informacionImportanteHTML;

// Imagenes obtenidas de https://www.pexels.com/es-es/buscar/perros/
const crearSeccionesHTML = () => {

    console.log('Iniciando juego..');

    const header= document.createElement('header');// no hay problema con hacerlo con un div, pero para el navegador web es mas facil interpretar de manera semantica esto, clase 57
    header.innerHTML = `<h1 class="bg-success"> &#x1F415; Dograma</h1><hr/><h2>Encuentra las parejas</h2>`;


    const section = document.createElement('section');
    section.id = 'espacio-juego';

    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.innerHTML = `<p id='num-errores'>#Errores: ${ numErrores }</p>`

    const divMensaje = document.createElement('div');
    divMensaje.classList.add('pantalla-bloqueada');
    divMensaje.innerHTML = `<h2 id="mensaje-final"></h2>`;

    body.append( header );
    body.append( section );
    body.append( footer );
    body.append( divMensaje );
    
}

const crearDeck = () => {
    baraja = [];
    for( let i = 1; i < 8; i++ ){
        baraja.push({
            //isActive: false,
            value: `dog-${i}-0`
        });
    }

    //console.log( baraja );
    numParejas = baraja.length;
    baraja = [...baraja,...baraja]
    baraja = _.shuffle( baraja );
    //console.log( baraja );

}

const asignarEventos = () => {
    barajaHTML = document.querySelectorAll('.caja-perro');// divs 
    
    barajaHTML.forEach( cartaHTML => cartaHTML.addEventListener('click', () => {// cartaHTML es un div
        //console.log('Clik en tarjeta: ', cartaHTML);// cartaHTML contiene la img con front y back
        //console.log( 'img class front: ', cartaHTML.firstElementChild.classList.contains('click-show-front') );
        //console.log( 'img class back: ', cartaHTML.lastElementChild.classList.contains('click-hide-back') );

        if( !carta1 || !carta2 ){// si alguna de las cartas no ha sido seleccionada
            if ( !cartaHTML.firstElementChild.classList.contains('click-show-front') ) {// si no se ha seleccionado este div que contiene 2 imagenes
                cartaHTML.firstElementChild.classList.add('click-show-front');// img class=click-front
                cartaHTML.lastElementChild.classList.add('click-hide-back');// img class=click-back
    
                if( !carta1 ){
                    //console.log('Ruta 1: ', cartaHTML.firstElementChild.src);
                    carta1 = {
                        ruta: cartaHTML.firstElementChild.src,
                        cartaHTML
                    };
    
                }else if ( !carta2 ){
                    //console.log('Ruta 2: ', cartaHTML.firstElementChild.src);
                    carta2 = {
                        ruta: cartaHTML.firstElementChild.src,
                        cartaHTML
                    };
                    
                    // Prueba

                    setTimeout(() => {
                        if ( carta1.ruta === carta2.ruta ) {
                            contadorParejasEncontradas += 1;

                            if( contadorParejasEncontradas === numParejas ) {
                                // Has ganado el juego
                                mensajeFinalDivHTML.classList.toggle('pantalla-bloqueada');
                                mensajeFinalDivHTML.classList.add('pantalla-mostrada');
                                mensajeFinalDivHTML.firstElementChild.innerText = '¡Felicidades, has ganado el juego :) !';
                                setTimeout(() => {
                                    location.reload();
                                }, 4000);
                            }
                        }else{
                            //alert('Vuelve a intentarlo!'); // instruccion bloqueante, cuando presionamos ok, se ejecutan las siguientes lineas
                            numErrores += 1;
                            informacionImportanteHTML.firstElementChild.innerText = `#Errores: ${ numErrores }`;
                            informacionImportanteHTML.firstElementChild.classList.toggle('animacion-num-errores');

                            setTimeout(() => {
                                informacionImportanteHTML.firstElementChild.classList.toggle('animacion-num-errores');
                            }, 1000);

                            carta1.cartaHTML.firstElementChild.classList.toggle('click-show-front');
                            carta1.cartaHTML.lastElementChild.classList.toggle('click-hide-back');
                            
                            carta2.cartaHTML.firstElementChild.classList.toggle('click-show-front');
                            carta2.cartaHTML.lastElementChild.classList.toggle('click-hide-back');

                            if ( numErrores === 10 ) {
                                // Has perdido el juego
                                mensajeFinalDivHTML.classList.toggle('pantalla-bloqueada');
                                mensajeFinalDivHTML.classList.add('pantalla-mostrada');
                                mensajeFinalDivHTML.firstElementChild.innerText = '¡Has perdido el juego :/ !';
                                setTimeout(() => {
                                    location.reload();
                                }, 4000);
                            }

                        }
        
                        carta1 = undefined;
                        carta2 = undefined;
                    }, 500);
                }
            }
        }

        //console.log( 'img class front: ', cartaHTML.firstElementChild.classList.contains('click-show-front') );
        //console.log( 'img class back: ', cartaHTML.lastElementChild.classList.contains('click-hide-back') );

    }) );
} 

const crearEspacioJuegoHTML = () => {
    espacioJuegoHTML = document.querySelector('#espacio-juego');

    for (const carta of baraja) {

        const div = document.createElement('div');
        div.classList.add('caja-perro');

        div.innerHTML = `
            <img class=front src=./assets/img/${ carta.value }.jpg
                 
             />
             <img class=back src=./assets/img/back-card.jpg
                 
             />
        `;


        espacioJuegoHTML.append( div );
    }



    asignarEventos();

}

// https://github.com/Vanestefani/memorama-javascript/blob/master/Pantallazos/2.png
// https://codepen.io/jrgm0005/pen/zzJzxm




const init = () => {
    numErrores = 0;
    crearSeccionesHTML();
    crearDeck();
    crearEspacioJuegoHTML();
    contadorParejasEncontradas = 0;
    informacionImportanteHTML = document.querySelector('#footer');
    mensajeFinalDivHTML = document.querySelector('.pantalla-bloqueada');
}


export {
    init
}