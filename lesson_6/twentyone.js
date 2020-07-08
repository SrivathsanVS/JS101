let readline = require('readline-sync');

let gameObj = {
  Player: { hand : [], score : 0, gameScore: 0, matchScore: 0},
  Dealer: { hand : [], score : 0, gameScore: 0, matchScore: 0},
  deck: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
  cardsInDeck: 52
};
const INITIAL_DECK = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
const DECK = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

const MAX_SCORE = 21;
const ACE_MAX_VAL = 11;
const ACE_MIN_VAL = 1;
const FACE_CARD_VAL = 10;

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
  for (let tempInd = index + 1; tempInd < gameObj.deck.length; tempInd++) {
    gameObj.deck[tempInd] -= 1;
  }
}

function dealCard() {
  let randomCardIndex = Math.floor(Math.random() * (gameObj.cardsInDeck - 1));
  let ind;
  for (ind in gameObj.deck) {
    if (gameObj.deck[ind] > randomCardIndex) break;
  }
  ind -= 1;
  updateDeck(ind);
  return DECK[ind];
}

function otherPlayer(player) {
  return (player === 'Player') ? 'Dealer' : 'Player';
}

function showHandStringGen(player, fullDealerReveal = false) {
  function stringGrammar(arr) {
    if (arr.length < 3) return arr.join(" and ");
    return arr.slice(0, -1).join(", ") + ` and ${arr[arr.length - 1]}`;
  }
  if (player === 'Dealer' && !fullDealerReveal) {
    let arr = gameObj.Dealer.hand.slice();
    // console.log(arr);
    if (arr.length >= 2) return stringGrammar([].concat(arr[0],
      arr.slice(2, arr.length),
      'unknown card'));
  }
  return stringGrammar(gameObj[player].hand);
}


function showHands(fullDealerReveal = false, includeHeader = '') {
  console.clear();
  if (includeHeader) console.log(includeHeader);
  console.log(`Dealer has: ${showHandStringGen('Dealer', fullDealerReveal)}`);
  console.log(`You have: ${showHandStringGen('Player', fullDealerReveal)}`);
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

function hitHand(player) {
  gameObj[player].hand.push(dealCard());
}

function scoreHand(cardArr) {
  let score = 0;
  let aceCount = 0;
  for (let ind in cardArr) {
    if (cardArr[ind] === 'Ace') {
      aceCount += 1;
      continue;
    }
    score += Math.min(1 + DECK.indexOf(cardArr[ind]), FACE_CARD_VAL);
  }
  if (!aceCount) return score;
  let maxAceVal = ACE_MAX_VAL + ((aceCount - 1) * ACE_MIN_VAL);
  let minAceVal = aceCount * ACE_MIN_VAL;
  score = (score + maxAceVal <= MAX_SCORE) ?
    score + maxAceVal : score + minAceVal;
  return score;
}

function updateScoresAndDetectBust(player) {
  gameObj[player].score = scoreHand(gameObj[player].hand);
  if (gameObj[player].score > MAX_SCORE) return true;
  return false;
}

function bustHandler(bustedPlayer) {
  prompt(`${bustedPlayer} has gone bust!`);
}

function dealerChoice() {
  let diff = gameObj.Player.score - gameObj.Dealer.score;
  if (diff < 0) return 'stay';
  return 'hit';
}

function playerChoice() {
  return prompt("Do you wish to stay or hit?", true);
}

function commentary(choice, player) {
  let choiceObj = {
    stay: {
      Player : `You have chosen to stay. Your turn ends.`,
      Dealer : `Dealer chooses to stay. End of play. Calculating scores to assess winner...`
    },
    hit: {
      Player : `You have chosen to hit. Updated decks shown above`,
      Dealer : `Dealer chose to hit. Updated decks shown above`
    }
  };
  return choiceObj[choice][player];
}

function playOrganizerAndBustDetector(player) {
  let choiceMaker = {Player : playerChoice, Dealer : dealerChoice}[player];
  let playerBustedStatus = false;
  while (!playerBustedStatus) {
    showHands();
    let choice = choiceMaker();
    if (choice === 'stay') {
      commentary('stay', player);
      return playerBustedStatus;
    }
    hitHand(player);
    showHands();
    prompt(commentary('hit', player));
    playerBustedStatus = updateScoresAndDetectBust(player);
  }
  return playerBustedStatus;
}

function assessWinner() {
  if (gameObj.Player.score > gameObj.Dealer.score) return 'Player';
  if (gameObj.Player.score === gameObj.Dealer.score) return 'Tie';
  return 'Dealer';
}

function declareWinnerUpdateMatchScores(winner, gamesToWin) {
  showHands(true, "Final hands and result : ");
  if (winner === 'Tie') {
    prompt("It's a tie!");
    return false;
  }
  gameObj[winner].gameScore += 1;
  if (gameObj[winner].gameScore === gamesToWin) {
    prompt(`${winner} wins the game and match!`);
    gameObj[winner].matchScore += 1;
    gameObj[winner].gameScore = 0;
    gameObj[otherPlayer(winner)].gameScore = 0;
    return true;
  }
  prompt(`${winner} wins the game!`);
  return false;
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

function displayScores() {
  let templateString = (player) => {
    return `${player} :\n Game score : ${gameObj[player].gameScore}\n Match score : ${gameObj[player].matchScore}`;
  };
  console.log(templateString('Player'));
  console.log(templateString('Dealer'));
}

function resetDeckAfterMatch() {
  gameObj.deck = INITIAL_DECK;
  gameObj.cardsInDeck = 52;
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
    playAnotherGame = answerIsYes(prompt("Continue playing (y/n)? ",
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
      playAnotherMatch = answerIsYes(prompt("Play again (y/n)? ",
        true));
    }
  }
}

let numberGames = 1;
let incorrectInput = true;
while (incorrectInput) {
  let userPrefMatchStyle = prompt("Select game(g) OR match(m)?",
    true);
  if (userPrefMatchStyle === 'm' || userPrefMatchStyle === 'match') {
    numberGames = Number(prompt("How many games to win a match?", true));
    runMatches(true, numberGames);
    incorrectInput = false;
  } else if (userPrefMatchStyle === 'g' || userPrefMatchStyle === 'game') {
    runMatches(true, 1);
    incorrectInput = false;
  } else {
    prompt("Incorrect input, try again");
  }
}
