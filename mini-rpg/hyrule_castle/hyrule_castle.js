"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hyruleCastle;
var enemyChoice_1 = require("./action/component/enemyChoice");
var heal_1 = require("./action/heal");
var better_combat_options_1 = require("./action/better_combat_options");
var characterCreation_1 = require("./action/characterCreation");
var displayClass_1 = require("./class/displayClass");
var level_and_experience_1 = require("./action/level_and_experience");
var basic_game_customization_1 = require("./basic_game_customization");
// import playerChoice from './action/component/playerchoice';
var readline = require('readline-sync');
function hyruleCastle() {
    var difficultyChoice = (0, basic_game_customization_1.default)();
    var numberOfFloorMax = (0, basic_game_customization_1.floorChoice)();
    var numberFloorsMax = parseInt(numberOfFloorMax, 10);
    var coins = 12;
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
    var expPlayer = 0;
    var levelPlayer = 1;
    var playerClassAndRaceObject = (0, characterCreation_1.default)();
    // const playerClassAndRaceObject = playerChoice();
    var playerObject = playerClassAndRaceObject.player;
    var playerClassObject = playerClassAndRaceObject.class;
    var playerRaceObject = playerClassAndRaceObject.race;
    var floorsNumber = 1;
    var inGamePlayer = playerObject; // caractéristique de départ du joueur /////////////
    var maxHpPlayer = inGamePlayer.hp;
    var playerAlive = true;
    while (floorsNumber <= numberFloorsMax && playerAlive) {
        var inGameEnemyClassRace = (0, enemyChoice_1.default)(floorsNumber, difficultyChoice);
        var inGameEnemy = inGameEnemyClassRace.enemy;
        var inGameEnemyRace = inGameEnemyClassRace.race;
        var inGameEnemyClass = inGameEnemyClassRace.class;
        var maxHpEnemy = inGameEnemy.hp;
        var numberAttack = 1;
        console.log("\n \u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7  \uD835\uDD09\uD835\uDD29\uD835\uDD2C\uD835\uDD2C\uD835\uDD2F \u2116 ".concat(floorsNumber, " \u02CF\u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7\u02CF\u02CB\u00B0\u2022*\u2040\u27B7\n"));
        console.log("\u001B[31m ---------------------------You encounter ".concat(inGameEnemy.name, "--------------------------- \u001B[0m"));
        displayClass_1.default.displayCharacter(inGamePlayer, maxHpPlayer);
        displayClass_1.default.displayCharacter(inGameEnemy, maxHpEnemy);
        while (inGameEnemy.hp > 0) {
            console.log('\n ˋ°•*⁀➷ˋ°•*⁀➷ˏˏChoose your action between \x1B[3m (type the corresponding number) \x1B[0m :');
            console.log('-----------------------→ 1-Attack\n-----------------------→ 2-Heal\n-----------------------→ 3-Player statistics\n');
            var playerActionSelected = readline.questionInt('ˋ°•*⁀➷ˋ°•*⁀➷Your choice :');
            if (playerActionSelected === 1) { // ----------------------------Attack------------------
                (0, better_combat_options_1.default)(numberAttack, playerClassObject, playerRaceObject, inGameEnemyClass, inGameEnemyRace, inGameEnemy, inGamePlayer, 1);
                if (inGameEnemy.hp <= 0) {
                    console.log("\u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  ".concat(inGameEnemy.name, " died! \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F  \u2620\uFE0F "));
                    var _a = (0, level_and_experience_1.default)(expPlayer, levelPlayer, inGamePlayer, playerObject.hp), exp = _a[0], lvl = _a[1], player = _a[2];
                    inGamePlayer = player;
                    expPlayer = exp;
                    levelPlayer = lvl;
                    numberAttack = 0;
                    floorsNumber += 1;
                    coins += 1;
                    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Experiences and level 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ');
                    console.log("\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80  You have ".concat(expPlayer, " experiences points, your level : ").concat(levelPlayer, " and ").concat(coins, " coins\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80"));
                    break;
                }
                (0, better_combat_options_1.default)(numberAttack, inGameEnemyClass, inGameEnemyRace, playerClassObject, playerRaceObject, inGamePlayer, inGameEnemy, 2);
                numberAttack += 1;
            }
            else if (playerActionSelected === 2) { // ----------------------------HEAL------------------
                inGamePlayer = (0, heal_1.default)(inGamePlayer, numberAttack, maxHpPlayer);
                console.log('❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️ You healed yourself ! ❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️❤️‍🩹❤️');
                (0, better_combat_options_1.default)(numberAttack, inGameEnemyClass, inGameEnemyRace, playerClassObject, playerRaceObject, inGamePlayer, inGameEnemy, 2);
                numberAttack += 1;
                console.log("But ".concat(inGameEnemy.name, " attacked and dealt ").concat(inGameEnemy.str, " damages!"));
            }
            else if (playerActionSelected === 3) { // ------------------ option Character---------------
                console.log('--option statistics player and ennemy');
                displayClass_1.default.displayOptionCharacter(inGamePlayer, playerRaceObject, playerClassObject, 1, expPlayer, levelPlayer);
                displayClass_1.default.displayOptionCharacter(inGameEnemy, inGameEnemyRace, inGameEnemyClass, 2, expPlayer, levelPlayer);
            }
            else {
                console.error('Please select a valid action');
            }
            displayClass_1.default.displayCharacter(inGamePlayer, maxHpPlayer);
            displayClass_1.default.displayCharacter(inGameEnemy, maxHpEnemy);
            if (inGamePlayer.hp <= 0) {
                playerAlive = false;
                break;
            }
        }
    }
    if (floorsNumber > 10) {
        console.log('🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆 You win ! 🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆');
    }
    else {
        console.log('💀💀💀💀💀💀💀💀💀💀💀💀💀 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀Game over ! 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
    }
}
hyruleCastle();
