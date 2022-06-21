// !!!!!Global variables
// deck of cards
const deck = [
  ["dA", 11, 1],
  ["dK", 10],
  ["dQ", 10],
  ["dJ", 10],
  ["d10", 10],
  ["d09", 9],
  ["d08", 8],
  ["d07", 7],
  ["d06", 6],
  ["d05", 5],
  ["d04", 4],
  ["d03", 3],
  ["d02", 2],
  ["hA", 11, 1],
  ["hK", 10],
  ["hQ", 10],
  ["hJ", 10],
  ["h10", 10],
  ["h09", 9],
  ["h08", 8],
  ["h07", 7],
  ["h06", 6],
  ["h05", 5],
  ["h04", 4],
  ["h03", 3],
  ["h02", 2],
  ["sA", 11, 1],
  ["sK", 10],
  ["sQ", 10],
  ["sJ", 10],
  ["s10", 10],
  ["s09", 9],
  ["s08", 8],
  ["s07", 7],
  ["s06", 6],
  ["s05", 5],
  ["s04", 4],
  ["s03", 3],
  ["s02", 2],
  ["cA", 11, 1],
  ["cK", 10],
  ["cQ", 10],
  ["cJ", 10],
  ["c10", 10],
  ["c09", 9],
  ["c08", 8],
  ["c07", 7],
  ["c06", 6],
  ["c05", 5],
  ["c04", 4],
  ["c03", 3],
  ["c02", 2],
];

const acesDeck = [
  ["dA", 11, 1],
  ["hA", 11, 1],
  ["sA", 11, 1],
  ["cA", 11, 1],
];

let usedDeck = [];

// number of wins
let dealerWins = 0;
let playerWins = 0;

// hands
let playerHand = [];
let dealerHand = [];

// number of chips
let chipHundredNum = 6;
let chipFiftyNum = 5;
let chipTwentyNum = 5;
let chipTenNum = 5;

// number of chips in game
let chipHundredBet = 0;
let chipFiftyBet = 0;
let chipTwentyBet = 0;
let chipTenBet = 0;

// chips nominal value
const chipHundred = 100;
const chipFifty = 50;
const chipTwenty = 20;
const chipTen = 10;

// bankroll set to 1K
let bankroll =
  chipHundredNum * chipHundred +
  chipFiftyNum * chipFifty +
  chipTwentyNum * chipTwenty +
  chipTenNum * chipTen;

// bet amount set to 0
let bet = 0;
let betGame = 0;

// score
let playerScore = 0;
let dealerScore = 0;
let winPlayer = 0;
let winDealer = 0;

let winPlayerStatus = false;
let winDealerStatus = false;
let evenStatus = false;

// DOM variables
//new and reset buttons
let resetAllBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
// buttons
let chipTenBtn = document.querySelector(".pokerchip.blue");
let chipTwentyBtn = document.querySelector(".pokerchip.green");
let chipFiftyBtn = document.querySelector(".pokerchip.red");
let chipHundredBtn = document.querySelector(".pokerchip.black");
// chips
let chipTenEl = document.querySelector(".chip-num.ten");
let chipTwentyEl = document.querySelector(".chip-num.twenty");
let chipFiftyEl = document.querySelector(".chip-num.fifty");
let chipHundredEl = document.querySelector(".chip-num.hundred");
// bank and bet
let bankrollNumEl = document.querySelector(".bankroll-num");
let betNumEl = document.querySelector(".bet-num");
let dealBtn = document.querySelector(".deal-btn");
let betGameEl = document.querySelector(".bet-game");
// hands
let playerHandEl = document.querySelector(".player-hand");
let dealerHandEl = document.querySelector(".dealer-hand");
// score
let playerScoreEl = document.querySelector(".player-score");
let dealerScoreEl = document.querySelector(".dealer-score");
// hit and stand
let hitBtn = document.querySelector(".hit-button");
let standBtn = document.querySelector(".stand-button");

// disabling buttons
hitBtn.disabled = true;
standBtn.disabled = true;
resetAllBtn.disabled = true;
newGameBtn.disabled = true;

// Div containers
let dealerWinMsg = document.querySelector(".card-score-container.dealer");
let playerWinMsg = document.querySelector(".card-score-container.player");
let dealerPlayerWins = document.querySelector(".dealer-player-wins");
let playerBeforeCardEl = document.querySelector(".cards-align-player");

// Event listeners
chipTenBtn.addEventListener("click", makeBetTen);
chipTwentyBtn.addEventListener("click", makeBetTwenty);
chipFiftyBtn.addEventListener("click", makeBetFifty);
chipHundredBtn.addEventListener("click", makeBetHundred);
dealBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", playerGame);
standBtn.addEventListener("click", dealerGame);
resetAllBtn.addEventListener("click", init);
newGameBtn.addEventListener("click", startNewGame);

// Functions
// initial functions
function init() {
  chipHundredNum = 6;
  chipFiftyNum = 5;
  chipTwentyNum = 5;
  chipTenNum = 5;
  dealerWins = 0;
  playerWins = 0;
  dealerPlayerWins.innerHTML = `<h1>Wins: Player - ${playerWins} Dealer - ${dealerWins}<h1>`;
  startNewGame();
  renderBet();
}

function disableButtons() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
  resetAllBtn.disabled = true;
  newGameBtn.disabled = true;
  hitBtn = document.querySelector(".hit-button");
  standBtn = document.querySelector(".stand-button");
  resetAllBtn = document.querySelector(".reset-btn");
  newGameBtn = document.querySelector(".new-btn");
  hitBtn.classList.add("grey-button");
  standBtn.classList.add("grey-button");
  resetAllBtn.classList.add("grey-button");
  newGameBtn.classList.add("grey-button");
}

function enableButtons() {
  hitBtn.disabled = false;
  standBtn.disabled = false;
  resetAllBtn.disabled = false;
  newGameBtn.disabled = false;
  hitBtn = document.querySelector(".hit-button");
  standBtn = document.querySelector(".stand-button");
  resetAllBtn = document.querySelector(".reset-btn");
  newGameBtn = document.querySelector(".new-btn");
  hitBtn.classList.remove("grey-button");
  standBtn.classList.remove("grey-button");
  resetAllBtn.classList.remove("grey-button");
  newGameBtn.classList.remove("grey-button");
}

function bankrollCalc() {
  bankroll =
    chipHundredNum * chipHundred +
    chipFiftyNum * chipFifty +
    chipTwentyNum * chipTwenty +
    chipTenNum * chipTen;
}

function startNewGame() {
  betGame = 0;
  bet = 0;
  chipHundredBet = 0;
  chipFiftyBet = 0;
  chipTwentyBet = 0;
  chipTenBet = 0;
  usedDeck = [];
  playerHand = [];
  dealerHand = [];
  bankrollCalc();
  betGameEl.innerHTML = `<h1>Your bet: $${betGame}</h1>`;
  betNumEl.innerHTML = `<h1>$${bet}</h1>`;
  playerScore = 0;
  dealerScore = 0;
  playerHandEl.innerHTML = "";
  dealerHandEl.innerHTML = "";
  if (document.querySelector(".win-msg-dealer")) {
    let divMsgDealer = document.querySelector(".win-msg-dealer");
    divMsgDealer.remove();
  }
  if (document.querySelector(".win-msg-player")) {
    let divMsgPlayer = document.querySelector(".win-msg-player");
    divMsgPlayer.remove();
  }
  playerHandEl.innerHTML = `<li class="card back-red"></li><li class="card back-red"></li>`;
  dealerHandEl.innerHTML = `<li class="card back-blue"></li>
      <li class="card back-blue"></li>`;
  playerScoreEl.innerHTML = `<h1>Player Score: ${playerScore}</h1>`;
  dealerScoreEl.innerHTML = `<h1>Dealer Score: ${dealerScore}</h1>`;
  disableButtons();
}

// rendering bet values
function renderBet() {
  chipTenEl.innerHTML = `<h3>Chips: ${chipTenNum}</h3>`;
  chipTwentyEl.innerHTML = `<h3>Chips: ${chipTwentyNum}</h3>`;
  chipFiftyEl.innerHTML = `<h3>Chips: ${chipFiftyNum}</h3>`;
  chipHundredEl.innerHTML = `<h3>Chips: ${chipHundredNum}</h3>`;
  bankrollNumEl.innerHTML = `<h1>$${bankroll}</h1>`;
  betNumEl.innerHTML = `<h1>$${bet}</h1>`;
}

// make bet functions
function makeBetTen() {
  if (chipTenNum > 0) {
    chipTenNum--;
    chipTenBet++;
    bankroll = bankroll - chipTen;
    bet = bet + chipTen;
  }
  renderBet();
}

function makeBetTwenty() {
  if (chipTwentyNum > 0) {
    chipTwentyNum--;
    chipTwentyBet++;
    bankroll = bankroll - chipTwenty;
    bet = bet + chipTwenty;
  }
  renderBet();
}

function makeBetFifty() {
  if (chipFiftyNum > 0) {
    chipFiftyNum--;
    chipFiftyBet++;
    bankroll = bankroll - chipFifty;
    bet = bet + chipFifty;
  }
  renderBet();
}

function makeBetHundred() {
  if (chipHundredNum > 0) {
    chipHundredNum--;
    chipHundredBet++;
    bankroll = bankroll - chipHundred;
    bet = bet + chipHundred;
  }
  renderBet();
}

// start game function
function startGame() {
  enableButtons();
  betGame = bet;
  betGameEl.innerHTML = `<h1>Your bet: $${betGame}</h1>`;
  hitBtn.disabled = false;
  standBtn.disabled = false;
  resetAllBtn.e = true;
  newGameBtn = true;
  giveHands();
}

// give hands functions
function giveHands() {
  playerHandEl.innerHTML = "";
  while (playerHand.length < 2) {
    let idx = Math.floor(Math.random() * 52);
    if (!usedDeck.includes(deck[idx])) {
      if (!acesDeck.includes(deck[idx])) {
        playerHand.push(deck[idx]);
        usedDeck.push(deck[idx]);
        let list = document.createElement("li");
        list.setAttribute("class", `card ${deck[idx][0]}`);
        playerHandEl.appendChild(list);
        playerScore = playerScore + deck[idx][1];
      } else if (playerHand.includes(deck[idx])) {
        playerHand.push(deck[idx]);
        usedDeck.push(deck[idx]);
        let list = document.createElement("li");
        list.setAttribute("class", `card ${deck[idx][0]}`);
        playerHandEl.appendChild(list);
        playerScore = playerScore + 1;
      }
    }
  }

  playerScoreEl.innerHTML = `<h1>Player Score: ${playerScore}</h1>`;
  dealerHandEl.innerHTML = "";

  while (dealerHand.length < 2) {
    idx = Math.floor(Math.random() * 52);
    console.log(idx);
    console.log(deck[idx]);
    if (!usedDeck.includes(deck[idx])) {
      dealerHand.push(deck[idx]);
      usedDeck.push(deck[idx]);
      let list = document.createElement("li");
      list.setAttribute("class", `card ${deck[idx][0]}`);
      dealerHandEl.appendChild(list);
      dealerScore = dealerScore + deck[idx][1];
    }
  }

  dealerHandEl.querySelector("li").classList.add("back-blue");
  dealerScore = dealerScore - dealerHand[0][1];
  dealerScoreEl.innerHTML = `<h1>Dealer Score: ${dealerScore}</h1>`;

  console.log(dealerHand);
  console.log(playerHand);
  console.log(usedDeck);
}

//playerGame when hit pressed
function playerGame() {
  idx = Math.floor(Math.random() * 52);
  if (!usedDeck.includes(deck[idx])) {
    if (!acesDeck.includes(deck[idx])) {
      playerHand.push(deck[idx]);
      usedDeck.push(deck[idx]);
      let list = document.createElement("li");
      list.setAttribute("class", `card ${deck[idx][0]}`);
      playerHandEl.appendChild(list);
      playerScore = playerScore + deck[idx][1];
    } else if (playerScore + 11 <= 21) {
      playerHand.push(deck[idx]);
      usedDeck.push(deck[idx]);
      let list = document.createElement("li");
      list.setAttribute("class", `card ${deck[idx][0]}`);
      playerHandEl.appendChild(list);
      playerScore = playerScore + 11;
    } else {
      playerHand.push(deck[idx]);
      usedDeck.push(deck[idx]);
      let list = document.createElement("li");
      list.setAttribute("class", `card ${deck[idx][0]}`);
      playerHandEl.appendChild(list);
      playerScore = playerScore + 1;
    }
  }

  playerScoreEl.innerHTML = `<h1>Player Score: ${playerScore}</h1>`;

  if (playerScore > 21) {
    let winMsg = document.createElement("div");
    winMsg.setAttribute("class", "win-msg-dealer");
    dealerWinMsg.appendChild(winMsg);
    winMsg.innerHTML = "<h1>Dealer won!</h1>";
    dealerWins++;
    dealerPlayerWins.innerHTML = `<h1>Wins: Player - ${playerWins} Dealer - ${dealerWins}<h1>`;
  }
}

//dealerGame when stand pressed
function dealerGame() {
  dealerScore = dealerScore + dealerHand[0][1];
  dealerHandEl.querySelector("li").classList.remove("back-blue");
  dealerScoreEl.innerHTML = `<h1>Dealer Score: ${dealerScore}</h1>`;

  while (!winDealerStatus || !evenStatus || !winPlayerStatus) {
    idx = Math.floor(Math.random() * 52);
    if (dealerScore > playerScore && dealerScore <= 21) {
      winDealerStatus = true;
      let winMsg = document.createElement("div");
      winMsg.setAttribute("class", "win-msg-dealer");
      dealerWinMsg.appendChild(winMsg);
      winMsg.innerHTML = "<h1>Dealer won!</h1>";
      dealerWins++;
      dealerPlayerWins.innerHTML = `<h1>Wins: Player - ${playerWins} Dealer - ${dealerWins}<h1>`;
      return;
    } else if (dealerScore === playerScore) {
      evenStatus = true;
      let winMsg = document.createElement("div");
      winMsg.setAttribute("class", "win-msg-dealer");
      dealerWinMsg.appendChild(winMsg);
      winMsg.innerHTML = "<h1>Nobody won!</h1>";
      chipHundredNum = chipHundredNum + chipHundredBet;
      chipFiftyNum = chipFiftyNum + chipFiftyBet;
      chipTwentyNum = chipTwentyNum + chipTwentyBet;
      chipTenNum = chipTenNum + chipTenBet;
      bankrollCalc();
      renderBet();
      dealerPlayerWins.innerHTML = `<h1>Wins: Player - ${playerWins} Dealer - ${dealerWins}<h1>`;
      return;
    } else if (dealerScore > 21) {
      winPlayerStatus = true;
      playerWins++;
      let winMsg = document.createElement("div");
      winMsg.setAttribute("class", "win-msg-player");
      playerWinMsg.insertBefore(winMsg, playerBeforeCardEl);
      winMsg.innerHTML = "<h1>Player won!</h1>";
      chipHundredNum = chipHundredNum + chipHundredBet * 2;
      chipFiftyNum = chipFiftyNum + chipFiftyBet * 2;
      chipTwentyNum = chipTwentyNum + chipTwentyBet * 2;
      chipTenNum = chipTenNum + chipTenBet * 2;
      bankrollCalc();
      renderBet();
      dealerPlayerWins.innerHTML = `<h1>Wins: Player - ${playerWins} Dealer - ${dealerWins}<h1>`;
      return;
    }
    if (!usedDeck.includes(deck[idx])) {
      if (!acesDeck.includes(deck[idx])) {
        dealerHand.push(deck[idx]);
        usedDeck.push(deck[idx]);
        let list = document.createElement("li");
        list.setAttribute("class", `card ${deck[idx][0]}`);
        dealerHandEl.appendChild(list);
        dealerScore = dealerScore + deck[idx][1];
        dealerScoreEl.innerHTML = `<h1>Dealer Score: ${dealerScore}</h1>`;
      } else if (dealerScore + 11 <= 21) {
        dealerHand.push(deck[idx]);
        usedDeck.push(deck[idx]);
        let list = document.createElement("li");
        list.setAttribute("class", `card ${deck[idx][0]}`);
        dealerHandEl.appendChild(list);
        dealerScore = dealerScore + 11;
        dealerScoreEl.innerHTML = `<h1>Dealer Score: ${dealerScore}</h1>`;
      } else {
        dealerHand.push(deck[idx]);
        usedDeck.push(deck[idx]);
        let list = document.createElement("li");
        list.setAttribute("class", `card ${deck[idx][0]}`);
        dealerHandEl.appendChild(list);
        dealerScore = dealerScore + 1;
        dealerScoreEl.innerHTML = `<h1>Dealer Score: ${dealerScore}</h1>`;
      }
    }
  }
}
