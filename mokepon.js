const sectSelectAtack = document.getElementById('seleccionar-ataque')
const sectReiniciar = document.getElementById('reiniciar')
const btnMascotaJugador = document.getElementById('btn-mascota')
const botonReiniciar = document.getElementById('btn-reiniciar')
sectReiniciar.style.display='none'; 

const sectSelectMascota= document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidaJugador = document.getElementById('vidas-jugador')
const spanVidaEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataque-de-jugador')
const ataquesDelEnemigo = document.getElementById('ataque-de-enemigo')
const containerTarjetas = document.getElementById('container-tarjetas')
const containerAtaques = document.getElementById('contenedor-ataques')

const sectionMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoID = null
let entrando = 0
let mokepones = [] //aca se almacenaran los objetos creados en la class Mokepon
let playerAttack = []
let mokeponesEnemigos = []
let ataqueJugador =[]
let ataquePc = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = []
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")//de esta forma podemos usar el lienzo para dibujar en el canvas a 2 dimensiones
let intervalo;
let mapaBackground = new Image()
mapaBackground.src = './image/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, imagen, vida, fotoMapa, id = null)//esto seria los atributos o propiedades de nuestros mokepones
        {
        this.id = id
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './image/hipodoge.png', 5, './image/hipodogeCabeza.png' ) // new nos crea un nuevo objeto, en este caso se crea el objeto hipodoge dentro de la class Mokepon y de parametro le adjuntamos las propiedades (nombre, imagen, vida)
let capipepo = new Mokepon('Capipepo', './image/capipepo.png', 5, './image/capipepoCabeza.png')
let ratigueya = new Mokepon('Ratigueya', './image/ratigueya.png', 5, './image/ratigueyaCabeza.png')
let falky = new Mokepon('Falky', './image/falky.png', 5, './image/falkyCabeza.png')
let kinerilla = new Mokepon('Kinerilla', './image/kinerilla.png', 5, './image/kinerillaCabeza.png')
let ilamet = new Mokepon('Ilamet', './image/ilamet.png', 5, './image/ilametCabeza.png')
let hipodogeEnemigo = new Mokepon('Hipodoge', './image/hipodoge.png', 5, './image/hipodogeCabeza.png' ) // new nos crea un nuevo objeto, en este caso se crea el objeto hipodoge dentro de la class Mokepon y de parametro le adjuntamos las propiedades (nombre, imagen, vida)
let capipepoEnemigo = new Mokepon('Capipepo', './image/capipepo.png', 5, './image/capipepoCabeza.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './image/ratigueya.png', 5, './image/ratigueyaCabeza.png')
let falkyEnemigo = new Mokepon('Falky', './image/falky.png', 5, './image/falkyCabeza.png')
let kinerillaEnemigo = new Mokepon('Kinerilla', './image/kinerilla.png', 5, './image/kinerillaCabeza.png')
let ilametEnemigo = new Mokepon('Ilamet', './image/ilamet.png', 5, './image/ilametCabeza.png')

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)
capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)

const FALKY_ATAQUES = [
    { nombre: '🌱', id: 'btn-fuego' },
    { nombre: '💧', id :'btn-agua' },
    { nombre: '🌱', id :'btn-tierra' },
    { nombre: '🌱', id :'btn-tierra' },
    { nombre: '🌱', id :'btn-tierra' },
]
falky.ataques.push(...FALKY_ATAQUES)
falkyEnemigo.ataques.push(...FALKY_ATAQUES)

const KINERILLA_ATAQUES = [
    { nombre: '🔥', id :'btn-fuego' },
    { nombre: '🔥', id :'btn-fuego' },
    { nombre: '🔥', id :'btn-fuego' },
    { nombre: '🌱', id :'btn-tierra' },
    { nombre: '🌱', id :'btn-tierra' }
]
kinerilla.ataques.push(...KINERILLA_ATAQUES)
kinerillaEnemigo.ataques.push(...KINERILLA_ATAQUES)

const ILAMET_ATAQUES = [
    { nombre: '💧', id :'btn-agua' },
    { nombre: '💧', id :'btn-agua' },
    { nombre: '💧', id :'btn-agua' },
    { nombre: '🌱', id :'btn-tierra' },
    { nombre: '🌱', id :'btn-tierra' }
]
ilamet.ataques.push(...ILAMET_ATAQUES)
ilametEnemigo.ataques.push(...ILAMET_ATAQUES)


mokepones.push(hipodoge,capipepo,ratigueya, falky, kinerilla, ilamet)

function iniciarJuego() {
    
    sectSelectAtack.style.display = 'none'
    sectionMapa.style.display = 'none'

    //el metodo forEach nos itera por cada elemento que hay dentro de nuestro array
    //en este caso que pasa, por cada elemento en el array, genera esta estructura de html, en el html para asi generarlo de forma automatica por cada mokepon que exista dentro de nuestro array
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.imagen} alt=${mokepon.nombre}>
        </label>
        `
        // con la comilla invertida podemos insertar la estructura de nuestro html a la cual queremos inyectar informacion de nuestros objetos. Luego vamos a asociar nuestra estructura html con las propiedades de los objetos previamente definidas, es decir EJ cambianos el valor del id que tenia el html por la clase junto a la propiedad del objeto en cuestion, en esta primera vez cambianos el id, for, el texto en el parrafo y el alt que decia hipodoe y la asociamos con mokepon.nombre, porque es la propiedad citada... Asi sucesivamente con las otras propiedades. Una vez que hagamos esto, ya no se necesitaria ese elemento citado en el HTML

    containerTarjetas.innerHTML += opcionDeMokepones //asi hacemos que se muestre el resultado de lo anteriormente codificado

    inputHipodoge = document.getElementById('Hipodoge')
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    inputFalky = document.getElementById('Falky');
    inputKinerilla = document.getElementById('Kinerilla');
    inputIlamet = document.getElementById('Ilamet')

    })
    
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador) //asi podemos escuchar el evento del html, en este caso el evento click y le pasamos como parametro a la funcion seleccionarMascotaJugador

    //aca podemos seleccionar cada ataque que usaremos en combate con su respectivo id
    //luego vinculamos nuestra variable con el evento escuchador de click junto a la funcion de dicho ataque

    botonReiniciar.addEventListener('click', reiniciarJuego)

    /* unirseAlJuego() */
}

function unirseAlJuego() {
    fetch("http://192.168.1.115:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else if(inputFalky.checked){
        spanMascotaJugador.innerHTML = inputFalky.id;
        mascotaJugador = inputFalky.id;
    }else if(inputKinerilla.checked){
        spanMascotaJugador.innerHTML = inputKinerilla.id;
        mascotaJugador = inputKinerilla.id;
    }else if(inputIlamet.checked){
        spanMascotaJugador.innerHTML = inputIlamet.id;
        mascotaJugador = inputIlamet.id;
    } else {
        alert('Debes seleccionar alguna mascota!')
        return //asi podremos detener la ejecucion del juego si no se seleccionó una mascota
    }

    /* ------------->
     sectSelectMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador) */
    sectSelectMascota.style.display = 'none'
    extraerAtaques(mascotaJugador)
    sectionMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.115:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques /* de esta forma decimos que mientras mascotaJudor se exactamente igual al nombre seleccionado de nuestro array de mokepones
             vamos a almacenar en nuestra variable ataques, los ataques que tenemos en cada una de nuestras mascotas */
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="btn-ataque BAttack">${ataque.nombre}</button>
        `
        containerAtaques.innerHTML += ataquesMokepon
    })

    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')
    botones = document.querySelectorAll('.BAttack')//esto selecciona todos los elementos con la misma clase (en este caso BAttack)
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#068FFF'
                boton.disabled = true   
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#068FFF'
                boton.disabled = true  
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#068FFF'
                boton.disabled = true  
            }
            if (ataqueJugador.length === 5) {
                /*  -----> enviarAtaques() */
                ataqueAleatorioEnemigo()
            }
        })
    })
    

}

function enviarAtaques() {
    fetch(`http://192.168.1.115:8080/mokepon/${jugadorId}/ataques`, {
        method : "post",
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
    fetch(`http://192.168.1.115:8080/mokepon/${enemigoID}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataquePc = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataquePc.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataquePc.push('AGUA')
    } else {
        ataquePc.push('TIERRA')
    }
    console.log(ataquePc)
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataquePc[enemigo]
}

function combate() {
    clearInterval(intervalo)
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataquePc[index]) {
            indexAmbosOponente(index, index)
            mensajeFinal("HA OCURRIDO UN EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataquePc[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            mensajeFinal("HAS GANADO")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataquePc[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            mensajeFinal("HAS GANADO")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataquePc[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            mensajeFinal("HAS GANADO")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            mensajeFinal("HAS PERDIDO")
            victoriasEnemigo++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
    }

    vidas()
}

function vidas() {
    if (victoriasJugador === victoriasEnemigo) {
        mensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        mensajeFinal('FELICIDADES, has Ganado!🎉')
    } else {
        mensajeFinal('HAS PERDIDO!! 😭')
    }
}

function mensajeFinal(resultado) {//aca establecemos nuestro parametro resultado el cual será otorgado por la funcion combate mediante los argumentos que siguen al llamado de la funcion mensaje
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    sectReiniciar.style.display = 'block'
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()/* location es un objeto que se refiere netamente a una ubicacion de nuestro navegador (url exacto)
    reload es un metodo de location que es una funcion que recarga la ubicacion inicial */
    

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    falkyEnemigo.pintarMokepon()
    kinerillaEnemigo.pintarMokepon()
    ilametEnemigo.pintarMokepon()

    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(falkyEnemigo)
        revisarColision(kinerillaEnemigo)
        revisarColision(ilametEnemigo)
    }

    /* ----------> 
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
        if(mokepon != undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }

        mokepon.pintarMokepon();
        if( entrando !== 0) {
            revisarColision(mokepon)
        }else {
            entrando = 1
        }

    }) */
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.115:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        if (enemigo.mokepon != undefined) {
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                        /* const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './image/hipodoge.png', 5, './image/hipodogeCabeza.png', enemigo.id)     
                        }
                        else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = mokeponEnemigo = new Mokepon('Capipepo', './image/capipepo.png', 5, './image/capipepoCabeza.png', enemigo.id )
                        }
                        else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './image/ratigueya.png', 5, './image/ratigueyaCabeza.png', enemigo.id)
                        }
                        else if (mokeponNombre === "Falky") {
                            mokeponEnemigo = new Mokepon('Falky', './image/falky.png', 5, './image/falkyCabeza.png', enemigo.id)
                        }
                        else if (mokeponNombre === "Kinerilla") {
                            mokeponEnemigo = new Mokepon('Kinerilla', './image/kinerilla.png', 5, './image/kinerillaCabeza.png', enemigo.id)
                        }
                        else if (mokeponNombre === "Ilamet") {
                            mokeponEnemigo = new Mokepon('Ilamet', './image/ilamet.png', 5, './image/ilametCabeza.png', enemigo.id)
                        } */

                        switch (mokeponNombre)
                            {
                            case "Hipodoge":  
                                mokeponEnemigo = new Mokepon('Hipodoge', './image/hipodoge.png', 5, './image/hipodogeCabeza.png', enemigo.id) 
                                break

                            case "Capipepo":
                                mokeponEnemigo = new Mokepon('Capipepo', './image/capipepo.png', 5, './image/capipepoCabeza.png', enemigo.id )
                                break

                            case "Ratigueya":
                                mokeponEnemigo = new Mokepon('Ratigueya', './image/ratigueya.png', 5, './image/ratigueyaCabeza.png', enemigo.id)
                                break

                            case "Falky":
                                mokeponEnemigo = new Mokepon('Falky', './image/falky.png', 5, './image/falkyCabeza.png', enemigo.id)
                                break

                            case "Kinerilla":
                                mokeponEnemigo = new Mokepon('Kinerilla', './image/kinerilla.png', 5, './image/kinerillaCabeza.png', enemigo.id)
                                break

                            case "Ilamet":
                                mokeponEnemigo = new Mokepon('Ilamet', './image/ilamet.png', 5, './image/ilametCabeza.png', enemigo.id)
                                break

                            default :

                            break  
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                }})
                })
        }
    })
}

function moverR() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverL() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverB() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverT() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaSelected(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverT()
            break
        case 'ArrowDown':
            moverB()
            break
        case 'ArrowLeft':
            moverL()
            break
        case 'ArrowRight':
            moverR()
            break
        default:
            break
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = objetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)//setInterval es una funcion que llama a una funcion especificada esperando un periodo de tiempo, ambos se les da por parametro. En este casose llama a la funcion pintarCanvas y luego cada cuanto en mili segundo, se ejecutará
    
    window.addEventListener('keydown', teclaSelected)

    window.addEventListener('keyup', detenMovimiento)
}

function objetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]// asi podemos obtener el objeto de nuestra seleccion en nuestro mapa
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto//esto es porque enemigo.y es la posicion inicial donde se pinta al enemigo y sumarle el alto te da la posicion donde deja de dibujar a este
    const derechaEnemigo = enemigo.x + enemigo.ancho//la posicion inical es a la izquierda y se le suma el ancho para saber hasta donde pinta al enemigo
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x


    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    /* -------> 
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return //se deja un return porque en estos casos, no hubo colision, por lo cual, no se hara nada
    } */

    detenMovimiento()
    clearInterval(intervalo)//de esta forma detenemos el intervalo para que no siga ejecutando la funcion de pintar
    console.log('Se detecto una colision');

    enemigoID = enemigo.id
    sectSelectAtack.style.display = 'flex'
    sectionMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)