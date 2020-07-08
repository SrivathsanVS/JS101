const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

function decipherChoice(choice) {
  if (VALID_CHOICES.includes(choice)) {
    return choice;
  }
  if (choice === 's') {
    prompt('Please clarify if you mean spock or scissors?');
    return decipherChoice(readline.question().toLowerCase());
  }
  const abbreviations = {
    r: 'rock',
    p: 'paper',
    l: 'lizard'};
  return abbreviations[choice];
}

function displayReturnWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if ((choice === 'rock' && ['scissors', 'lizard'].includes(computerChoice)) ||
      (choice === 'paper' && ['rock', 'spock'].includes(computerChoice)) ||
      (choice === 'scissors' && ['paper', 'lizard'].includes(computerChoice)) ||
      (choice === 'lizard' && ['paper', 'spock'].includes(computerChoice)) ||
      (choice === 'spock' && ['rock', 'scissors'].includes(computerChoice))) {
    prompt('You win!');
    return 'user';
  } else if (choice === computerChoice) {
    prompt("It's a tie!");
    return 'tie';
  } else {
    prompt("Computer wins!");
    return 'computer';
  }
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function incrementScore(score, winner) {
  try {
    score[winner] += 1;
  } catch (error) {
    if (!(error instanceof ReferenceError)) {
      console.log('Error!');
      throw error;
    }
  }
  if ((score.user === 3) || (score.computer === 3)) {
    let matchWinner = (score.user > score.computer) ? 'user' : 'computer';
    prompt(`${matchWinner} is the match winner!`);
    score.user = 0;
    score.computer = 0;
  }
}

let score = {user : 0, computer : 0};

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = decipherChoice(readline.question());

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice. Try again: ");
    choice = decipherChoice(readline.question());
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  incrementScore(score, displayReturnWinner(choice, computerChoice));

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}
