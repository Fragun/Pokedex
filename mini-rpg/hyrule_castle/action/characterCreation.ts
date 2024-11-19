import { Classes } from '../interface/classes';
import { Players } from '../interface/players';
import { Races } from '../interface/races';
import Display from '../class/displayClass';

const fs = require('fs');
const readline = require('readline-sync');

export default function characterCreation() {
  const playerContent = fs.readFileSync('./ressourcesJson/players.json', 'utf-8');
  const jsonObject: Players[] = JSON.parse(playerContent);
  const RacePlayerContent = fs.readFileSync('./ressourcesJson/races.json', 'utf-8');
  const jsonObjectRace: Races[] = JSON.parse(RacePlayerContent);
  const ClassPlayerContent = fs.readFileSync('./ressourcesJson/classes.json', 'utf-8');
  const jsonObjectClass: Classes[] = JSON.parse(ClassPlayerContent);
  let classCharacterCreation: Classes = jsonObjectClass[0];
  let raceCharacterCreation: Races = jsonObjectRace[0];

  let confirm = false;
  let characterCreationInGame: Players = {
    id: 0,
    name: '',
    hp: 0,
    mp: 0,
    str: 0,
    int: 0,
    def: 0,
    res: 0,
    spd: 0,
    luck: 0,
    race: 0,
    class: 0,
    rarity: 0,
  };
  while (confirm === false) {
    const idCreation: number = (jsonObject[jsonObject.length - 1].id) + 1;
    const nameCreation: string = readline.question('Choose name for your personnage : ');
    console.log('================Name====================');
    console.log(`Your name is ${nameCreation}`);
    console.log('====================================');
    console.log('Now you will have to choose a race from the following : ');
    console.log('================Races====================');
    Display.displayRace(jsonObjectRace);
    let raceChoose = readline.questionInt(`Choose your race between 1 and ${jsonObjectRace.length} : `);
    while (raceChoose > 17) {
      raceChoose = readline.questionInt(`Please tap your number race (between 1 and ${jsonObjectRace.length}) : `);
    }
    console.log('====================================');
    console.log('Now you will have to choose a class from the following : ');
    console.log('================Races====================');
    Display.displayClasses(jsonObjectClass);
    const classChoose = readline.keyIn(`Choose your class between 1 and ${jsonObjectClass.length} : `);

    classCharacterCreation = jsonObjectClass[classChoose - 1];
    raceCharacterCreation = jsonObjectRace[raceChoose - 1];
    // displayReadlineTest();
    // ----------------------------------LOGIQUE POINT STATISTIQUE ----------------------------
    let counter: number = 0;
    console.log('====================================');
    console.log('Choose your game difficulty between :');
    console.log('====================================');
    const playerDifficultySelected = readline.keyIn('1- Beginner (400 statistics points) \n 2- Easy (200 statistics points) \n 3- Normal (150 statistics points) \n 4- Hard (100 statistics points)', { limit: '1234' });
    console.log(playerDifficultySelected);
    if (playerDifficultySelected === '1') {
      counter = 400;
    } else if (playerDifficultySelected === '2') {
      counter = 200;
    } else if (playerDifficultySelected === '3') {
      counter = 150;
    } else if (playerDifficultySelected === '4') {
      counter = 100;
    } else {
      console.log('Please Tap a correct value between 1, 2 or 3 !');
    }
    const repartitionPoints = (count: number) => {
      let totalPointsRemaining = count;
      const maxHp = Math.floor(count * 0.4);
      const maxMp = Math.floor(count * 0.7);
      const maxStr = Math.floor(count * 0.1);
      const maxInt = Math.floor(count * 0.1);
      const maxDef = Math.floor(count * 0.12);
      const maxRes = Math.floor(count * 0.05);
      const maxSpd = Math.floor(count * 0.08);
      const maxLuck = Math.floor(count * 0.2);

      console.log('====================================');
      console.log(`Please distribute your ${counter} points`);
      console.log('====================================');

      const displayStatisticsChoice = (text: string, max: number) => {
        let valid: boolean = false;
        let statPlayer;
        while (valid === false) {
          statPlayer = readline.questionInt(`Distribute ${text} (max: ${max}) points, remaining points: ${totalPointsRemaining}: `);
          if (statPlayer > max) {
            console.error('Please select a valid value');
          } else if (statPlayer > totalPointsRemaining) {
            console.error('You have no points left to distribute');
          } else {
            totalPointsRemaining -= statPlayer;
            valid = true;
          }
        }
        return statPlayer;
      };

      const pointsHp = displayStatisticsChoice('Health Points', maxHp);
      const pointsMp = displayStatisticsChoice('Magic Points', maxMp);
      const pointsStr = displayStatisticsChoice('Strength', maxStr);
      const pointsInt = displayStatisticsChoice('Intelligence', maxInt);
      const pointsDef = displayStatisticsChoice('Defense', maxDef);
      const pointsRes = displayStatisticsChoice('Resistance', maxRes);
      const pointsSpd = displayStatisticsChoice('Speed', maxSpd);
      const pointsLuck = displayStatisticsChoice('Luck', maxLuck);

      return {
        pointsHp, pointsMp, pointsStr, pointsInt, pointsDef, pointsRes, pointsSpd, pointsLuck,
      };
    };

    const stats = repartitionPoints(counter);
    const {
      pointsHp,
      pointsMp,
      pointsStr,
      pointsInt,
      pointsDef,
      pointsRes,
      pointsSpd,
      pointsLuck,
    } = stats;
    // -------------------------------- CONFIRMATION -----------------------------------------

    characterCreationInGame = {
      id: idCreation,
      name: nameCreation,
      hp: pointsHp,
      mp: pointsMp,
      str: pointsStr,
      int: pointsInt,
      def: pointsDef,
      res: pointsRes,
      spd: pointsSpd,
      luck: pointsLuck,
      race: raceChoose - 1,
      class: parseInt(classChoose, 10) - 1,
      rarity: 1,
    };

    Display.displayOptionCharacter(
      characterCreationInGame,
      jsonObjectRace[characterCreationInGame.race],
      jsonObjectClass[characterCreationInGame.class],
      1,
      0,
      1,
    );
    confirm = readline.keyInYN('Do you confirm ? ');
  }
  return {
    player: characterCreationInGame,
    race: raceCharacterCreation,
    class: classCharacterCreation,
  };
}
