let readline = require('readline-sync');

const INITIAL_MARKER = ' ';
let humanMarker = 'X';
let compMarker = 'O';

function prompt(message, delay = false) {
  console.log(`=> ${message}`);
  if (delay) readline.question();
}

function updateOrderOfPlay(firstPlayer) {
  if (!['user', 'u'].includes(firstPlayer)) {
    humanMarker = 'O';
    compMarker = 'X';
  }
}

function displayBoard(board) {
  console.clear();
  console.log(`You are ${humanMarker}. Computer is ${compMarker}. X plays first.`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};
  for (let square = 1; square <= 9; square++) {
    board[String(square)] = ' ';
  }
  return board;
}

function initializeScore() {
  let maxGames = Number(readline.question('Enter max number of games : '));
  let gamesToWin = Math.ceil(maxGames / 2);
  let firstPlayer;
  while (true) {
    firstPlayer = readline.question('Choose 1st player (user(u)/computer(c)):');
    firstPlayer = firstPlayer.toLowerCase();
    if (!['user', 'computer'].includes(firstPlayer) &&
        !['u', 'c'].includes(firstPlayer)) {
      console.log("Invalid entry. Try again : ");
      continue;
    }
    console.log(humanMarker, compMarker);
    updateOrderOfPlay(firstPlayer);
    break;
  }
  prompt(`Matches to win: ${gamesToWin}. Press enter to begin.`, true);
  return {Player: 0, Computer: 0, maxGames: gamesToWin};
}

function updateScore(score, winner) {
  score[winner] += 1;
}

function maxScore(score) {
  return Math.max(score.Player, score.Computer);
}

function detectMatchWin(score) {
  return (maxScore(score) === score.maxGames);
}

function promptResult(score, winner) {
  let matchWin = `${winner} wins game and match!`;
  let gameWin = `${winner} wins! Current score : Player - ${score.Player}, Computer - ${score.Computer}`;
  if (detectMatchWin(score)) {
    prompt(matchWin);
  } else {
    prompt(gameWin);
  }
}

function promptScoreReset(score) {
  if (detectMatchWin(score)) prompt('Resetting scores!');
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;
  while (true) {
    prompt('Choose a square (1 - 9) :');
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;
    prompt("Sorry, not a valid choice.");
  }
  board[square] = humanMarker;
}

function sumArr(array, board, showString = false)  {
  try {
    let string = (board[Number(array[0])] + board[Number(array[1])]
                  + board[Number(array[2])]).trim().replace(' ', '');
    if (showString) {
      console.log(string);
    }
    if (string === 'XO' || string === 'OX') return 0;
    if (string.length === 0) return 1;
    if (string.length === 1) return 2;
    return 10;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

function sumTile(key, board) {
  let baseCol = ((key - 1) % 3) + 1;
  let baseRow = [1, 4, 7][Math.floor((key - 1) / 3)];
  // console.log(`Base row and col : ${baseRow}, ${baseCol}`);
  let rowSum = sumArr([baseRow, baseRow + 1, baseRow + 2], board);
  // console.log(`Row sum : ${rowSum}`);
  let colSum = sumArr([baseCol, baseCol + 3, baseCol + 6], board);
  // console.log(`Col sum : ${colSum}`);
  let diagSum = (sumArr([1, 5, 9], board) * ([1, 5, 9].includes(Number(key)))) +
                (sumArr([3, 5 ,7], board) * ([3, 5, 7].includes(Number(key))));
  // console.log(`Diag sum : ${diagSum}`);
  return rowSum + colSum + diagSum;
}

function computerChoosesSquare2(board) {
  let maxVal = 0;
  let maxPos;
  let sum;
  for (let key in board) {
    if (board[key] !== ' ') continue;
    sum = sumTile(Number(key), board);
    if (sum > maxVal) {
      maxVal = sum;
      maxPos = key;
    }
    // console.log(`Position ${key} : ${sum}`);
  }
  // console.log(`Max Position : ${maxPos}`);
  // readline.question();
  console.log(`Computer plays position : ${maxPos}`);
  board[maxPos] = compMarker;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  let winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];
  for (let line = 0; line < winningLines.length; line++) {
    let subArr = '';
    Object.keys(board).filter(elem => winningLines[line].includes(Number(elem)))
      .forEach(num => {
        subArr += board[String(num)];
      });
    // let dummyVar = readline.question
    // (`Acknowledge markerSum ${winningLines[line]} : ${subArr}`);
    if (subArr === humanMarker.repeat(3)) return 'Player';
    if (subArr === compMarker.repeat(3)) return 'Computer';
  }
  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function runGame(board) {
  let functionToPlay = [computerChoosesSquare2, playerChoosesSquare];
  let orderOfPlay = Number(humanMarker === 'X');
  while (true) {
    displayBoard(board);
    functionToPlay[orderOfPlay](board);
    if (someoneWon(board) || boardFull(board)) break;
    displayBoard(board);
    functionToPlay[Number(!orderOfPlay)](board);
    // computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;
    readline.question();
  }
}

function runMultipleGames(score) {
  while (true) {
    let board = initializeBoard();
    runGame(board);
    displayBoard(board);
    if (someoneWon(board)) {
      let winner = detectWinner(board);
      updateScore(score, winner);
      promptResult(score, winner);
    } else {
      prompt("It's a tie!");
    }
    if (detectMatchWin(score)) break;
    prompt('Play again? (y or n)');
    let answer = readline.question().toLowerCase()[0];
    if (answer !== 'y') break;
  }
}

while (true) {
  let score = initializeScore();
  runMultipleGames(score);
  prompt('Play another match? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
  promptScoreReset(score);
}
