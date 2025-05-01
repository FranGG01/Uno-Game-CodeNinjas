

const colores = ["#E63946", "#2A9D8F", "#457B9D", "#F4A261"];
const numeros = [0,1,2,3,4,5,6,7,8,9,]


const game = {
    players: [], 
    deck: [],
    currentPlayer: 0,
    lastCard: null 
};

const player = {
    hand: [],
    type: "human"
}

const carta = {
    color: "red",
    number: 0
}

function startGame() {
    const game = {
        players: [], 
        deck: [],
        currentPlayer: 0,
        lastCard: null 
    }
    for (let i=0; i<108; i++){
        game.deck.push({
            color: "red",
            number: 0
        })
    }
    for (let i=0; i<4; i++){
        const player = {
            hand: [],
            type: "human"
        }
        for (let j=0; j<7; j++){
           const drawnCard = game.deck.pop()
           player.hand.push(drawnCard);
        }
        game.players.push(player)
    }   
    game.lastCard = game.deck.pop()

    return game;
}

function playTurn() {
    currentPlayer = (currentPlayer + 2) % 4 
    

}
