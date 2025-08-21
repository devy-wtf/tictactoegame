let tablero = Array(9).fill("");
let jugadorActual = "X";
let gameOver = false;
let modoJuego = "multijugador"

const combGanadoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

document.addEventListener("DOMContentLoaded", () => {
  asignarCualidades();
  document.getElementById("btnReiniciar").addEventListener("click", reiniciarJuego);
  
  document.getElementById('multijugador').addEventListener("click", () =>{
    modoJuego = "multijugador"
    document.body.classList.remove("modo-cpu");

    reiniciarJuego()
})


document.getElementById('vsCpu').addEventListener("click", () =>{
    modoJuego = "cpu"
    document.body.classList.add("modo-cpu");
    reiniciarJuego()
})

});

function asignarCualidades() {
  const celdas = document.querySelectorAll(".celda");
  celdas.forEach((celda, index) => {
    celda.textContent = "";
    celda.classList.remove("marcado-x", "marcado-o");
    celda.innerHTML = ""; 
    celda.addEventListener("click", () => movimiento(index, celda));
  });
}

function movimiento(index, celdaElement) {
  if (tablero[index] !== "" || gameOver) return;

  tablero[index] = jugadorActual;

  const marca = document.createElement("p");
  marca.textContent = jugadorActual;
  celdaElement.classList.add(`marcado-${jugadorActual.toLowerCase()}`);
  celdaElement.appendChild(marca);

  statusJuego();
    if(!gameOver){
  jugadorActual = jugadorActual === "X" ? "O" : "X";

  if(modoJuego === "cpu" && jugadorActual === "O"){
    setTimeout(jugadaBot, 300)
  }
  }


    }

function statusJuego() {
  for (let combinación of combGanadoras) {
    const [a, b, c] = combinación;
    if (
      tablero[a] !== "" &&
      tablero[a] === tablero[b] &&
      tablero[a] === tablero[c]
    ) {
      gameOver = true;
      mostrarResultado(`Ganador: Jugador ${tablero[a] === "X" ? "1" : "2"}`);
      return;
    }
  }
  if (!tablero.includes("") && !gameOver) {
    gameOver = true;
    mostrarResultado("Empate");
  }
}




function jugadaBot(){
    const mejorMovimiento = obtenerMejorMovimiento(tablero)
    const celdaBot = document.querySelectorAll('.celda')[mejorMovimiento]
    movimiento(mejorMovimiento, celdaBot)
}


function obtenerMejorMovimiento(tableroActual){
    let mejorScore = -Infinity
    let movimiento = null

    for(let index = 0; i < tableroActual.length; i++){
        if (tableroActual[i] ===""){
            tableroActual[i]= "O"
            let score = minimax(tableroActual, 0, false)
            tableroActual[i] = ""



            if (score > mejorScore) {
                mejorScore = score
                movimiento = i
                
            }
        }
    }

    return movimiento

}

function minimax(tableroSimulado, profundidad, esMaximizador) {
    const resultado = evaluar(tableroSimulado)
    if(resultado !== null) return resultado

    if(esMaximizador) {
        let mejorScore = -Infinity
        for(let i = 0; i< tableroSimulado.length; i++){
            if(tableroSimulado[i] === ""){
                tableroSimulado[i] = "O"
                let score = minimax(tableroSimulado, profundidad + 1, false)
                tableroSimulado[i] = ""
                mejorScore = Math.max(score, mejorScore)
            }
        }
        return mejorScore

    } else{
        let peorScore = -Infinity
        for(let i = 0; i<tableroSimulado.length; i++){
            tableroSimulado[i] = "X"
            let score = minimax(tableroSimulado, profundidad + 1, true)
            tableroSimulado[i] = ""
            peorScore = Math.min(score, peorScore)
        }
        return peorScore
    }
    


}


function evaluar(tableroEval) {
    for(let combo of combGanadoras) {
        const [a,b,c] = combo
        if(
            tableroEval[a] !== "" &&
            tableroEval[a] === tableroEval[b] &&
            tableroEval[a] === tableroEval[c]
        ){
            return tableroEval[a] === "O" ? 10 : -10
        }
    }
    if(!tableroEval.includes("")) return 0
    return null
}



function mostrarResultado(message) {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = message;
  resultadoElement.classList.add("visible");
}

function reiniciarJuego() {
  tablero = Array(9).fill("");
  jugadorActual = "X";
  gameOver = false;

  const resultado = document.getElementById("resultado");
  resultado.textContent = "";
  resultado.classList.remove("visible");

  asignarCualidades();
}










