const colorList = ["#E63946", "#2A9D8F", "#457B9D", "#F4A261"];
const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,];
const bots = [
    { name: "bot1", hand: [], type: "bot" },
    { name: "bot2", hand: [], type: "bot" },
    { name: "bot3", hand: [], type: "bot" }
];
const player = {
    name: "player",
    hand: [],
    type: "human"
};
let gameState;

function getDeckCards() {
    const deck = [];
    colorList.forEach(color => {
        numberList.forEach(number => {
            const count = number === 0 ? 1 : 2;
            Array(count).fill().forEach(() => {
                deck.push({ color, number });
            });
        });
    });
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; //Aca estoy desestructurando intercambiando el valor de i y j (para mezclar el array deck)
    }
    return deck;
}
const shuffleDeck = getDeckCards();

function setupGame() {
    const deck = getDeckCards();
    const state = {
        players: {
            player: { hand: [], type: "human" },
            bot1: { hand: [], type: "bot" },
            bot2: { hand: [], type: "bot" },
            bot3: { hand: [], type: "bot" }
        },
        discardPile: [],// mazo descarte
        drawPile: []// mazo de robo
    };
    for (let i = 0; i < 7; i++) {
        state.players.player.hand.push(deck.pop());
        state.players.bot1.hand.push(deck.pop());
        state.players.bot2.hand.push(deck.pop());
        state.players.bot3.hand.push(deck.pop());
    } // aca reparto 7 cartas x jugador
    console.log("cartas repartidas", state.players.player.hand, state.players.bot1.hand, state.players.bot2.hand, state.players.bot3.hand);
    state.discardPile.push(deck.pop());
    state.drawPile = deck;
    return state;
}
function drawnCard(state, playerId) {
    if (state.drawPile.length === 0) return null; //Condicion p el mazo de robo si esta vacio 
    const card = state.drawPile.pop(); //saco la carta del mazo de robo
    state.players[playerId].hand.push(card); //Agrego la carta a la mano del jugador
    return card;
}

gameState = setupGame();

console.log("Mano jugador:", gameState.players.player.hand.length);
console.log("Carta inicial en mesa:", gameState.discardPile[0]);
console.log("Cartas en mazo de robo:", gameState.drawPile.length);
const drawn = drawCard(gameState, "player");
console.log("Carta robada:", drawn);
console.log("Robo restante:", gameState.drawPile.length);
