const botonReiniciarJuego = document.getElementById('boton-reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonEstrellaJugador = document.getElementById('boton-estrella')


const sectionSeleccionarEstrella = document.getElementById('seleccionar-estrella')

const botonReiniciar = document.getElementById('boton-reiniciar')

const spanMascotaJugador = document.getElementById('estrella-jugador')

const spanMascotaEnemigo = document.getElementById("estrella-enemigo")

const spanVidasJugador = document.getElementById('vidas-jugador') 
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const spanMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetasPersonajes = document.getElementById('contenedorTarjetasPersonajes')

const contenedorAtaques = document.getElementById('contenedorAtaques')

const subtitulo = document.getElementById('subtituloEstrellas')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

//de Backend:
let jugadorId = null // por que al inicio no se conoce cual es el id, luego ya se envia por la url
let enemigoId = null

let pNumeroAtaques = document.getElementById('numAtaques')

let divMensajeCadaAtaque = document.getElementById('mensaje-cada-ataque')

let estrellas = [] /* variable para crear arreglo. Esta variable nos guarda todos los objetos de interes. los corchetes indican que es  */
let estrelleponesEnemigos = [] //creada para backend para que no titile cada personaje pntado en pantalla
let opcionDeEstrellas /* usamos esta varibale para utilizarla abajo, para inyectarle un valor y usarla en nuestro HTML */
let vidasJugador = 3
let vidasEnemigo = 3
let ataqueJugador = []
let ataqueEnemigo = []

let imputlizeth
let imputeylin
let imputdanilo
let imputcamilo
let imputisabel
let imputalexander
let imputanderson
let imputtobi

let estrellaJugador
let estrellaJugadorObjeto

let botonFuego
let botonAgua 
let botonTierra 
let botonAire 
let botonRayo 
let botonMetal 
let botonHielo



let ataquesEstrella

let ataquesEstrellaEnemigo

let botones = [] /* para el arreglo de poderes o ataques */
/* let ataqueJugador = [] */

let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0

let ataquesEnemigo

let tipoEstrellaDelJugador
let tipoEstrellaDelEnemigo

let estrellaDelJugador
let estrellaDelEnemigo

let nombreEstrellaJugador 
let nombreEstrellaEnemigo 

let cantidadAtaques = 0
let contadorAtaques = 0

let lienzo = mapa.getContext('2d') //2d por que vamos a trabajar en 2 dimensiones

let intervalo //la creamos para hacer un set intervalo para llamar a una funcion constantement esperando un poco de tiempo

let mapaFondo = new Image()
mapaFondo.src = './assets/moepan8.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20 //inner.width me permite obtener el ancho de pantalla que este usando el usuario
//getBoundingClientRect().width obtiene el ancho de cualquier elemento HTML

//let botonMovimientoPersonaje = document.getElementById('botonesMoverPersonaje')



//const anchoMaximoDelMapa = 840
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

//alturaQueBuscamos = anchoDelMapa * 473 / 840
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa // pintamos el canvas con el msimo ancho de pantalla
mapa.height = alturaQueBuscamos // pintamos el canvas con el msimo altura de pantalla

/* acontinuacion creamos una clase para poder crear mas personajes de una forma rapida */

class Estrella{ /* inicia con mayuscula las clases de un objeto */
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null/* ,  x=65, y=413 */) {/* que voy a construir, todas las propiedades que van a llevar mis objetos */
        this.id = id //agregada cuando hicimos backend
        this.nombre = nombre /* this hace referencia a esto , que es mi clase misma, la traducccion  seria, el nombre de mi estrellla es igual a ... nombre de la estrella  va a ser igual a nombre de nuestro constructor */ 
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.tipo = tipo
        this.ancho = 0.047*anchoDelMapa
        this.alto = 0.047 * anchoDelMapa
        this.x = aleatorio(0, mapa.width - this.ancho) //un numero aleatorio dentro del mapa, menos los 40 px del ancho de cada personaje 
        this.y = aleatorio(0, mapa.height - this.alto)
        /* this.x = 20
        this.y = 30 */
        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa //son los avatar de nuestras estellas
        this.velocidadX = 0
        this.velocidadY = 0
    }           
    
    pintarEstrella() {
        lienzo.drawImage(  //dibuja espacio para subir una imagen 
        this.mapaFoto, //aqui sube la imagen guardada en mapaFoto
        this.x,
        this.y,
        this.ancho,
        this.alto,
    ) 
    }
}

let lizeth = new Estrella('Lizeth', './assets/lizeth.jpg', 5, '💧', './assets/toad31.png') 

let danilo = new Estrella('Danilo', './assets/danilo.jpg', 5, '⚡', './assets/bowser3.png')

let camilo = new Estrella('Camilo', './assets/camilo.jpg', 5, '🔥', './assets/goombas3.png')

let isabel = new Estrella('Isabel', './assets/isabel.jpg', 5, '🌎', './assets/estrella3.png')

let alexander = new Estrella('Alexander', './assets/alexander.jpg', 5, '🌪', './assets/luigi31.png')

let tobi = new Estrella('Tobi', './assets/tobi.jpg', 5, '❄', './assets/yoshi.png') 

let anderson = new Estrella('Anderson', './assets/anderson.jpg', 5, '💿', './assets/torti.png')

let eylin = new Estrella('Eylin', './assets/eylin.jpg', 5, '💧', './assets/mario31.png')


//Hacemos que estos personajes enemigos no se creen aqui, si no en el servidor, en el momento en el que este reciba una lista de enemigos. por eso para no borrarlo, solo lo comento:

//let lizethEnemigo = new Estrella('Lizeth', './assets/lizeth.jpg', 5, '💧', './assets/toad31.png'/* , 615, 10 */)

//let daniloEnemigo = new Estrella('Danilo', './assets/danilo.jpg', 5, '⚡', './assets/bowser3.png'/* , 615, 420 */)

//let camiloEnemigo = new Estrella('Camilo', './assets/camilo.jpg', 5, '🔥', './assets/goombas3.png'/* , 290, 40 */)

//let isabelEnemigo = new Estrella('Isabel', './assets/isabel.jpg', 5, '🌎', './assets/estrella3.png'/* , 105, 175 */)

//let alexanderEnemigo = new Estrella('Alexander', './assets/alexander.jpg', 5, '🌪', './assets/luigi31.png'/* , 360, 235 */)

//let tobiEnemigo = new Estrella('Tobi', './assets/tobi.jpg', 5, '❄', './assets/yoshi.png'/* , 370, 400 */)

//let andersonEnemigo = new Estrella('Anderson', './assets/anderson.jpg', 5, '💿', './assets/torti.png'/* , 730, 80 */)

//let eylinEnemigo = new Estrella('Eylin', './assets/eylin.jpg', 5, '💧', './assets/mario31.png'/* , 650, 265 */)

//los comento por que ya no queremos que se generen automaticamente, si no que se creen con los usuario que ingresen al juego. Tambien, como lizeth y lizethEnemigo tienen los mismos poderes o ataques, entonces creamos una constante que los guarde

const LIZETH_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'}, // aqui creamos objetos literarios, solo son para guardar informacion, no necesitan una clase 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },    
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },
]

const DANILO_ATAQUES = [
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '⚡', id: 'boton-rayo' },  
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },]

const CAMILO_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },]

const ISABEL_ATAQUES = [
    { nombre: '🌎', id: 'boton-tierra' },  
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },
]

const ALEXANDER_ATAQUES = [
    { nombre: '🌪', id: 'boton-aire' },  
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },
]

const ANDERSON_ATAQUES = [
    { nombre: '💿', id: 'boton-metal' },  
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '❄', id: 'boton-hielo' },  
    { nombre: '🌎', id: 'boton-tierra' },
]

const TOBI_ATAQUES = [
    { nombre: '❄', id: 'boton-hielo' },  
    { nombre: '❄', id: 'boton-hielo' }, 
    { nombre: '❄', id: 'boton-hielo' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '🌎', id: 'boton-tierra' },
]

const EYLIN_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'}, /* aqui creamos objetos literarios, solo son para guardar informacion, no necesitan una clase */
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },    
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },
]

lizeth.ataques.push(...LIZETH_ATAQUES)
      
   /*  { nombre: '💧', id: 'boton-agua'}, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },    
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' },  */
    //los quito por que ya los tengo en una variable 
   

  


//los quito por que ya no los necesito genericos, si no usuarios en el servidor 
 //lizethEnemigo.ataques.push(...LIZETH_ATAQUES //pongo los 3 puntos para que no se comporte como una lista, si no como si yo hubiese escrito asi exactamente y que pase los valores
    /* { nombre: '💧', id: 'boton-agua'}, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },    
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
//)

danilo.ataques.push(...DANILO_ATAQUES)
    /* { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '⚡', id: 'boton-rayo' },  
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
       

//daniloEnemigo.ataques.push(...DANILO_ATAQUES
    /* { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '⚡', id: 'boton-rayo' },  
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
       
//)


camilo.ataques.push(...CAMILO_ATAQUES)
    /* { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */

//camiloEnemigo.ataques.push(...CAMILO_ATAQUES
    /* { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '⚡', id: 'boton-rayo' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
//)

isabel.ataques.push(...ISABEL_ATAQUES)
    /* { nombre: '🌎', id: 'boton-tierra' },  
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
    


//isabelEnemigo.ataques.push(...ISABEL_ATAQUES
    /* { nombre: '🌎', id: 'boton-tierra' },  
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
    
//)

 alexander.ataques.push(...ALEXANDER_ATAQUES)
    /* { nombre: '🌪', id: 'boton-aire' },  
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
 
//alexanderEnemigo.ataques.push(...ALEXANDER_ATAQUES
    /* { nombre: '🌪', id: 'boton-aire' },  
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌎', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
//) 

 anderson.ataques.push(...ANDERSON_ATAQUES)
    /* { nombre: '💿', id: 'boton-metal' },  
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '❄', id: 'boton-hielo' },  
    { nombre: '🌎', id: 'boton-tierra' }, */
   
 //andersonEnemigo.ataques.push(...ANDERSON_ATAQUES
    /* { nombre: '💿', id: 'boton-metal' },  
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '❄', id: 'boton-hielo' },  
    { nombre: '🌎', id: 'boton-tierra' }, */
//)  

 tobi.ataques.push(...TOBI_ATAQUES)
    /* { nombre: '❄', id: 'boton-hielo' },  
    { nombre: '❄', id: 'boton-hielo' }, 
    { nombre: '❄', id: 'boton-hielo' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '🌎', id: 'boton-tierra' }, */

//tobiEnemigo.ataques.push(...TOBI_ATAQUES
    /* { nombre: '❄', id: 'boton-hielo' },  
    { nombre: '❄', id: 'boton-hielo' }, 
    { nombre: '❄', id: 'boton-hielo' }, 
    { nombre: '💧',  id: 'boton-agua' },
    { nombre: '🌪', id: 'boton-aire' }, 
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },
    { nombre: '💿', id: 'boton-metal' }, 
    { nombre: '🌎', id: 'boton-tierra' }, */
//)

eylin.ataques.push(...EYLIN_ATAQUES)
    /* { nombre: '💧', id: 'boton-agua'}, // aqui creamos objetos literarios, solo son para guardar informacion, no necesitan una clase 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },    
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */

//eylinEnemigo.ataques.push(...EYLIN_ATAQUES
    /* { nombre: '💧', id: 'boton-agua'}, // aqui creamos objetos literarios, solo son para guardar informacion, no necesitan una clase 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-rayo' },    
    { nombre: '🌪', id: 'boton-aire' },
    { nombre: '🌎', id: 'boton-tierra' }, 
    { nombre: '💿', id: 'boton-metal' },
    { nombre: '❄', id: 'boton-hielo' }, */
//)
 /*console.log(lizeth)  /*pequeños mensajes en el navegador para ver valores, si funciona o no, mapear errores... */

/* ahora creamos un arreglo para guardar todos los personajes*/
estrellas.push(lizeth, danilo, camilo, isabel, alexander, anderson, tobi, eylin )/* push es un empuja o   inyecta este valor en esta variable(estrellas). lo que este dentro del metodo, lo va a empujar a este arreglo, para que lo pueda guardar. Si mañana tengo mas personajes, los agrego aqui para que se vayan guardando*/

function iniciarJuego() {
    botonReiniciarJuego.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    estrellas.forEach((estrella) => { 
        opcionDeEstrellas = `
        <input type="radio" name="estrella" id=${estrella.nombre} />
            <label class="tarjeta-de-estrellas" for=${estrella.nombre}>
                <p>${estrella.nombre}</p>
                <img src=${estrella.foto} alt=${estrella.nombre}>
            </label>
        ` /* generamos una estructura llamada templates literarios, es la forma en la que podemos implementar HTML(ejemplo) con alguno de los valores de nuestras variables, para que podamos hacer un mix de ambas cosas*/
        contenedorTarjetasPersonajes.innerHTML += opcionDeEstrellas /* el + es para que aparezcan todos y no solo 1 elemento */

         imputlizeth = document.getElementById('Lizeth')
         imputdanilo = document.getElementById('Danilo')
         imputcamilo = document.getElementById('Camilo')
         imputisabel = document.getElementById('Isabel') /* aqui agregamos las variables oon todo de getelements por aque aqui si ya  existen las   variables en HTML */
        imputalexander = document.getElementById('Alexander')
        imputanderson = document.getElementById('Anderson')
        imputtobi = document.getElementById('Tobi')
        imputeylin = document.getElementById('Eylin')
        

    }) /* vamos a recorrer los objetos de nuestro arreglo. forEach traduce por cada uno de los elementos de nuestro arreglo, has algo. Aqui comenzamos a tomar la informacion de cada uno de lo s objetos*/
   
    


    botonEstrellaJugador.addEventListener('click', seleccionarEstrellaJugador)

    
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    /* ADICION BACKEND:
    
    Tenemos que añadir esa capacidad de que cuando se cargue nuestro juego por primera vez en el navegador, se invoque el servicio que acabamos de crear en node.js para unirnos a la sala de juego y tambien obtener nuestro id como jugador dentro del juego. creamos funcion llamada unirseAlJuego
    */
    unirseAlJuego()    

}

function unirseAlJuego() {
    //aqui hacemos una petición hacia el servidor. en java scrip contamos con funcion fetch, que permite hacer llamada hacia otros servicios por medio de HTTP, nos permite indicar hacia que URI, en que metodo, si es tipo GET o tipo POST. Si es tipo POST, podemos mandar los datos atraves de esa peticion (queremos mandarla al servidor en segundo plano). recibiremos una respuesta asincrona(tardara unos segundos)
    fetch("http://192.168.1.104:8080/unirse")//con esto va a realizar una llamada tipo GET por defecto, donde vamos a obtener una respuesta
        //si quisieramos indicarle que es tipo post, se escribe lo siguiente:
        //fetch("http://192.168.1.104:8080/unirse", {method: "post"})
        .then(function (res) { //propiedad then que tienen todas las respuestas asincronas
            
            if (res.ok) {
                res.text()//tipo text por qye queremos texto, si fuera tipo json pondriamos .json()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta //lo agregamos despues de haber creado la app.post  para enviar el noombre del estreellpon seleccionado
                })//tambien tiene su propio metodo then, por que tambien es una promesa
            }
    })
}

function seleccionarEstrellaJugador() {


    
    //sectionSeleccionarEstrella.style.display = 'none'

    
    //sectionSeleccionarAtaque.style.display = 'flex'
   
    //intervalo = setInterval(pintarCanvas, 50) // Va a pintarme el personaje cada 50 milisegundos, para que se pueda ver el movimiento en cada direccion y no solo se pinte una vez
    //let imagenDeLizeth = new Image()
    //imagenDeLizeth.src = lizeth.foto
    //SSlienzo.fillRect(5, 15, 20, 40) /* fillRec crea un rectangulo dentro del canvas (5 en X, 15 en Y, 20 ancho, 40 alto)*/
    
   // window.addEventListener('keydown', sePresionoUnaTecla) //keydown se activa cuando se presiona una tecla
    //window.addEventListener('keyup', detenerMovimiento) //keydown se activa cuando se suelta una tecla
    /* creamos nueva funcion */
    


/* 
    if (imputlizeth.checked) {
        //alert('Elegiste como estrella a Lizeth')
        spanMascotaJugador.innerHTML = 'Lizeth' */ /* Cambiamos estas referencias escritas a mano, por las propias IDs UNASOLAFUENTEDEVERDAD*/
    
    if (imputlizeth.checked) {
        //alert('Elegiste como estrella a Lizeth')
        spanMascotaJugador.innerHTML = imputlizeth.id
        estrellaJugador = imputlizeth.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else if (imputdanilo.checked) {
        //alert('Elegiste como estrella a danilo')
        spanMascotaJugador.innerHTML = imputdanilo.id
        estrellaJugador = imputdanilo.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else if (imputcamilo.checked) {
        //alert('Elegiste como estrella a eylin')
        spanMascotaJugador.innerHTML = imputcamilo.id
        estrellaJugador = imputcamilo.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else if (imputisabel.checked) {
        //alert('Elegiste como estrella a isabel')
        spanMascotaJugador.innerHTML = imputisabel.id
        estrellaJugador = imputisabel.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else if (imputalexander.checked) {
        //alert('Elegiste como estrella a isabel')
        spanMascotaJugador.innerHTML = imputalexander.id
        estrellaJugador = imputalexander.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else if (imputanderson.checked) {
        //alert('Elegiste como estrella a isabel')
        spanMascotaJugador.innerHTML = imputanderson.id
        estrellaJugador = imputanderson.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else if (imputtobi.checked) {
        //alert('Elegiste como estrella a isabel')
        spanMascotaJugador.innerHTML = imputtobi.id
        estrellaJugador = imputtobi.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    }else if (imputeylin.checked) {
        //alert('Elegiste como estrella a isabel')
        spanMascotaJugador.innerHTML = imputeylin.id
        estrellaJugador = imputeylin.id
        estrellaDelJugador = obtenerObjetoEstrella(estrellaJugador)
    } else {
        
        alert('Error!!! Primero debes seleccionar una estrella')

         
         //sectionSeleccionarAtaque.style.display = 'none'
        
        
        //sectionSeleccionarEstrella.style.display = 'flex'
        return
    }


    sectionSeleccionarEstrella.style.display = 'none'

    //BACKEND: aqui creamos una funcion llamada seleccionarEstrellepon y estrellaJugador como argumento
    seleccionarEstrellepon(estrellaJugador) // hacemos que estrellaJugador se envie al BACkEND

    //seleccionarMascotaEnemigo()
    sectionVerMapa.style.display = 'flex'
    iniciarMapa() 

    /* extraerPoderes(estrellaJugador)

    secuenciaAtaque() */
    
    /* validacionEstrella(estrellaDelJugador, estrellaDelEnemigo) */
}

function seleccionarEstrellepon(estrellaJugador) { //BACKEND
    fetch(`http://192.168.1.104:8080/estrellepon/${jugadorId}`, {
        method: "post",
        //a continuacion necesitamos enviar 2 cosas mas: 1 es indicarle que tipo de dato le vamo sa enviar al servidor y 2: los datos que vaos a enviar.
        //1:
        headers: { //metadatos, informacion que le sirve a la computadora para interpretar datos reales(tambie es un objeto json)
        "Content-Type": "application/json" // es para definir que tipo de contenido envio(esa es la CLAVE) y el valor seria application/json
        },
        body: JSON.stringify({ //son los datos como tal y ya estipulamos que deberia ser una cadena de texto
            estrellepon: estrellaJugador
            //no es necesario aqui un then, por que no esperamos respuesta, solo enviamos datos al servidor
        })
    })
    //al inicio de esta funcion tenemos jugadorId, pero nunca la hemos declarado, la declaramos como null al priincipio y luego en funcion unirseAljuego ya le damos el valor 
   
}

function extraerPoderes(estrellaJugador) {
    let poderes
    for (let i = 0; i < estrellas.length; i++) {
        if (estrellaJugador === estrellas[i].nombre) {
            poderes = estrellas[i].ataques
        }
    }
    
    mostrarPoderes(poderes) 
    
}

function mostrarPoderes(poderes) {
    poderes.forEach((poder) => {
        ataquesEstrella = `<button id=${poder.id} class="boton-de-ataque BAtaque">${poder.nombre}</button>`
console.log(ataquesEstrella)
        contenedorAtaques.innerHTML += ataquesEstrella

                    /* Si en la primera seccion(primera ventana) no selecciono ningun personaje y le doy seleccionar, en consola me aparece error--> "Uncaught TypeError: Cannot read properties of undefined (reading 'forEach') at mostrarPoderes (mokepon.js:219:13) at extraerPoderes (mokepon.js:215:6) at HTMLButtonElement.seleccionarEstrellaJugador " En mi opinion, es por que al no seleccionar ninguna estrella, la variable estrellaJugador se queda vacia y luego no se puede comparar en la funcion extraerPoderes, entonces la variable poderes se queda vacia, entonces no se puede realizarle el forEach en la funcion mostrarPoderes. Cuando ya se selecciona, se llena la primera variable y se realiza el proceso completo*/
    })
        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botonAire = document.getElementById('boton-aire')
        botonRayo = document.getElementById('boton-rayo')
        botonMetal = document.getElementById('boton-metal')
        botonHielo = document.getElementById('boton-hielo')
        botones = document.querySelectorAll('.BAtaque')  /* funcion para decirle que seleccione a todos los elementos que tengan "BAtaque". poner id no se repite, es mala practica. Se repiten las clases, no los IDS.  Guardamos aqui todos los ataques y agregarles un evento de click, para los 2 que no tienen... */
         
  
    /* LO BORRAMOS POR QUE EL ADDEVENTLISTENER LO PUSIMOS YA DENTRO DE LA FUNCION secuenciaAtaque 
        botonFuego.addEventListener('click', ataqueFuego)
    
        botonAgua.addEventListener('click', ataqueAgua)
    
        botonTierra.addEventListener('click', ataqueTierra)
    
        botonAire.addEventListener('click', ataqueAire)
    
        botonRayo.addEventListener('click', ataqueRayo) */
}

function secuenciaAtaque() {
    
    botones.forEach((boton) => { /* por cada boton que exista en el erreglo de botones, has esto: agregarle el evento de click y validar cual es el valor que estamos seleecionando nsotros para jugar con el   */
        boton.addEventListener('click', (e) => { /* la e significa el evento mismo. Cuando le de clic me va a regresar cual es el elemento que esta sucediendo en ese momento. Nos permite entrar a las propiedades del objeto y eeste caso con target entramos a textContent para hallar el emogi de cada elemento y ver que hacemos con el  */
            if (e.target.textContent === "🔥") {
                ataqueJugador.push('FUEGO')/* adicionamos push de elemento FUEGO al arreglo que esta en la variable ataqueJugador  */
                console.log(ataqueJugador)
                boton.style.background = '#000000' /* al boton selleciionado se le cambia el fondo  */
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#000000'
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            } else if (e.target.textContent === "⚡") {
                ataqueJugador.push('RAYO')
                console.log(ataqueJugador)
                boton.style.background = '#000000'
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            } else if (e.target.textContent === "🌪") {
                ataqueJugador.push('AIRE')
                console.log(ataqueJugador)
                boton.style.background = '#000000'
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            } else if (e.target.textContent === "🌎") {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#000000'
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            }else if (e.target.textContent === "💿") {
                ataqueJugador.push('METAL')
                console.log(ataqueJugador)
                boton.style.background = '#000000'
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            }else {
                ataqueJugador.push('HIELO')
                console.log(ataqueJugador)
                boton.style.background = '#000000'
                boton.disabled = true
                cantidadAtaques++
                contadorAtaques = 'Ataque ' + cantidadAtaques + ': '
                creadorMensaje(contadorAtaques)
                crearMensajePreFinal('DEMUESTRA QUE SABES JUGAR')
            }
            //ataqueAleatEnemigo() /* lo metemos al flujo para que inmediatamente se de un click, tambien aparezca el poder del enemigo y no que aparezca el poder del enemigo primero */ //este ataque aleatorio del enemigo lo quitamos ya para el backend, por que los ataques d elos enemigos van a venir desde el servidor, se los envara cada jugador al servidor y luego este los distribuira todos a cada jugador de nuevo
            if (ataqueJugador.length === 7) {
                enviarAtaques()//funcion de Backend
            }
            
        })
    
    })        
        
     
}

function enviarAtaques() {

    fetch(`http://192.168.1.104:8080/estrellepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.104:8080/estrellepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 7) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
        }
    }) 
}

function seleccionarMascotaEnemigo(enemigo) {
    //let estrellaAleatorio = aleatorio(0, estrellas.length +1) /* 1 hasta longitud de estrellas en el arreglo. -1 por que se arranca desde 0  */
   
    /* SE BORRA PORQUE YA AUTOMATICAMENTE EL VALOR ALEATORO QUE SURJA, ESCOGERA UNA POSICION EN EL ARREGLO DE ESTRELLLAS Y BUSCARA EL NOMBRE, SIN USAR LOS CONDICIONALES.

     if (estrellaAleatorio == 1) {
        //lizeth
        spanMascotaEnemigo.innerHTML = 'Lizeth'
    } else if (estrellaAleatorio == 2) {
        //danilo
        spanMascotaEnemigo.innerHTML = 'Danilo'
    } else if (estrellaAleatorio == 3) {
        //camilo
        spanMascotaEnemigo.innerHTML = 'Camilo'
    } else { 
        //isabel
        spanMascotaEnemigo.innerHTML = 'Isabel'
    }   */
    
    estrellaDelEnemigo=enemigo
    spanMascotaEnemigo.innerHTML = enemigo.nombre /* entonces llamo al elemento en la posicion dentro del arreglo y asi quitamos los if/ellse y las entradas manuales */
    
    
 
    
   
    //ataquesEstrellaEnemigo = estrellas[estrellaAleatorio].ataques /* esto lo que hace es darle un valor de 7 a la variable  ataquesEstrellaEnemigo, que es la cantidad de poderes por cada personaje, pero solo me sirve si todos los personajes tienen la misma cantidad de poderes */
    /* console.log(estrellas[estrellaAleatorio].ataques.length -3) */
    validacionEstrella(estrellaDelJugador, estrellaDelEnemigo)
    
    ataquesEstrellaEnemigo = enemigo.ataques
    //console.log('numero ataques enemigo: ', enemigo.ataques.length)
    
}

function validacionEstrella(estrellaDelJugador, estrellaDelEnemigo) {    
    
    /* console.log(estrellaDelJugador)
    console.log(estrellaDelEnemigo)   */

    tipoEstrellaDelJugador = estrellaDelJugador.tipo
    tipoEstrellaDelEnemigo = estrellaDelEnemigo.tipo

    /* console.log(tipoEstrellaDelJugador)
    console.log(tipoEstrellaDelEnemigo) */

    nombreEstrellaJugador = estrellaDelJugador.nombre
    nombreEstrellaEnemigo = estrellaDelEnemigo.nombre

   /*  console.log(nombreEstrellaJugador)
    console.log(nombreEstrellaEnemigo)  */
    
    if (tipoEstrellaDelJugador === tipoEstrellaDelEnemigo){

        crearMensajePreFinal('Ambos poseen el mismo poder') 
        
    } else if (tipoEstrellaDelJugador ==='🔥') {
    
    
        if (tipoEstrellaDelJugador === '🔥' && tipoEstrellaDelEnemigo === '💿' || tipoEstrellaDelJugador === '🔥' && tipoEstrellaDelEnemigo === '❄' || tipoEstrellaDelJugador === '🔥' && tipoEstrellaDelEnemigo === '⚡') {
            AdicionarBotonJugador(estrellaDelJugador)  /* el contenido de abajo lo enviamos a una funcion para no repetir tanto */     

         /*    estrellaDelJugador.ataques.push(
            estrellaDelJugador.ataques[0] 
        ) 

            alert('El ataque ' + tipoEstrellaDelJugador + ' de la estrella ' +  nombreEstrellaJugador + ' posee mayor poder que el ataque ' + tipoEstrellaDelEnemigo + ' de la estrella ' + nombreEstrellaEnemigo)  */     
        } else {
            AdicionarBotonEnemigo(estrellaDelEnemigo)

           /*  estrellaDelEnemigo.ataques.push(
            estrellaDelEnemigo.ataques[0] 
         ) 

            alert('El ataque ' + tipoEstrellaDelEnemigo + ' de la estrella ' +  nombreEstrellaEnemigo + ' posee mayor poder que el ataque ' + tipoEstrellaDelJugador + ' de la estrella ' + nombreEstrellaJugador)   */
        }
    } else if (tipoEstrellaDelJugador ==='💧') {
             if (tipoEstrellaDelJugador === '💧' && tipoEstrellaDelEnemigo === '🔥' || tipoEstrellaDelJugador === '💧' && tipoEstrellaDelEnemigo === '🌎' || tipoEstrellaDelJugador === '💧' && tipoEstrellaDelEnemigo === '💿') {
                AdicionarBotonJugador(estrellaDelJugador)   
             } else {
                 AdicionarBotonEnemigo(estrellaDelEnemigo)
        }
    } else if (tipoEstrellaDelJugador ==='🌎') {
             if (tipoEstrellaDelJugador === '🌎' && tipoEstrellaDelEnemigo === '⚡' || tipoEstrellaDelJugador === '🌎' && tipoEstrellaDelEnemigo === '🔥' || tipoEstrellaDelJugador === '🌎' && tipoEstrellaDelEnemigo === '🌪') {
                AdicionarBotonJugador(estrellaDelJugador)  
             } else {
                 AdicionarBotonEnemigo(estrellaDelEnemigo)
        }
    } else if (tipoEstrellaDelJugador ==='🌪') {
             if (tipoEstrellaDelJugador === '🌪' && tipoEstrellaDelEnemigo === '💧' || tipoEstrellaDelJugador === '🌪' && tipoEstrellaDelEnemigo === '⚡' || tipoEstrellaDelJugador === '🌪' && tipoEstrellaDelEnemigo === '🔥') {
                AdicionarBotonJugador(estrellaDelJugador)  
             } else {
                 AdicionarBotonEnemigo(estrellaDelEnemigo)
        }
    } else if (tipoEstrellaDelJugador ==='⚡') {
             if (tipoEstrellaDelJugador === '⚡' && tipoEstrellaDelEnemigo === '❄' || tipoEstrellaDelJugador === '⚡' && tipoEstrellaDelEnemigo === '💿' || tipoEstrellaDelJugador === '⚡' && tipoEstrellaDelEnemigo === '💧') {
                AdicionarBotonJugador(estrellaDelJugador)  
             } else {
                 AdicionarBotonEnemigo(estrellaDelEnemigo)
        }
    } else if (tipoEstrellaDelJugador ==='💿') {
             if (tipoEstrellaDelJugador === '💿' && tipoEstrellaDelEnemigo === '🌎' || tipoEstrellaDelJugador === '💿' && tipoEstrellaDelEnemigo === '🌪' || tipoEstrellaDelJugador === '💿' && tipoEstrellaDelEnemigo === '❄') {
                AdicionarBotonJugador(estrellaDelJugador)  
             } else {
                 AdicionarBotonEnemigo(estrellaDelEnemigo)
        }
    } else {
            if (tipoEstrellaDelJugador === '❄' && tipoEstrellaDelEnemigo === '🌪' || tipoEstrellaDelJugador === '❄' && tipoEstrellaDelEnemigo === '💧' || tipoEstrellaDelJugador === '❄' && tipoEstrellaDelEnemigo === '🌎') {
                 AdicionarBotonJugador(estrellaDelJugador)       
             } else {
                 AdicionarBotonEnemigo(estrellaDelEnemigo)
        }
    }
    //console.log(estrellaDelEnemigo)  
    extraerPoderes(estrellaJugador)

    secuenciaAtaque()
} 

function AdicionarBotonJugador(estrellaElegidaJugador) {
            estrellaElegidaJugador.ataques.push(
            estrellaElegidaJugador.ataques[0] 
        ) 
            crearMensajePreFinal('El ataque ' + tipoEstrellaDelJugador + ' de la estrella ' +  nombreEstrellaJugador + ' posee mayor poder que el ataque ' + tipoEstrellaDelEnemigo + ' de la estrella ' + nombreEstrellaEnemigo)      
}

function AdicionarBotonEnemigo(estrellaElegidaEnemigo) {
            estrellaElegidaEnemigo.ataques.push(
            estrellaElegidaEnemigo.ataques[0] 
        ) 

           crearMensajePreFinal('El ataque ' + tipoEstrellaDelEnemigo + ' de la estrella ' +  nombreEstrellaEnemigo + ' posee mayor poder que el ataque ' + tipoEstrellaDelJugador + ' de la estrella ' + nombreEstrellaJugador)      
} 
        
/* LOS BORRAMOS POR QUE YA NO NOS SIRVEN. estas funciones ya las quitamos del addeventlistenes arriba 

function ataqueFuego() {
    ataqueJugador = 'FUEGO' 
    //alert("Tu estrella ha atacado con "+ataqueJugador)
    ataqueAleatEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA' 
   //alert("Tu estrella ha atacado con "+ataqueJugador)
    ataqueAleatEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA' 
    //alert("Tu estrella ha atacado con "+ataqueJugador)
    ataqueAleatEnemigo()
}

function ataqueAire() {
    ataqueJugador = 'AIRE'
    //alert("Tu estrella ha atacado con "+ataqueJugador)
    ataqueAleatEnemigo()
}

function ataqueRayo() {
    ataqueJugador = 'RAYO'
    //alert("Tu estrella ha atacado con "+ataqueJugador)
    ataqueAleatEnemigo()
} */

function aleatorio(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min)
}
     
function ataqueAleatEnemigo() {
    
    let ataqueAleatorio = aleatorio(0, ataquesEstrellaEnemigo.length - 1) 
    //console.log('ataques-enemigo', ataquesEstrellaEnemigo.length)

    ataquesEnemigo = ataquesEstrellaEnemigo[ataqueAleatorio]
    /* console.log(ataquesEstrellaEnemigo[ataqueAleatorio])  */
    /* ataqueEnemigo.innerHTML = ataquesEnemigo*/
   //console.log(ataquesEnemigo)

    if (ataquesEnemigo.nombre == '🔥') {
        ataqueEnemigo.push('FUEGO') 
 } else if (ataquesEnemigo.nombre == '💧') {
        ataqueEnemigo.push('AGUA') 
 } else if (ataquesEnemigo.nombre == '🌪') {
        ataqueEnemigo.push('AIRE') 
 } else if (ataquesEnemigo.nombre == '⚡') {
        ataqueEnemigo.push('RAYO') 
 } else if (ataquesEnemigo.nombre == '🌎') {
        ataqueEnemigo.push('TIERRA') 
 } else if (ataquesEnemigo.nombre == '💿') {
        ataqueEnemigo.push('METAL') 
 } else {
        ataqueEnemigo.push('HIELO') 
 }

    console.log(ataqueEnemigo)
    iniciarPelea()
        
    /*LOS QUITAMOS POR QUE QUISIMOS EVITAR hardCODEAR el poner directamente un elemento de acuerdo al numero aleatorio' */     
   /*  if (ataqueAleatorio == 2) {
        //fuego
        ataqueEnemigo.push('FUEGO')  /* .push solo se usa en variables que son arreglos 
        //alert("La estrella del enemigo atacó con " + ataqueEnemigo)
    } else if (ataqueAleatorio == 3) {
        //agua
        ataqueEnemigo.push('AGUA')
        //alert("La estrella del enemigo atacó con " + ataqueEnemigo)
    } else if (ataqueAleatorio == 1) {
        //tierra
        ataqueEnemigo.push('TIERRA')
        //alert("La estrella del enemigo atacó con " + ataqueEnemigo)
    } else if (ataqueAleatorio == 4) {
        //tierra
        ataqueEnemigo.push('AIRE')
        //alert("La estrella del enemigo atacó con " + ataqueEnemigo)
    }else {
        //Rayo
        ataqueEnemigo.push('RAYO')
        //alert("La estrella del enemigo atacó con " + ataqueEnemigo)
    }  */

   
    
      /* QUITAMOS LA FUNCION COMBATE Y PONEMOS iniciarPelea PARA AYUDAR A INICIALIZAR EL JUEGO, YA CON LOS ARREGLOS Y LAS SECUENCIAS, PARA LUEGO YA LANZAR EL JUEGO */
      /* combate() */
        
} 

function iniciarPelea() {
    /* EL NAVEGADOR DEBE ESPERAR A QUE YO TENGA UNA SECUENCIA DE 7 ATAQUES, PARA INICIALIZAR EL COMBATE  */
    if (ataqueJugador.length === 7) {/* cuando se hayan completado los 7 ataques,se inicializa el combate */
        
       /*  botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        botonAire.disabled = true
        botonRayo.disabled = true
        botonMetal.disabled = true
        botonHielo.disabled = true */
        subtitulo.style.display = 'none'
        contenedorAtaques.style.display = 'none'
        combate() 
    }
}

function indexAmbosOponentes(jugador, enemigo) { 
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) { /* este for me ayudará a generar un loop a traves de los 2 arreglos de ataqueJugador y ataqueEnemigo. Esto lo que hace es ayudarme a recorrer cada uno de los elementos que tiene mi arreglo */
        /* console.log(ataqueJugador[index]) */
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATADO")
            /* victoriasJugador
            spanVidasJugador.innerHTML = victoriasJugador */
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'METAL' || ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'HIELO' || ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'RAYO' || ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO' || ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'TIERRA' || ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'METAL' || ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'RAYO' || ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'FUEGO' || ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AIRE' || ataqueJugador[index] === 'AIRE' && ataqueEnemigo[index] === 'AGUA' || ataqueJugador[index] === 'AIRE' && ataqueEnemigo[index] === 'RAYO' || ataqueJugador[index] === 'AIRE' && ataqueEnemigo[index] === 'FUEGO' || ataqueJugador[index] === 'RAYO' && ataqueEnemigo[index] === 'HIELO' || ataqueJugador[index] === 'RAYO' && ataqueEnemigo[index] === 'METAL' || ataqueJugador[index] === 'RAYO' && ataqueEnemigo[index] === 'AGUA' || ataqueJugador[index] === 'METAL' && ataqueEnemigo[index] === 'TIERRA' || ataqueJugador[index] === 'METAL' && ataqueEnemigo[index] === 'AIRE' || ataqueJugador[index] === 'METAL' && ataqueEnemigo[index] === 'HIELO' || ataqueJugador[index] === 'HIELO' && ataqueEnemigo[index] === 'AIRE' || ataqueJugador[index] === 'HIELO' && ataqueEnemigo[index] === 'AGUA' || ataqueJugador[index] === 'HIELO' && ataqueEnemigo[index] === 'TIERRA' ) {
            indexAmbosOponentes(index, index)
            crearMensaje('GANADO')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            /* NO INTERESAN EN NUEVO JUEGO
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo YA */
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDIDO')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }    
            
        
    }


  /* ESTO SE BORRA POR QUE YA SE HACE ARRIBA CON LOS INDEX
    if(ataqueJugador == ataqueEnemigo) {
         crearMensaje("EMPATE")
    }else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' ||ataqueJugador == 'FUEGO' && ataqueEnemigo == 'AIRE' ||ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'AGUA' && ataqueEnemigo == 'RAYO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA' ||ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AIRE' || ataqueJugador == 'AIRE' && ataqueEnemigo == 'RAYO' || ataqueJugador == 'AIRE' && ataqueEnemigo == 'AGUA' || ataqueJugador == 'RAYO' && ataqueEnemigo == 'TIERRA' || ataqueJugador == 'RAYO' && ataqueEnemigo == 'FUEGO') {
     //alert("GANASTE MY PERR")
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

   
    } else {
        crearMensaje('PERDISTE')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador

    //perdidas = perdidas + 1
    } */

    revisarVidas() /* revisarVictorias en nuevo juego */
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        //ganamos
        crearMensajeFinal("Hubo un empate, vuelve a intentarlo")
    }else if(victoriasJugador >victoriasEnemigo) {
        //perdimos
        crearMensajeFinal("LO LOGRASTE. GANASTE!!")

    } else {
        crearMensajeFinal("Eres un perdedor")
    }




/*     if (vidasEnemigo == 0) {
        //ganamos
        crearMensajeFinal("Felicitaciones!!! GANASTE EL JUEGO")
    }else if(vidasJugador == 0) {
        //perdimos
        crearMensajeFinal("PERDISTE TUS 3 VIDAS! Vuelve a intentarlo...")

    }
 */
}

function crearMensaje(result) {
    /* console.log(result) */

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let nuevoMensajeAtaque = document.createElement('p') /* en este caso especifico no se puede hacer que vaya apareciendo si por cada ataque gana, pierde o empata, por que primero el jugador debe elegir los 7 ataques y luego el algoritmo hace el recorrido y halla los gana, pierde o empata. por eso se espera a escogerlos todos y luego aparecen todos juntos*/

    
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    nuevoMensajeAtaque.innerHTML  = result
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    divMensajeCadaAtaque.appendChild(nuevoMensajeAtaque)
    
}
    
function creadorMensaje(contador) {
   /*  console.log(contador) */

    let nuevoNumeroAtaque = document.createElement('p')

    nuevoNumeroAtaque.innerHTML = contador
    
    pNumeroAtaques.appendChild(nuevoNumeroAtaque)
    
}

/* function crearMensajeCadaAtaque(resulta) {

    divMensajeCadaAtaque.innerHTML = resulta

} */

function crearMensajePreFinal(resultadoPreFinal) {
    

    spanMensajes.innerHTML = resultadoPreFinal
    
    
        /* botonFuego.disabled = true
    
        botonAgua.disabled = true
    
        botonTierra.disabled = true
    
        botonAire.disabled = true
    
        botonRayo.disabled = true */

    
   /*  botonReiniciarJuego.style.display = 'block' */
}

function crearMensajeFinal(resultadoFinal) {
    

    spanMensajes.innerHTML = resultadoFinal
    
    
        /* botonFuego.disabled = true
    
        botonAgua.disabled = true
    
        botonTierra.disabled = true
    
        botonAire.disabled = true
    
        botonRayo.disabled = true */

    
    botonReiniciarJuego.style.display = 'block'
}

function reiniciarJuego() {
   location.reload() 
}

function pintarCanvas() {
    //console.log(estrellaJugadorObjeto)
    estrellaJugadorObjeto.x = estrellaJugadorObjeto.x + estrellaJugadorObjeto.velocidadX //cada vez que pintamos el personje, vamos a irlo actualizando, dependiendo de la velocidad que tenga en ese momento
    estrellaJugadorObjeto.y = estrellaJugadorObjeto.y + estrellaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height) //funcion para limpiar canvas
    /* console.log(elegido) */ 
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    estrellaJugadorObjeto.pintarEstrella()
        //Backend:
    enviarPosicion(estrellaJugadorObjeto.x, estrellaJugadorObjeto.y)

    /* lizethEnemigo.pintarEstrella()
    daniloEnemigo.pintarEstrella()
    camiloEnemigo.pintarEstrella()
    isabelEnemigo.pintarEstrella()
    alexanderEnemigo.pintarEstrella()
    andersonEnemigo.pintarEstrella()
    tobiEnemigo.pintarEstrella()
    eylinEnemigo.pintarEstrella() */ //los quitamos y pintamos variable global de enemigos BACKEND (para que no titile)
    estrelleponesEnemigos.forEach(function (estrellepon) {
        estrellepon.pintarEstrella()
        revisarColision(estrellepon) //reviso colision con cada uno de los personajes de los miembros de la partida y borro las colisiones con cada enemigo personalizado debajo
    })

    /* if (estrellaJugadorObjeto.velocidadX != 0 || estrellaJugadorObjeto.velocidadY != 0) {
        revisarColision(lizethEnemigo)
        revisarColision(daniloEnemigo)
        revisarColision(camiloEnemigo)
        revisarColision(isabelEnemigo)
        revisarColision(alexanderEnemigo)
        revisarColision(tobiEnemigo)
        revisarColision(andersonEnemigo)
        revisarColision(eylinEnemigo) 
    }*/
    /* lienzo.drawImage(  //dibuja espacio para subir una imagen 
        estrellaJugadorObjeto.mapaFoto, //aqui sube la imagen guardada en mapaFoto
        estrellaJugadorObjeto.x,
        estrellaJugadorObjeto.y,
        estrellaJugadorObjeto.ancho,
        estrellaJugadorObjeto.alto,
    )  */
}  

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.104:8080/estrellepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y //se pone solo x y por que la clave es igual que el valor x=x (son las mismas)
        })

    })
    //ahora creamos un .then para recibir la respuesta del servidor con las coordenadas de los enemigos 
        .then(function (res) { 
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) { //se hace un .then para leer su respuesta por que json tambien es una promesa
                        console.log(enemigos) //extraemos directamente la variable enemigos con llaves(tambien se puede con respuesta)
                        //aqui nos imprime en consola los enmigos unidos a la partida y sus corrdenadas
                        //ahora, no queremos que se generen enemigos automaticamente, si no que los que se vayan uniendo a la partida, vayan a apareciendo con sus coordenadas, para eso vamos a la seccion donde se crearon  a los primeros enemigos y los eliminamos y los traemos aqui, pero primero debemos ver la lista de enemigos enviada por el servidor, ver que nombre, id y coordenadas traen y de acuerdo a eso les asignamos sus datos aca para crearlos en pantalla: 

                        //Usamos un foreach para recoorrer la lista de enemigos enviada por el servidor y por cada elemento de la lista ejecutara una funcion.
                        //enemigos.forEach(function (enemigo) { //la quitamos para poner map, por que map tambien me hace lo de "por cada elemento de la lista, ejecutar esta funcion (como forEach), pero ademas me retorna un valor generando una nueva lista con el mismo numero de elementos que la lista original. Guardamos esto en la variable que creamos
                            estrelleponesEnemigos = enemigos.map(function (enemigo) {
                            let estrelleponEnemigo = null //creamos una variable general para dibujar cada estreelleponEnemigo sin importar el nombre 
                            const estrelleponNombre = enemigo.estrellepon.nombre || ""
                            
                            if (estrelleponNombre === "Lizeth") {
                                //let lizethEnemigo = new Estrella('Lizeth', './assets/l<izeth.jpg', 5, '💧', './assets/toad31.png'/* , 615, 10 */)
                                 estrelleponEnemigo = new Estrella('Lizeth', './assets/lizeth.jpg', 5, '💧', './assets/toad31.png', enemigo.id/* , 615, 10 */)
                                
                            }
                            else if (estrelleponNombre === "Danilo") {
                                //let daniloEnemigo = new Estrella('Danilo', './assets/danilo.jpg', 5, '⚡', './assets/bowser3.png'/* , 615, 420 */)
                                 estrelleponEnemigo = new Estrella('Danilo', './assets/danilo.jpg', 5, '⚡', './assets/bowser3.png', enemigo.id/* , 615, 420 */)
                                
                            }
                            else if (estrelleponNombre === "Camilo") {
                                //let camiloEnemigo = new Estrella('Camilo', './assets/camilo.jpg', 5, '🔥', './assets/goombas3.png'/* , 290, 40 */)
                                 estrelleponEnemigo = new Estrella('Camilo', './assets/camilo.jpg', 5, '🔥', './assets/goombas3.png', enemigo.id/* , 290, 40 */)
                            
                            }
                            else if (estrelleponNombre === "Isabel") {
                                //let isabelEnemigo = new Estrella('Isabel', './assets/isabel.jpg', 5, '🌎', './assets/estrella3.png'/* , 105, 175 */)
                                 estrelleponEnemigo = new Estrella('Isabel', './assets/isabel.jpg', 5, '🌎', './assets/estrella3.png', enemigo.id/* , 105, 175 */)
                                
                            }
                            else if (estrelleponNombre === "Alexander") {
                                //let alexanderEnemigo = new Estrella('Alexander', './assets/alexander.jpg', 5, '🌪', './assets/luigi31.png'/* , 360, 235 */)
                                 estrelleponEnemigo = new Estrella('Alexander', './assets/alexander.jpg', 5, '🌪', './assets/luigi31.png', enemigo.id/* , 360, 235 */)
                                
                            }
                            else if (estrelleponNombre === "Tobi") {
                                //let tobiEnemigo = new Estrella('Tobi', './assets/tobi.jpg', 5, '❄', './assets/yoshi.png'/* , 370, 400 */)
                                 estrelleponEnemigo = new Estrella('Tobi', './assets/tobi.jpg', 5, '❄', './assets/yoshi.png', enemigo.id/* , 370, 400 */)
                                
                            }
                            else if (estrelleponNombre === "Anderson") {
                                //let andersonEnemigo = new Estrella('Anderson', './assets/anderson.jpg', 5, '💿', './assets/torti.png'/* , 730, 80 */)
                                 estrelleponEnemigo = new Estrella('Anderson', './assets/anderson.jpg', 5, '💿', './assets/torti.png', enemigo.id/* , 730, 80 */)
                                
                            }
                            else if (estrelleponNombre === "Eylin") {
                                //let eylinEnemigo = new Estrella('Eylin', './assets/eylin.jpg', 5, '💧', './assets/mario31.png'/* , 650, 265 */)
                                 estrelleponEnemigo = new Estrella('Eylin', './assets/eylin.jpg', 5, '💧', './assets/mario31.png', enemigo.id/* , 650, 265 */)
                                
                            }

                            


                            estrelleponEnemigo.x = enemigo.x// ver como sale, de donde sale?? 
                            estrelleponEnemigo.y = enemigo.y// ver como sale, de donde sale??
                            //estrelleponEnemigo.pintarEstrella()//AQUI VAMOS PINTANDO CADA JUGADOR UNIDO A LA PARTIDA//lo quito y solo retorno estrelleponEnemigo
                                return estrelleponEnemigo

                        })

                    })
            }
        })

}
    

//function moverLizethDerecha() {
function moverDerecha() {
    //lizeth.x = lizeth.x + 5 
    //pintarCanvas() //quitamos esto porque pintaria al personaje una vez cuando le de click y ya mas nada y necesitamos que lo este pintando minetras tenga el click
    estrellaJugadorObjeto.velocidadX = 5 //lizeth va a mantener esa vellocidad hasta que se suelte el boton
}

function moverIzquierda() {
    //lizeth.x = lizeth.x - 5
    //pintarCanvas()
    estrellaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {

    //lizeth.y = lizeth.y + 5
    //pintarCanvas()
    estrellaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    
    //lizeth.y = lizeth.y - 5
    //pintarCanvas()
    estrellaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {

    estrellaJugadorObjeto.velocidadX = 0
    estrellaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'd':
            moverArriba()
            break
        case 's':
            moverArriba()
            break
        case 'x':
            moverAbajo()
            break
        case 'z':
            moverIzquierda()
            break
        case 'c':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
   /*  mapa.width = 840
    mapa.height = 473 */
    estrellaJugadorObjeto = obtenerObjetoEstrella(estrellaJugador)
    console.log(estrellaJugadorObjeto, estrellaJugador);
    //console.log(estrellaJugadorObjeto,estrellaJugador)
    intervalo = setInterval(pintarCanvas, 50) // Va a pintarme el personaje cada 50 milisegundos, para que se pueda ver el movimiento en cada direccion y no solo se pinte una vez
    window.addEventListener('keydown', sePresionoUnaTecla) //keydown se activa cuando se presiona una tecla
    window.addEventListener('keyup', detenerMovimiento) //keydown se activa cuando se suelta una tecla
}

function obtenerObjetoEstrella() {
     for (let i = 0; i < estrellas.length; i++) {
        if (estrellaJugador === estrellas[i].nombre) {
            return estrellas[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaEstrella = estrellaJugadorObjeto.y
    const abajoEstrella = estrellaJugadorObjeto.y + enemigo.alto
    const derechaEstrella = estrellaJugadorObjeto.x + enemigo.ancho
    const izquierdaEstrella = estrellaJugadorObjeto.x

    if (//todo esto ya viene predeterminado para revisar colisiones 
        abajoEstrella < arribaEnemigo ||
        arribaEstrella > abajoEnemigo ||
        derechaEstrella < izquierdaEnemigo ||
        izquierdaEstrella > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    //botonMovimientoPersonaje.disabled = true
    
    clearInterval(intervalo)
    alert("Hay colision con " + enemigo.nombre)
    

    enemigoId = enemigo.id
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    seleccionarMascotaEnemigo(enemigo)
    
    /* estrellaDelEnemigo = enemigo
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    validacionEstrella(estrellaDelJugador, estrellaDelEnemigo) */ 
    
}
    window.addEventListener('load', iniciarJuego)//cuando se hay acargado el juego, entonces se activan las funciiones


//hacer que no se llene el contenedor mas de  una vez (funcion mostrarPoderes): solucion seria hacer que las demas personajes aparezcan en una posicion diferente al mi personaje

//hacer que personajes queden igualmente disminuyan con el mapa: solucion, que se disminuyan a corde a como disminuye el mapa multiplicandolos por el


//botones no sirven en celular: pendiente






/* VIDEOS SOBRE BACKEND 

Descargamos node.js
usamos npm init
node index.js
luego la libreria Express.js para crear servidores web
conceptos:
En node.js necesitamos instalar javaScript e intalar express y despues decirle a nuestro codigo que la estamos usando (importar la libreria). tambien indicarle configuraciones de puerto de nuestro servidor (codigo: identificador unico que nos dice a que servidor nos estamos conectando en una computadora)




*/

