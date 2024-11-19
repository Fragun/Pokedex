const readline = require('readline-sync');

export function floorChoice() {
  console.log('1 : 10 floors');
  console.log('2 : 20 floors');
  console.log('3 : 50 floors');
  console.log('4 : 100 floors');
  const answerFloor = readline.question('Choose the number of floors () : tap 1-2-3-4 : ');
  console.log(answerFloor);
  return answerFloor;
}

function startNewGame() {
  console.log('You start a new game.');
}

function quitGame() {
  console.log('See you later.');
  process.exit(0);
}

function difficultyChoice() {
  console.log('1- Normal\n2- Difficult\n3- Insame');
  const difficultyQuestion = readline.question('Choose your difficulty level between 1, 2 or 3');
  switch (difficultyQuestion) {
    case '1':
      console.log('Your choice is normal');
      break;
    case '2':
      console.log('Your choice is Difficult');
      break;
    case '3':
      console.log('Your choice is Insame');
      break;
    default:
      console.log('PLease choose a valid option between 1, 2 or 3');
      difficultyChoice();
  }
  return difficultyQuestion;
}

export default function displayTitleScreen() {
  console.log('🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢');
  console.log('🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢\x1b[34m\x1b[1m  Welcome to the infernal floors 🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)) \x1b[0m');
  console.log('🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢  ̿̿’̿’̵͇̿̿\\=(•̪●)=/̵͇̿̿/’̿̿ ̿ ̿ ̿  🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢');
  console.log('🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢\x1b[34m\x1b[1m 1 - Start new game 🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢\x1b[0m');
  console.log('🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢\x1b[34m\x1b[1m 2 - Quit 🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢🏢\x1b[0m');

  const question = readline.question('Please tap 1 or 2 :');
  let diff: string = '';
  switch (question) {
    case '1':
      diff = difficultyChoice();
      startNewGame();
      return diff;
    case '2':
      quitGame();
      return diff;
    default:
      console.log('PLease choose a valid option between 1 and 2');
      return displayTitleScreen();
  }
}
