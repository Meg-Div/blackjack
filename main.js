//creating two elements for each player
const dealerHand = document.querySelector("#dealer-hand");
const playerHand = document.getElementById("player-hand");

const deck = [];

const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const court = ["ace", "jack", "queen", "king"];

let playerTotal = [];
let dealerTotal = [];

let gameOver = false;

const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

const shuffleArray = () => {
  deck.sort(() => 0.5 - Math.random());
};

document.querySelector("#hit").disabled = true;
document.querySelector("#stand").disabled = true;

const playerCard = () => {
  shuffleArray();
  //create new card, link image, append to player
  let playerCard = document.createElement("img");
  playerCard.src = `./images/${`${deck[0]["rank"]}_of_${deck[0]["suit"]}`}.png`;

  playerHand.append(playerCard);

  if (court.includes(deck[0]["pointValue"])) {
    if (deck[0]["pointValue"] == "ace") {
      playerTotal.push(11);
    } else playerTotal.push(10);
  } else playerTotal.push(deck[0]["pointValue"]);

  deck.shift();
};

//creates first face up card
const firstDealerCard = () => {
  shuffleArray();
  let dealerCard = document.createElement("img");
  dealerCard.src = `./images/${`${deck[0]["rank"]}_of_${deck[0]["suit"]}`}.png`;
  dealerHand.append(dealerCard);

  if (court.includes(deck[0]["pointValue"])) {
    if (deck[0]["pointValue"] == "ace") {
      dealerTotal.push(11);
    } else dealerTotal.push(10);
  } else dealerTotal.push(deck[0]["pointValue"]);

  deck.shift();
};

//creates second, third, fourth, etc face down cards
const secondDealerCard = () => {
  shuffleArray();
  let dealerCard = document.createElement("img");
  dealerCard.src = `./images/${`${deck[0]["rank"]}_of_${deck[0]["suit"]}`}.png`;
  dealerHand.append(dealerCard);
  dealerCard.classList = "dealer-back";

  if (court.includes(deck[0]["pointValue"])) {
    if (deck[0]["pointValue"] == "ace") {
      dealerTotal.push(11);
    } else dealerTotal.push(10);
  } else dealerTotal.push(deck[0]["pointValue"]);

  deck.shift();
};

//flips the cards over at end
const turn = () => {
  for (const card of dealerHand.childNodes) {
    if (card.localName === "img") {
      card.classList = "front";
    }
  }
};

//deal button
const onDeal = () => {
  playerCard();
  firstDealerCard();
  playerCard();
  secondDealerCard();
  document.querySelector("#hit").disabled = false;
  document.querySelector("#stand").disabled = false;
  count();
};

//hit button
const onHit = () => {
  if (dealerTotal.reduce((prev, curr) => prev + curr, 0) > 16) {
    playerCard();
  } else {
    playerCard();
    secondDealerCard();
  }

  count();
};

//stand button
const onStand = () => {
  document.querySelector("#hit").disabled = true;
  document.querySelector("#stand").disabled = true;
  turn();

  while (dealerTotal.reduce((prev, curr) => prev + curr, 0) < 17) {
    secondDealerCard();
    turn();
  }

  count();
};

//counts current hand
const count = () => {
  dTotal = dealerTotal.reduce((prev, curr) => prev + curr, 0);
  pTotal = playerTotal.reduce((prev, curr) => prev + curr, 0);

  document.querySelector(".player-name").innerText = `Player: ${pTotal}`;

  //21
  if (pTotal === 21 || dTotal === 21) {
    //both at 21
    if (pTotal === 21 && dTotal === 21) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> It's a draw!`;
    }
    //player at 21
    else if (pTotal === 21) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> You win!`;
    }
    //dealer at 21
    else if (dTotal === 21) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> You lost!`;
    }
    document.querySelector("#hit").disabled = true;
    document.querySelector("#stand").disabled = true;
    gameOver = true;
  }

  //Total is over 21 and they have an ace
  if (
    (pTotal > 21 && playerTotal.includes(11)) ||
    (dTotal > 21 && dealerTotal.includes(11))
  ) {
    if (pTotal > 21) {
      let idx = playerTotal.indexOf(11);
      playerTotal[idx] = 1;
    } else if (dTotal > 21) {
      let idx = dealerTotal.indexOf(11);
      dealerTotal[idx] = 1;
    }
    count();
  }

  //bust
  if (pTotal > 21 || dTotal > 21) {
    //handle player bust
    if (pTotal > 21) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> You lost!`;
    }
    //handle dealer bust
    else if (dTotal > 21) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> You win!`;
    }
    document.querySelector("#hit").disabled = true;
    document.querySelector("#stand").disabled = true;
    gameOver = true;
  }

  //stand and dealter at over 17
  if (
    document.querySelector("#hit").disabled === true &&
    document.querySelector("#stand").disabled === true &&
    gameOver === false
  ) {
    if (pTotal === dTotal) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> It's a draw!`;
    } else if (pTotal > dTotal) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> You win!`;
    } else if (pTotal < dTotal) {
      document.querySelector(
        ".player-name"
      ).innerText = `Player: ${pTotal} ----> You lost!`;
    }
    gameOver = true;
  }

  if (gameOver) {
    turn();
    document.querySelector(".dealer-name").innerText = `Dealer: ${dTotal}`;
  }
};

window.addEventListener("DOMContentLoaded", () => {});
