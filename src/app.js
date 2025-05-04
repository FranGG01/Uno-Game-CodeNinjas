const cardsEnJuego = document.querySelector("#cards-Enjuego");
const cardsRobar = document.querySelector("#cards-robar");
const defaultPlayerCount = 4;
const handSize = 7;
const deckSetUp = {
    colors: ["red", "green", "blue", "yellow"],
    values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "+2"],
    wildCards: ["wild", "wild+4"],
    wildCount: 4
};
const colorList = {
    red: "rojo",
    green: "verde",
    blue: "azul",
    yellow: "amarillo",
    black: "comodin"
};
function getDeckCards() {
    const deck = [];
    deckSetUp.colors.forEach(color => {
        deckSetUp.values.forEach(value => {
            const repetitions = value === "0" ? 1 : 2;
            for (let i = 0; i < repetitions; i++) {
                deck.push({ color, value });
            }
        });
    });
    deckSetUp.wildCards.forEach(wildCard => {
        for (let i = 0; i < deckSetUp.wildCount; i++) {
            deck.push({ color: "black", value: wildCard });
        }
    });
    return deck;
}
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
function updateGameDisplay(card) {
    cardsEnJuego.innerHTML = `<div class="card-slot-Enjuego">
    <img src="${card.image}" alt="${card.name}" class="img-fluid"></div>`;
}
cardsRobar.addEventListener("click", function () {
    if (deck.length > 0) {
        const drawnCard = deck.pop();
        playerHand.push(drawnCard);
        alert("Carta robada: " + drawnCard.name);
        updateGameDisplay(drawnCard);
    }
});
function createPlayer(type, deck, handSize = 7) {
    const hand = [];
    for (let i = 0; i < handSize; i++) {
        hand.push(deck.pop());
    }
    return { type, hand };
}
function startGame(deck, playerCount = defaultPlayerCount) {
    const game = {
        players: [],
        drawPile: [...deck],
        discardPile: [],
        currentPlayer: 0,
        direction: 1
    };
    for (let i = 0; i < playerCount; i++) {
        const type = i === 0 ? "human" : "bot";
        game.players.push(createPlayer(type, game.drawPile, handSize));
    }
    game.discardPile.push(game.drawPile.pop());
    return game;
}
function isCardPlayable(card, topCard) {
    return card.color === "black" || card.color === topCard.color || card.value === topCard.value;
}
function getTopCard(discardPile) {
    return discardPile[discardPile.length - 1];
}
function getPlayableCardIndex(hand, topCard) {
    return hand.findIndex(card => isCardPlayable(card, topCard));
}
function setBotTurn(state, playerId) {
    const player = state.players[playerId];
    const topCard = getTopCard(state.discardPile);
    const playableIndex = getPlayableCardIndex(player.hand, topCard);
    if (playableIndex !== -1) {
        setPlayCard(state, playerId, playableIndex);
    } else {
        getCardFromPile(state, playerId);
    }
}
function getCardFromPile(state, playerId) {
    if (state.drawPile.length === 0) return null;
    const card = state.drawPile.pop();
    state.players[playerId].hand.push(card);
    return card;
}
function setNextTurn(state) {
    state.currentPlayer += state.direction;
    if (state.currentPlayer >= state.players.length) {
        state.currentPlayer = 0;
    } else if (state.currentPlayer < 0) {
        state.currentPlayer = state.players.length - 1;
    }
}
function setPlayCard(state, playerId, cardIndex) {
    const player = state.players[playerId];
    const card = player.hand[cardIndex];
    const topCard = getTopCard(state.discardPile);
    if (isCardPlayable(card, topCard)) {
        state.discardPile.push(card);
        player.hand.splice(cardIndex, 1);
        setApplyCardEffect(state, card, playerId);
        setNextTurn(state);
        return true;
    }
    return false;
}
function setApplyCardEffect(state, card, playerId) {
    const getNextPlayerId = () => (state.currentPlayer + state.direction + state.players.length) % state.players.length;

    switch (card.value) {
        case "skip":
            setNextTurn(state);
            break;
        case "reverse":
            state.direction *= -1;
            break;
        case "+2": {
            const nextPlayerId = getNextPlayerId();
            getCardFromPile(state, nextPlayerId);
            getCardFromPile(state, nextPlayerId);
            break;
        }
        case "wild+4": {
            const nextPlayerId = getNextPlayerId();
            for (let i = 0; i < 4; i++) getCardFromPile(state, nextPlayerId);
            break;
        }
    }
    if (isPlayerWinner(state, playerId)) {
        console.log(`🎉${playerId} Haz ganado!`);
    } else if (isDrawPileEmpty(state)) {
        console.log("El mazo de robo está vacío.");
    } else if (!hasCardsInHand(state, playerId)) {
        console.log(`El jugador ${playerId} no tiene cartas en la mano.`);
    }
}
function isPlayerWinner(state, playerId) {
    return state.players[playerId].hand.length === 0;
}
function isDrawPileEmpty(state) {
    return state.drawPile.length === 0;
}
function hasCardsInHand(state, playerId) {
    return state.players[playerId].hand.length > 0;
}
function updatePlayerHand(playerId, playerHand) {
    const playerElement = document.getElementById(`player-${playerId}`);
    playerElement.innerHTML = '';
    playerHand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-slot-user');
        const img = document.createElement('img');
        img.src = `images/${card.color}-${card.value}.svg`;
        img.alt = `${card.color} ${card.value}`;
        cardElement.appendChild(img);
        playerElement.appendChild(cardElement);
    });
}
function renderInitialCards() {
    const gameState = startGame(shuffleDeck(getDeckCards()));
    gameState.players.forEach((player, index) => {
        updatePlayerHand(index, player.hand);
    });
    const topCard = getTopCard(gameState.discardPile);
    updateGameDisplay(topCard);
}
renderInitialCards();
















































