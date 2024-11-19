import { Players } from './interface/players';
import enemyChoice from './action/component/enemyChoice';
import heal from './action/heal';
import { Classes } from './interface/classes';
import { Races } from './interface/races';
import { Enemies } from './interface/enemies';
import { Bosses } from './interface/bosses';
import calculAndDisplayAttack from './action/better_combat_options';
import characterCreation from './action/characterCreation';
import Display from './class/displayClass';
import levelAndExperience from './action/level_and_experience';
import displayTitleScreen, { floorChoice } from './basic_game_customization';
// import playerChoice from './action/component/playerchoice';

const readline = require('readline-sync');
console.log('test docker');

export default function hyruleCastle() {
  const difficultyChoice: string = displayTitleScreen();
  const numberOfFloorMax: string = floorChoice();
  let numberFloorsMax: number = parseInt(numberOfFloorMax, 10);
  let coins: number = 12;
  console.log(numberFloorsMax);
  switch (numberFloorsMax) {
    case 1:
      numberFloorsMax = 10;
      break;
    case 2:
      numberFloorsMax = 20;
      break;
    case 3:
      numberFloorsMax = 50;
      break;
    case 4:
      numberFloorsMax = 100;
      break;
    default:
      break;
  }

  let expPlayer: number = 0;
  let levelPlayer: number = 1;

  const playerClassAndRaceObject = characterCreation();
  // const playerClassAndRaceObject = playerChoice();
  const playerObject: Players = playerClassAndRaceObject.player;
  const playerClassObject: Classes = playerClassAndRaceObject.class;
  const playerRaceObject: Races = playerClassAndRaceObject.race;
  let floorsNumber: number = 1;
  let inGamePlayer: Players = playerObject; // caractéristique de départ du joueur /////////////
  const maxHpPlayer: number = inGamePlayer.hp;
  let playerAlive: boolean = true;

  while (floorsNumber <= numberFloorsMax && playerAlive) {
    const inGameEnemyClassRace = enemyChoice(floorsNumber, difficultyChoice);
    const inGameEnemy: Enemies | Bosses = inGameEnemyClassRace.enemy;
    const inGameEnemyRace = inGameEnemyClassRace.race;
    const inGameEnemyClass = inGameEnemyClassRace.class;
    const maxHpEnemy: number = inGameEnemy.hp;
    let numberAttack: number = 1;

    console.log(`\n ˋ°•*⁀➷ˏˋ°•*⁀➷ˏˋ°•*⁀➷ˏˋ°•*⁀➷  𝔉𝔩𝔬𝔬𝔯 № ${floorsNumber} ˏˋ°•*⁀➷ˏˋ°•*⁀➷ˏˋ°•*⁀➷ˏˋ°•*⁀➷ˏˋ°•*⁀➷\n`);

    console.log(`\x1B[31m ---------------------------You encounter ${inGameEnemy.name}--------------------------- \x1B[0m`);
    Display.displayCharacter(inGamePlayer, maxHpPlayer);
    Display.displayCharacter(inGameEnemy, maxHpEnemy);

    while (inGameEnemy.hp > 0) {
      console.log('\n ˋ°•*⁀➷ˋ°•*⁀➷ˏˏChoose your action between \x1B[3m (type the corresponding number) \x1B[0m :');
      console.log('-----------------------→ 1-Attack\n-----------------------→ 2-Heal\n-----------------------→ 3-Player statistics\n');
      const playerActionSelected: number = readline.questionInt('ˋ°•*⁀➷ˋ°•*⁀➷Your choice :');
      if (playerActionSelected === 1) { // ----------------------------Attack------------------
        calculAndDisplayAttack(
          numberAttack,
          playerClassObject,
          playerRaceObject,
          inGameEnemyClass,
          inGameEnemyRace,
          inGameEnemy,
          inGamePlayer,
          1,
        );
        if (inGameEnemy.hp <= 0) {
          console.log(`☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ${inGameEnemy.name} died! ☠️  ☠️  ☠️  ☠️  ☠️  ☠️ `);
          const [exp, lvl, player] = levelAndExperience(
            expPlayer,
            levelPlayer,
            inGamePlayer,
            playerObject.hp,
          );
          inGamePlayer = player;
          expPlayer = exp;
          levelPlayer = lvl;
          numberAttack = 0;
          floorsNumber += 1;
          coins += 1;
          console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Experiences and level 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ');
          console.log(`🚀🚀🚀🚀🚀🚀🚀  You have ${expPlayer} experiences points, your level : ${levelPlayer} and ${coins} coins🚀🚀🚀🚀🚀🚀🚀`);
          break;
        }

        calculAndDisplayAttack(
          numberAttack,
          inGameEnemyClass,
          inGameEnemyRace,
          playerClassObject,
          playerRaceObject,
          inGamePlayer,
          inGameEnemy,
          2,
        );
        numberAttack += 1;
      } else if (playerActionSelected === 2) { // ----------------------------HEAL------------------
        inGamePlayer = heal(inGamePlayer, numberAttack, maxHpPlayer);
        console.log('❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️ You healed yourself ! ❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️');
        calculAndDisplayAttack(
          numberAttack,
          inGameEnemyClass,
          inGameEnemyRace,
          playerClassObject,
          playerRaceObject,
          inGamePlayer,
          inGameEnemy,
          2,
        );
        numberAttack += 1;
        console.log(`But ${inGameEnemy.name} attacked and dealt ${inGameEnemy.str} damages!`);
      } else if (playerActionSelected === 3) { // ------------------ option Character---------------
        console.log('--option statistics player and ennemy');
        Display.displayOptionCharacter(
          inGamePlayer,
          playerRaceObject,
          playerClassObject,
          1,
          expPlayer,
          levelPlayer,
        );
        Display.displayOptionCharacter(
          inGameEnemy,
          inGameEnemyRace,
          inGameEnemyClass,
          2,
          expPlayer,
          levelPlayer,
        );
      } else {
        console.error('Please select a valid action');
      }
      Display.displayCharacter(inGamePlayer, maxHpPlayer);
      Display.displayCharacter(inGameEnemy, maxHpEnemy);
      if (inGamePlayer.hp <= 0) {
        playerAlive = false;
        break;
      }
    }
  }
  if (floorsNumber > 10) {
    console.log('🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆 You win ! 🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆');
  } else { console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀Game over ! 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀'); }
}
hyruleCastle();
