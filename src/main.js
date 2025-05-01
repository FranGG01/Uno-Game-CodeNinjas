

// const colores = ["#E63946", "#2A9D8F", "#457B9D", "#F4A261"];
// const numeros = [0,1,2,3,4,5,6,7,8,9,]


function createDeck() { // FUNCION DE PRUEBA
    const deck = [];
    for (let i = 0; i < 108; i++) {
        deck.push({
            color: "red",
            number: 0
        });
    }
    return deck;
}


function createPlayer(deck) {
    const player = {
        hand: [],
        type: "human"
    };
    for (let i = 0; i < 7; i++) {
        const deck = createDeck()
        const drawnCard = deck.pop();
        player.hand.push(drawnCard);
    }
    return player;
}

function startGame() {
    const game = {
        players: [],
        deck: createDeck(),
        currentPlayer: 0,
        lastCard: null
    };
    for (let i = 0; i < 4; i++) {
        const player = createPlayer(game.deck);
        game.players.push(player);
    }
    game.lastCard = game.deck.pop();

    return game;
}


console.log(startGame())
console.log(createPlayer())



