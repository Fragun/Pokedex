import { Bosses } from '../interface/bosses';
import { Classes } from '../interface/classes';
import { Enemies } from '../interface/enemies';
import { Players } from '../interface/players';
import { Races } from '../interface/races';

function basicCharacteristics(
  attackNumber: number,
  classPlayer: Classes,
  racePlayer: Races,
  classEnemy: Classes,
  raceEnemy: Races,
  playerNumber: number,
  // floorNumber: number,
) {
  if (playerNumber === 1) {
    console.log(`\n▄︻┻┳═一 ▄︻┻┳═一 ▄︻┻┳═一 ▄︻┻┳═一 ▄︻┻┳═一 ROUND ${attackNumber} - - - - - - ━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)\n`);
  }
  let multiplicatorOfDamage: number = 1;

  if (racePlayer.strength.includes(raceEnemy.id)
    && classPlayer.strengths.includes(classEnemy.id)) {
    multiplicatorOfDamage *= 4;
  } else if (
    racePlayer.strength.includes(raceEnemy.id)
    || classPlayer.strengths.includes(classEnemy.id)) {
    multiplicatorOfDamage *= 2;
  }

  if (racePlayer.weakness.includes(raceEnemy.id)
    && classPlayer.weaknesses.includes(classEnemy.id)) {
    multiplicatorOfDamage *= 0.25;
  } else if (
    racePlayer.weakness.includes(raceEnemy.id)
    || classPlayer.weaknesses.includes(classEnemy.id)) {
    multiplicatorOfDamage *= 0.5;
  }
  return multiplicatorOfDamage;
}

export default function calculAndDisplayAttack(
  numberAttack: number,
  playerClassObject: Classes,
  playerRaceObject: Races,
  inGameEnemyClass: Classes,
  inGameEnemyRace: Races,
  inGameEnemy: Enemies | Bosses | Players,
  inGamePlayer: Enemies | Bosses | Players,
  playerNumber: number,
) {
  const multiplicatorOfDamage: number = basicCharacteristics(
    numberAttack,
    playerClassObject,
    playerRaceObject,
    inGameEnemyClass,
    inGameEnemyRace,
    playerNumber,
  );
  const damageNumber: number = Math.floor(inGamePlayer.str * multiplicatorOfDamage);
  inGameEnemy.hp -= damageNumber;
  if (multiplicatorOfDamage > 1) {
    console.log('\x1b[31m ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥 Crushing hit ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥\x1b[0m \n');
  } else if (multiplicatorOfDamage < 1) {
    console.log('̸̳\x1b[36m /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`**  /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** Glancing hit /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** ̸̳/̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`**\x1b[0m \n');
  }
  switch (playerNumber) {
    case 1:
      console.log(`🏹🏹🏹🏹🏹🏹🏹🏹🏹🏹🏹\x1b[32m You attacked and dealt ${damageNumber} damages! \x1b[0m 🏹🏹🏹🏹🏹🏹🏹🏹🏹🏹🏹 \n`);
      break;
    case 2:
      console.log(`🔫 🔫 🔫 🔫 🔫 🔫 🔫 🔫 \x1b[33m Opponent attacked and dealt ${damageNumber} damages! \x1b[0m🔫 🔫 🔫 🔫 🔫 🔫 🔫 🔫 \n`);
      break;
    default:
      break;
  }
}
