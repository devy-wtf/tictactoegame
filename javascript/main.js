let tablero = ["","","","","","","","",""]

let jugadorActual = "X"
let juegoTerminado = false
let turnoCpu =  false
let gameOver = false

const combGanadoras = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
]


function statusJuego() {
    for (let combinación of combGanadoras) {
        const [a, b, c] = combinación;
        if (
            tablero[a] !== "" &&
            tablero[a] === tablero[b] &&
            tablero[a] === tablero[c]
        ) {
            gameOver = true;
            mostrarResultado(`Ganador: Jugador ${tablero[a] === "X" ? "1" : "2"}`)
            break;
        }
    }
    if(!tablero.includes("") && !gameOver){
        gameOver = true
        mostrarResultado("Empate")
    }



}



function mostrarResultado(message){
    const resultadoElement = document.getElementById('resultado')
    resultadoElement.textContent = message
    resultadoElement.classList.add('visible     ')

}



const celdas = document.querySelectorAll('.celda')

celdas.forEach((celda, index) => {
  celda.setAttribute("data-index", index);
  celda.addEventListener("click", () => movimiento(index, celda));
});



function movimiento(index, celdaElement){
    if(tablero[index] !== "" || gameOver) return;

    tablero[index] = jugadorActual
    const marca = document.createElement ('p')
    marca.textContent = jugadorActual
    celdaElement.classList.add(`marcado-${jugadorActual.toLowerCase()}`)
    celdaElement.appendChild(marca)

    statusJuego()


    jugadorActual = jugadorActual === "X" ? "O" : "X"
}



