let readline = require('readline-sync');

const MESSAGES = require('./twentyone.json');
const NUMBER_CARDS = 52;
const INITIAL_DECK = [...Array(NUMBER_CARDS).keys()];
const DECK = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['♠', '♥', '♦', '♣'];
const MAX_SCORE = 21;
const ACE_MAX_VAL = 11;
const ACE_MIN_VAL = 1;
const FACE_CARD_VAL = 10;

let gameObj = {
  Player: { hand : [], score : 0, gameScore: 0, matchScore: 0},
  Dealer: { hand : [], score : 0, gameScore: 0, matchScore: 0},
  deck: INITIAL_DECK.slice(),
  cardsInDeck: NUMBER_CARDS
};

// Helper functions

function prompt(question = '', input = false) {
  if (input) return readline.question(question);
  readline.question(question);
  return undefined;
}

function answerIsYes(input) {
  return (input === 'y' || input.toLowerCase() === 'yes');
}

function updateDeck(index) {
  gameObj.cardsInDeck -= 1;
  return gameObj.deck.splice(index, 1);
}

function otherPlayer(player) {
  return (player === 'Player') ? 'Dealer' : 'Player';
}

function encodeSuit(cardNo) {
  let cardNumber = DECK[Math.floor(cardNo / 4)];
  let cardSuit = SUITS[cardNo % 4];
  return {value: cardNumber, suit: cardSuit};
}

//  Back-end game logic

function dealCard() {
  let randomCard = Math.floor(Math.random() * (gameObj.cardsInDeck - 1));
  let card = updateDeck(randomCard);
  return encodeSuit(card);
}

function initializeHands() {
  (gameObj.Dealer.hand).length = 0;
  (gameObj.Player.hand).length = 0;
  for (let count = 0; count < 4; count++) {
    if (count % 2) {
      (gameObj.Dealer.hand).push(dealCard());
      continue;
    }
    (gameObj.Player.hand).push(dealCard());
  }
  updateScoresAndDetectBust('Player');
  updateScoresAndDetectBust('Dealer');
}

function dealerChoice() {
  let diff = gameObj.Player.score - gameObj.Dealer.score;
  if (diff < 0) return 'stay';
  if (diff === 0 && (MAX_SCORE - gameObj.Dealer.score < 7)) return 'stay';
  return 'hit';
}

function playerChoice() {
  let scoreIsMax = (gameObj.Player.score === MAX_SCORE);
  if (!scoreIsMax) return prompt(MESSAGES.stayOrHit, true);
  prompt(MESSAGES.maxScore); // Player has a maxScore
  return 'stay';
}

function hitHand(player) {
  gameObj[player].hand.push(dealCard());
}

function acelessScoreAndAceCount(hand) {
  return hand.reduce((scoreAndAceCount, elem) => {  // scoreAndAceCount is an array
    if (elem.value !== 'A') {                       // with first element = score
      scoreAndAceCount[0] += Math.min(2 + DECK.indexOf(elem.value), // and second element = aceCount
        FACE_CARD_VAL);
    } else {
      scoreAndAceCount[1] += 1;
    }
    return scoreAndAceCount;
  }, [0, 0]);
}

function addAcetoScore(aceCount, aceLessScore) {
  if (!aceCount) return aceLessScore;
  let maxAceVal = ACE_MAX_VAL + ((aceCount - 1) * ACE_MIN_VAL);
  let minAceVal = aceCount * ACE_MIN_VAL;
  let score = (aceLessScore + maxAceVal <= MAX_SCORE) ?
    aceLessScore + maxAceVal : aceLessScore + minAceVal;
  return score;
}

function scoreHand(cardArr) {
  let [aceLessScore, aceCount] = acelessScoreAndAceCount(cardArr);
  return addAcetoScore(aceCount, aceLessScore);
}

function updateScoresAndDetectBust(player) {
  gameObj[player].score = scoreHand(gameObj[player].hand);
  if (gameObj[player].score > MAX_SCORE) return true;
  return false;
}

function assessWinner() {
  if (gameObj.Player.score > gameObj.Dealer.score) return 'Player';
  if (gameObj.Player.score === gameObj.Dealer.score) return 'Tie';
  return 'Dealer';
}

function resetDeckAfterMatch() {
  gameObj.deck = INITIAL_DECK.slice();
  gameObj.cardsInDeck = NUMBER_CARDS;
}

// Functions that log game specifics to console
function objToStrArray(cardArr) {
  return cardArr.map(elem => elem.value + elem.suit);
}

function stringGrammar(arr) {
  if (arr.length < 3) return arr.join(" and ");
  return arr.slice(0, -1).join(", ") + ` and ${arr[arr.length - 1]}`;
}

function showHandStringGen(player, fullDealerReveal = false) {
  if (player === 'Dealer' && !fullDealerReveal) {
    let arr = objToStrArray(gameObj.Dealer.hand.slice());
    if (arr.length >= 2) return stringGrammar([].concat(arr[0],
      arr.slice(2, arr.length),
      'unknown card'));
  }
  return stringGrammar(objToStrArray(gameObj[player].hand));
}

function bustHandler(bustedPlayer) {
  prompt(`${bustedPlayer} has gone bust!`);
}


function showHands(fullDealerReveal = false, includeHeader = '') {
  console.clear();
  if (includeHeader) console.log(includeHeader);
  console.log(`Dealer has: ${showHandStringGen('Dealer', fullDealerReveal)}`);
  console.log(`You have: ${showHandStringGen('Player', fullDealerReveal)}`);
}

function updateMatchScoresandDetectWin(winner, gamesToWin) {
  gameObj[winner].gameScore += 1;
  if (gameObj[winner].gameScore === gamesToWin) {
    prompt(`${winner} wins the game and match!`);
    gameObj[winner].matchScore += 1;
    gameObj[winner].gameScore = 0;
    gameObj[otherPlayer(winner)].gameScore = 0;
    return true;
  }
  return false;
}

function declareWinnerUpdateMatchScores(winner, gamesToWin) {
  showHands(true, MESSAGES.finalScoreDisplay);
  if (winner === 'Tie') {
    prompt(MESSAGES.declareTie);
    return false;
  }
  if (updateMatchScoresandDetectWin(winner, gamesToWin)) return true;
  prompt(`${winner} wins the game!`);
  return false;
}

function commentary(choice, player) {
  let choiceObj = {
    stay: {
      Player : MESSAGES.playerStays,
      Dealer : MESSAGES.dealerStays
    },
    hit: {
      Player : MESSAGES.playerHits,
      Dealer : MESSAGES.dealerHits
    }
  };
  return choiceObj[choice][player];
}

function displayScores(matchStyle) {
  let templateString = (player, isMatch) => {
    if (!isMatch) return `${player} :\n Games won : ${gameObj[player].gameScore}`;
    return `${player} :\n Game score : ${gameObj[player].gameScore}\n Match score : ${gameObj[player].matchScore}`;
  };
  console.log(templateString('Player', matchStyle));
  console.log(templateString('Dealer', matchStyle));
}

// Front-end logic

function singleTurnPlay(player, playerChoiceFunction) { // Returns [player bust, player stays]
  let choice = playerChoiceFunction();
  while (['stay', 'hit'].indexOf(choice) === -1) {
    console.log(MESSAGES.invalidChoice);
    choice = playerChoiceFunction();
  }
  if (choice === 'stay') {
    commentary('stay', player);
    return [false, true];
  }
  hitHand(player);
  showHands();
  prompt(commentary('hit', player));
  return [updateScoresAndDetectBust(player), false];
}

function playOrganizerAndBustDetector(player) {
  let choiceMaker = {Player : playerChoice, Dealer : dealerChoice}[player];
  let bustedStatus = false;
  let playerStays = false;
  while (!(bustedStatus || playerStays)) {
    showHands();
    [bustedStatus, playerStays] = singleTurnPlay(player, choiceMaker);
  }
  return (bustedStatus === true);
}

function runGameAndAssessWinner() {
  if (playOrganizerAndBustDetector('Player')) {
    bustHandler('Player');
    return 'Dealer';
  }
  if (playOrganizerAndBustDetector('Dealer')) {
    bustHandler('Dealer');
    return 'Player';
  }
  return assessWinner();
}

function runGames(matchStyle = false, gamesToWin = 1) {
  let playAnotherGame = true;
  let matchIsWon;
  while (playAnotherGame) {
    initializeHands();
    showHands();
    matchIsWon = declareWinnerUpdateMatchScores(runGameAndAssessWinner(),
      matchStyle * gamesToWin);
    displayScores(matchStyle);
    if (matchIsWon) return [true, true];
    playAnotherGame = answerIsYes(prompt(MESSAGES.requestAnotherGame,
      true));
  }
  return [false, false];
}

function runMatches(matchStyle = false, gamesToWin = 1) {
  let playAnotherMatch = true;
  let matchIsWon = false;
  let playAnotherGame = true;
  while (playAnotherMatch && playAnotherGame) {
    [matchIsWon, playAnotherGame] = runGames(matchStyle, gamesToWin);
    if (matchIsWon) {
      resetDeckAfterMatch();
      playAnotherMatch = answerIsYes(prompt(MESSAGES.requestAnotherMatch,
        true));
    }
  }
}

// Main program

let numberGames = 1;
let incorrectInput = true;
while (incorrectInput) {
  console.clear();
  console.log(MESSAGES.intro);
  let userPrefMatchStyle = prompt(MESSAGES.selectGameorMatch,
    true);
  if (userPrefMatchStyle === 'm' || userPrefMatchStyle === 'match') {
    numberGames = Number(prompt(MESSAGES.numberGamesToWin, true));
    runMatches(true, numberGames);
    incorrectInput = answerIsYes(prompt(MESSAGES.playAnotherMatch,
      true));
  } else if (userPrefMatchStyle === 'g' || userPrefMatchStyle === 'game') {
    runMatches(false, 0);
    incorrectInput = answerIsYes(prompt(MESSAGES.playAnotherMatch,
      true));
  } else {
    prompt("Incorrect input, try again");
  }
}
