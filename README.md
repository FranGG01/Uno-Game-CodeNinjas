# Uno-Game-CodeNinjas
Proyecto colaborativo para recrear el juego del UNO

Planteo lógico general

Queremos construir un mazo (deck) de cartas donde:

Hay 4 colores (colorList)

Hay 10 números del 0 al 9 (numberList)

Para los números del 1 al 9 se necesitan 2 cartas por color y número

Para el número 0 se necesita solo 1 carta por color

Entonces:

9 números × 2 cartas × 4 colores = 72 cartas

1 número (el 0) × 1 carta × 4 colores = 4 cartas

Total esperado: 76 cartas

1. 🔧 Armamos Setup del juego

Incluir lo necesario para comenzar a jugar:

Crear un mazo de 76 cartas (mezclado) esto en una sola funcion

Repartir 7 cartas a cada jugador (1 playes vs 3 bots)

Colocar la ultima carta que quedo en el “mazo repartido” boca arriba.

Dejar el resto del mazo al centro como pila de robo.

Todo esto puede estar en una funcion ej., getSetupGame()

2. 🎮 Fase de Juego (aca empieza a jugar)

Mano player:

Player intenta jugar una carta compatible con la que está sobre la mesa. Se agregan CONDICIONES de juego (la desicion es del humano, no automatizada, pero si la carta no es compatible con “lastcard” debe haber una restriccion de juego.. tipo popup?? “no hagas trampa! esa carta no es valida”) 

Condicion Si no puede, roba una carta. (un ternario? si si —> juega si no —> roba 1 y pasa turno)

Pasa al siguiente jugador (BOT)

Mano BOT

Mismas condicion que humano? pero automatizado (.find? / o .includes para encontrar equivalencia entra la las cartas de la mano de bot y “lastcard”)

Todo esto puede estar dentro de la funcion startGame()👈

creo una funcion y segun sea (mano player o mano bot se ejecuta una condicion u otra)