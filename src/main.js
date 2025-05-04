const numberList = [0,1,2,3,4,5,6,7,8,9,];
const colorList = ["red", "green", "blue", "yellow"];

const colorMapping = {
    red: "#E63946",
    green: "#2A9D8F",
    blue: "#457B9D",
    yellow: "#F4A261"
}

function generateDeck() {
    const deck = [];

    colorList.forEach(color => {
        numberList.forEach(number => {
            const count = number === 0 ? 1 : 2;
            Array(count).fill().forEach(() => {
                deck.push({
                    color: color,
                    number: number
                });
            }); 
        });
    });

    return deck;
}

function drawRandomCardFromCards(cards) {
    const randomPosition = Math.floor(Math.random() * cards.length);
    return cards[randomPosition];
}

function shuffleDeck(deck) {
    const shuffledDeck = [];

    for (let i = 0; i < deck.length; i++) {
        shuffledDeck.push(drawRandomCardFromCards(deck));
    }

    return shuffledDeck;
}

function createPlayer(type, deck) {
    const player = {
        hand: [],
        type,
    };

    for (let i = 0; i < 7; i++) {
        const drawnCard = deck.pop();
        player.hand.push(drawnCard);
    }

    return player;
}

function startGame() {
    const game = {
        players: [],
        deck: shuffleDeck(generateDeck()),
        currentPlayer: 0,
        lastCard: null
    };
    
    for (let i = 0; i < 4; i++) {
        const type = i === 0 ? "human" : "bot"
        const player = createPlayer(type, game.deck);
        game.players.push(player);
    }

    game.lastCard = game.deck.pop();

    return game;
}

console.log(startGame())
