const colores = ["rojo", "azul", "verde", "amarillo"];
const valores = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const colorMap = {
  rojo: "R",
  azul: "B",
  verde: "G",
  amarillo: "Y"
};


// Generar el mazo
let mazo = [];
colores.forEach(color => {
  valores.forEach(valor => {
    mazo.push({ color, valor });
    if (valor !== "0") {
      mazo.push({ color, valor }); 
    }
  });
});


// Barajar el mazo(Fisher-Yates)
function barajar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
barajar(mazo);



// Repartir cartas al jugador
const bottomPlayer = document.getElementById("bottom-player");

function repartirCartas(bottomPlayer, cantidad) {
  bottomPlayer.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const carta = mazo.pop();
    const cartaImg = document.createElement("img");

    const colorURL = colorMap[carta.color];
    const valorURL = carta.valor;
    cartaImg.src = `images/${colorURL}${valorURL}.png`;

    bottomPlayer.appendChild(cartaImg);
  }
}

repartirCartas(bottomPlayer, 7);
