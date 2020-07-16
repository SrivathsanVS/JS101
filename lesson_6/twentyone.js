let readline = require('readline-sync');

const MESSAGES = require('./twentyone.json');
const DECK = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['♠', '♥', '♦', '♣'];
const MAX_SCORE = 21;
const ACE_MAX_VAL = 11;
const ACE_MIN_VAL = 1;
const FACE_CARD_VAL = 10;

let gameObj = {
  Player: { hand : [], score : 0, gameScore: 0, matchScore: 0},
  Dealer: { hand : [], score : 0, gameScore: 0, matchScore: 0}
};

// Helper functions

function prompt(question = '', input = false) {
  if (input) return readline.question(question);
  readline.question(question);
  return undefined;
}

function validateUserInput(expectedInputList,
  messagePromptFunction = false,
  promptMessage = '') {
  let collectUserInput = () => ((promptMessage) ?
    prompt(promptMessage, true).toLowerCase() :
    messagePromptFunction());
  let input = collectUserInput();
  while (expectedInputList.indexOf(input) === -1) {
    console.log(input);
    console.log(MESSAGES.invalidChoice);
    input = collectUserInput();
  }
  return input;
}

function answerIsYes(promptMessage) {
  let validatedInput = validateUserInput(['y', 'yes', 'n','no'],
    false, promptMessage);
  return (validatedInput === 'y' || validatedInput === 'yes');
}

function otherPlayer(player) {
  return (player === 'Player') ? 'Dealer' : 'Player';
}

//  Deck and card management

function createDeck() {
  let newDeck = [];
  for (let cardInd in DECK) {
    for (let suitInd in SUITS) {
      let newCard = {value: DECK[cardInd],
        suit: SUITS[suitInd]};
      newDeck.push(newCard);
    }
  }
  return newDeck;
}

function shuffleDeck(deck) {
  let array = deck.slice();
  for (let arrInd = (array.length - 1); arrInd > 0; arrInd--) {
    const altIndex = Math.floor(Math.random() * arrInd);
    const temp = array[arrInd];
    array[arrInd] = array[altIndex];
    array[altIndex] = temp;
  }
  return array;
}

function initializeDeck() {
  gameObj.deck = shuffleDeck(createDeck());
}

function dealCard() {
  return gameObj.deck.pop();
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
}

function hitHand(player) {
  gameObj[player].hand.push(dealCard());
}

function objToStrArray(cardObj) {
  return cardObj.map(elem => elem.value + elem.suit);
}

function cardObjtoArray(hand, maskOneCard) {
  if (maskOneCard) {
    let arr = hand.slice();
    arr.splice(1, 1); // Delete second item
    return [].concat(objToStrArray(arr), 'unknown card');
  }
  return objToStrArray(hand);
}

// Scoring functions

function updatePlayerScore(player) {
  gameObj[player].score = scoreHand(gameObj[player].hand);
}

function initializeScores() {
  updatePlayerScore('Player');
  updatePlayerScore('Dealer');
}

function detectBust(player) {
  return (gameObj[player].score > MAX_SCORE);
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
  return (aceLessScore + maxAceVal <= MAX_SCORE) ?
    aceLessScore + maxAceVal : aceLessScore + minAceVal;
}

function scoreHand(cardArr) {
  let [aceLessScore, aceCount] = acelessScoreAndAceCount(cardArr);
  return addAcetoScore(aceCount, aceLessScore);
}

function assessWinner() {
  if (gameObj.Player.score > gameObj.Dealer.score) return 'Player';
  if (gameObj.Player.score === gameObj.Dealer.score) return 'Tie';
  return 'Dealer';
}

function updateGameScore(gameWinner) {
  if (gameWinner !== 'Tie') gameObj[gameWinner].gameScore += 1;
}

function detectMatchWin(gameWinner, gamesToWin) {
  if (gameWinner === 'Tie') return false;
  return (gameObj[gameWinner].gameScore === gamesToWin);
}

function updateMatchScores(matchWinner) {
  gameObj[matchWinner].matchScore += 1;
  gameObj[matchWinner].gameScore = 0;
  gameObj[otherPlayer(matchWinner)].gameScore = 0;
}

function resetMatchScores() {
  gameObj['Player'].gameScore = 0;
  gameObj['Player'].matchScore = 0;
  gameObj['Dealer'].gameScore = 0;
  gameObj['Dealer'].matchScore = 0;
}


// Display Functions

function displayArrayItems(array, minLengthToUseCommas = 3) {
  if (array.length < minLengthToUseCommas) return array.join(" and ");
  return array.slice(0, -1).join(", ") + ` and ${array[array.length - 1]}`;
}

function displayPlayerHand(player, maskOneCard) {
  let handArr = cardObjtoArray(gameObj[player].hand, maskOneCard);
  return displayArrayItems(handArr);
}

function showHands(dealerMaskOneCard = true, includeHeader = '') {
  console.clear();
  if (includeHeader) console.log(includeHeader);
  console.log(`Dealer has: ${displayPlayerHand('Dealer', dealerMaskOneCard)}`);
  console.log(`You have: ${displayPlayerHand('Player', false)}`);
}

function displayGameResult(gameWinner, matchIsWon, matchStyle = false) {
  showHands(false, MESSAGES.finalScoreDisplay);
  if (gameWinner === 'Tie') {
    prompt(MESSAGES.declareTie);
  } else if (matchIsWon && matchStyle) {
    prompt(`${gameWinner} wins the game and match!`);
  } else {
    prompt(`${gameWinner} wins the game!`);
  }
}

function notifyBust(bustedPlayer) {
  prompt(`${bustedPlayer} has gone bust!`);
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

// Game-play functions

function playerChoice() {
  let scoreIsMax = (gameObj.Player.score === MAX_SCORE);
  if (!scoreIsMax) return prompt(MESSAGES.stayOrHit, true).toLowerCase();
  prompt(MESSAGES.maxScore); // Player has a maxScore, deny choice
  return 'stay';
}

function dealerChoice() {
  let diff = gameObj.Player.score - gameObj.Dealer.score;
  if (diff < 0) return 'stay';
  if (diff === 0 && (MAX_SCORE - gameObj.Dealer.score < 7)) return 'stay';
  return 'hit';
}

function singleTurnPlay(player, playerChoiceFunction) { // Returns if player chooses to stay or not
  let choice = validateUserInput(['stay', 'hit', 's', 'h'],
    playerChoiceFunction, '');
  if (choice === 'stay' || choice === 's') {
    commentary('stay', player);
    return true;
  }
  hitHand(player);
  showHands();
  prompt(commentary('hit', player));
  return false;
}

function playOrganizerAndBustDetector(player) {
  // Executes a player's turn until the player stays or goes bust.
  // Returns whether the player is bust.
  let choiceMaker = {Player : playerChoice, Dealer : dealerChoice}[player];
  let bustedStatus = false;
  let playerStays = false;
  while (!(bustedStatus || playerStays)) {
    showHands();
    playerStays = singleTurnPlay(player, choiceMaker);
    updatePlayerScore(player);
    bustedStatus = detectBust(player);
  }
  return (bustedStatus === true);
}

function runGameAndAssessWinner() {
  if (playOrganizerAndBustDetector('Player')) {
    notifyBust('Player');
    return 'Dealer';
  }
  if (playOrganizerAndBustDetector('Dealer')) {
    notifyBust('Dealer');
    return 'Player';
  }
  return assessWinner();
}

function initializeGame() {
  initializeDeck();
  initializeHands();
  initializeScores();
}

function runGames(matchStyle = false, gamesToWin = 1) { // Returns [matchIsWon, playAnotherGame]
  let playAnotherGame = true;
  while (playAnotherGame) {
    initializeGame();
    showHands();
    let gameWinner = runGameAndAssessWinner();
    updateGameScore(gameWinner);
    if (matchStyle && detectMatchWin(gameWinner, gamesToWin)) {
      updateMatchScores(gameWinner);
      displayGameResult(gameWinner, true, matchStyle);
      displayScores(matchStyle);
      return [true, true];
    }
    displayGameResult(gameWinner);
    displayScores(matchStyle);
    playAnotherGame = answerIsYes(MESSAGES.requestAnotherGame);
  }
  return [false, false];
}

function runMatches(matchStyle = false, gamesToWin = 1) {
  let playAnotherMatch = true;
  let matchIsWon = false;
  let playAnotherGame = true;
  resetMatchScores();
  while (playAnotherMatch && playAnotherGame) {
    [matchIsWon, playAnotherGame] = runGames(matchStyle, gamesToWin);
    if (matchIsWon) {
      resetMatchScores();
      playAnotherMatch = answerIsYes(MESSAGES.requestAnotherMatch);
    }
  }
}

// Main program

let numberGames = 1;
let continuePlay = true;
while (continuePlay) {
  console.clear();
  console.log(MESSAGES.intro);
  let userPrefMatchStyle = prompt(MESSAGES.selectGameorMatch,
    true).toLowerCase();
  if (userPrefMatchStyle === 'm' || userPrefMatchStyle === 'match') {
    numberGames = Number(prompt(MESSAGES.numberGamesToWin, true));
    runMatches(true, numberGames);
    continuePlay = answerIsYes(MESSAGES.playAnotherMatch);
  } else if (userPrefMatchStyle === 'g' || userPrefMatchStyle === 'game') {
    runMatches(false, 0);
    continuePlay = answerIsYes(MESSAGES.playAnotherMatch);
  } else {
    prompt("Incorrect input, try again");
  }
}
