import { Bosses } from '../../interface/bosses';
import { Classes } from '../../interface/classes';
import { Enemies } from '../../interface/enemies';
import { Players } from '../../interface/players';
import { Races } from '../../interface/races';
import { arrayRaretyCoef } from '../../interface/rarety';
import shuffle from './shuffle';

const fs = require('fs');

export default function enemyChoice(floorNumber: number, difficulty: string) {
  const enemyContent = fs.readFileSync('./ressourcesJson/enemies.json', 'utf-8');
  const jsonObjectEnemy: Players[] = JSON.parse(enemyContent);
  const bossContent = fs.readFileSync('./ressourcesJson/bosses.json', 'utf-8');
  const jsonObjectBoss: Players[] = JSON.parse(bossContent);

  const RaceEnemiesContent = fs.readFileSync('./ressourcesJson/races.json', 'utf-8');
  const jsonObjectRace: Races[] = JSON.parse(RaceEnemiesContent);
  const ClassEnemiesContent = fs.readFileSync('./ressourcesJson/classes.json', 'utf-8');
  const jsonObjectClass: Classes[] = JSON.parse(ClassEnemiesContent);

  // ----------------------------------Boss---------------------------------------------
  if (floorNumber === 10 || floorNumber === 20 || floorNumber === 50 || floorNumber === 100) {
    const bosses: Bosses[] = shuffle(jsonObjectBoss);
    let sumOfCoefRaretybosses: number = 0;
    for (const element of bosses) {
      sumOfCoefRaretybosses += arrayRaretyCoef[element.rarity];
    }

    let randomNumberBosses: number;
    let bossRandom: Bosses = bosses[0];

    let sumBosses = 0;
    for (const boss of bosses) {
      randomNumberBosses = Math.floor(Math.random() * sumOfCoefRaretybosses) + 1;
      const rarety: number = boss.rarity;
      const coefRaretyPlayer = arrayRaretyCoef[rarety];
      sumBosses += coefRaretyPlayer;
      const randomByCoefOfRarety = Math.floor(Math.random() * sumBosses);
      if (randomByCoefOfRarety > randomNumberBosses) {
        bossRandom = boss;
        break;
      }
    }
    const raceIdBoss: number = bossRandom.race;
    const objetRace = jsonObjectRace.find(
      (element) => element.id === raceIdBoss,
    ) || jsonObjectRace[0];

    const classId: number = bossRandom.class;
    const objetClass = jsonObjectClass.find(
      (element) => element.id === classId,
    ) || jsonObjectClass[0];

    return { enemy: bossRandom, race: objetRace, class: objetClass };
  }
  // ----------------------------------Enemy---------------------------------------------
  const enemies: Enemies[] = shuffle(jsonObjectEnemy);
  let sumOfCoefRarety: number = 0;
  for (const element of enemies) {
    sumOfCoefRarety += arrayRaretyCoef[element.rarity];
  }

  let randomNumber: number;
  let enemyRandom: Enemies = enemies[0]; // j'utilise une valeur
  // par default pour éviter les erreru de typage

  let sum = 0;
  for (const enemy of enemies) {
    randomNumber = Math.floor(Math.random() * sumOfCoefRarety) + 1;
    const rarety: number = enemy.rarity;
    const coefRaretyPlayer = arrayRaretyCoef[rarety];
    sum += coefRaretyPlayer;
    const randomByCoefOfRarety = Math.floor(Math.random() * sum);
    if (randomByCoefOfRarety > randomNumber) {
      enemyRandom = enemy;
      break;
    }
  }
  const raceId: number = enemyRandom.race;
  const objetRace = jsonObjectRace.find(
    (element) => element.id === raceId,
  ) || jsonObjectRace[0];

  const classId: number = enemyRandom.class;
  const objetClass = jsonObjectClass.find(
    (element) => element.id === classId,
  ) || jsonObjectClass[0];

  const difficult = () => {
    switch (difficulty) {
      case '1':
        break;
      case '2':
        enemyRandom.hp = Math.floor(enemyRandom.hp * 1.5);
        enemyRandom.mp = Math.floor(enemyRandom.mp * 1.5);
        enemyRandom.str = Math.floor(enemyRandom.str * 1.5);
        enemyRandom.int = Math.floor(enemyRandom.int * 1.5);
        enemyRandom.def = Math.floor(enemyRandom.def * 1.5);
        enemyRandom.res = Math.floor(enemyRandom.res * 1.5);
        enemyRandom.spd = Math.floor(enemyRandom.spd * 1.5);
        enemyRandom.luck = Math.floor(enemyRandom.luck * 1.5);
        break;
      case '3':
        enemyRandom.hp = Math.floor(enemyRandom.hp * 2);
        enemyRandom.mp = Math.floor(enemyRandom.mp * 2);
        enemyRandom.str = Math.floor(enemyRandom.str * 2);
        enemyRandom.int = Math.floor(enemyRandom.int * 2);
        enemyRandom.def = Math.floor(enemyRandom.def * 2);
        enemyRandom.res = Math.floor(enemyRandom.res * 2);
        enemyRandom.spd = Math.floor(enemyRandom.spd * 2);
        enemyRandom.luck = Math.floor(enemyRandom.luck * 2);
        break;
      default:
        break;
    }
  };
  difficult();
  return { enemy: enemyRandom, race: objetRace, class: objetClass };
}
