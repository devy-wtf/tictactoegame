let tablero = array(9).fill("")

let jugadorActual = "X"
let juegoTerminado = false
let turnoCpu =  false


const combGanadoras = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
]


let gameOver = false

function statusJuego(){
    for (let combinación of combGanadoras){
        const [a, b, c] = combinación
        if(
            tablero[a] !== "" &&
            tablero[b] === tablero[b] &&
            tablero[c] === tablero[c]


        )}
    
}




const celdas = document.querySelectorAll('.celda')

celdas.forEach(celda =>{
    const index = parseInt(celda.dataset.index)
    cell.addEventListener("click", () => movimiento(index, celda))
}

)


function movimiento(index, celdaElement){
    if(tablero[index] !== "") return;

    tablero[index] = jugadorActual
    celdaElement.textContent = jugadorActual
    celdaElement.classList.add(`marcado-${currentPlayer.toLowerCase()}`);


    jugadorActual = jugadorActual === "X" ? "O" : "X"
}



