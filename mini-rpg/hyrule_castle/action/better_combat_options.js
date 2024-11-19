"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculAndDisplayAttack;
function basicCharacteristics(attackNumber, classPlayer, racePlayer, classEnemy, raceEnemy, playerNumber) {
    if (playerNumber === 1) {
        console.log("\n\u2584\uFE3B\u253B\u2533\u2550\u4E00 \u2584\uFE3B\u253B\u2533\u2550\u4E00 \u2584\uFE3B\u253B\u2533\u2550\u4E00 \u2584\uFE3B\u253B\u2533\u2550\u4E00 \u2584\uFE3B\u253B\u2533\u2550\u4E00 ROUND ".concat(attackNumber, " - - - - - - \u2501\u2564\u30C7\u2566\uFE3B(\u2580\u033F\u033F\u0139\u032F\u033F\u033F\u2580\u033F \u033F)\n"));
    }
    var multiplicatorOfDamage = 1;
    if (racePlayer.strength.includes(raceEnemy.id)
        && classPlayer.strengths.includes(classEnemy.id)) {
        multiplicatorOfDamage *= 4;
    }
    else if (racePlayer.strength.includes(raceEnemy.id)
        || classPlayer.strengths.includes(classEnemy.id)) {
        multiplicatorOfDamage *= 2;
    }
    if (racePlayer.weakness.includes(raceEnemy.id)
        && classPlayer.weaknesses.includes(classEnemy.id)) {
        multiplicatorOfDamage *= 0.25;
    }
    else if (racePlayer.weakness.includes(raceEnemy.id)
        || classPlayer.weaknesses.includes(classEnemy.id)) {
        multiplicatorOfDamage *= 0.5;
    }
    return multiplicatorOfDamage;
}
function calculAndDisplayAttack(numberAttack, playerClassObject, playerRaceObject, inGameEnemyClass, inGameEnemyRace, inGameEnemy, inGamePlayer, playerNumber) {
    var multiplicatorOfDamage = basicCharacteristics(numberAttack, playerClassObject, playerRaceObject, inGameEnemyClass, inGameEnemyRace, playerNumber);
    var damageNumber = Math.floor(inGamePlayer.str * multiplicatorOfDamage);
    inGameEnemy.hp -= damageNumber;
    if (multiplicatorOfDamage > 1) {
        console.log('\x1b[31m ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥 Crushing hit ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥 ︻╦╤─ ҉ – –💥\x1b[0m \n');
    }
    else if (multiplicatorOfDamage < 1) {
        console.log('̸̳\x1b[36m /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`**  /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** Glancing hit /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** ̸̳/̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`** /̸͆̿͞ ̎̎̕ ͆̿͞။​͆̚ ̿`**\x1b[0m \n');
    }
    switch (playerNumber) {
        case 1:
            console.log("\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\u001B[32m You attacked and dealt ".concat(damageNumber, " damages! \u001B[0m \uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9\uD83C\uDFF9 \n"));
            break;
        case 2:
            console.log("\uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \u001B[33m Opponent attacked and dealt ".concat(damageNumber, " damages! \u001B[0m\uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \uD83D\uDD2B \n"));
            break;
        default:
            break;
    }
}
