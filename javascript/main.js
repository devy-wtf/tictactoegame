const tablero = document.getElementById('tablero')

const estado = {
    tablero: Array(9),
    turno: "x",
    modoCPU: false,
    activo: true,
}

const ganadores = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [3,5,8],
    [0,4,8], [2,4,6],
]


