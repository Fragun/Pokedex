"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = enemyChoice;
var rarety_1 = require("../../interface/rarety");
var shuffle_1 = require("./shuffle");
var fs = require('fs');
function enemyChoice(floorNumber, difficulty) {
    var enemyContent = fs.readFileSync('./ressourcesJson/enemies.json', 'utf-8');
    var jsonObjectEnemy = JSON.parse(enemyContent);
    var bossContent = fs.readFileSync('./ressourcesJson/bosses.json', 'utf-8');
    var jsonObjectBoss = JSON.parse(bossContent);
    var RaceEnemiesContent = fs.readFileSync('./ressourcesJson/races.json', 'utf-8');
    var jsonObjectRace = JSON.parse(RaceEnemiesContent);
    var ClassEnemiesContent = fs.readFileSync('./ressourcesJson/classes.json', 'utf-8');
    var jsonObjectClass = JSON.parse(ClassEnemiesContent);
    // ----------------------------------Boss---------------------------------------------
    if (floorNumber === 10 || floorNumber === 20 || floorNumber === 50 || floorNumber === 100) {
        var bosses = (0, shuffle_1.default)(jsonObjectBoss);
        var sumOfCoefRaretybosses = 0;
        for (var _i = 0, bosses_1 = bosses; _i < bosses_1.length; _i++) {
            var element = bosses_1[_i];
            sumOfCoefRaretybosses += rarety_1.arrayRaretyCoef[element.rarity];
        }
        var randomNumberBosses = void 0;
        var bossRandom = bosses[0];
        var sumBosses = 0;
        for (var _a = 0, bosses_2 = bosses; _a < bosses_2.length; _a++) {
            var boss = bosses_2[_a];
            randomNumberBosses = Math.floor(Math.random() * sumOfCoefRaretybosses) + 1;
            var rarety = boss.rarity;
            var coefRaretyPlayer = rarety_1.arrayRaretyCoef[rarety];
            sumBosses += coefRaretyPlayer;
            var randomByCoefOfRarety = Math.floor(Math.random() * sumBosses);
            if (randomByCoefOfRarety > randomNumberBosses) {
                bossRandom = boss;
                break;
            }
        }
        var raceIdBoss_1 = bossRandom.race;
        var objetRace_1 = jsonObjectRace.find(function (element) { return element.id === raceIdBoss_1; }) || jsonObjectRace[0];
        var classId_1 = bossRandom.class;
        var objetClass_1 = jsonObjectClass.find(function (element) { return element.id === classId_1; }) || jsonObjectClass[0];
        return { enemy: bossRandom, race: objetRace_1, class: objetClass_1 };
    }
    // ----------------------------------Enemy---------------------------------------------
    var enemies = (0, shuffle_1.default)(jsonObjectEnemy);
    var sumOfCoefRarety = 0;
    for (var _b = 0, enemies_1 = enemies; _b < enemies_1.length; _b++) {
        var element = enemies_1[_b];
        sumOfCoefRarety += rarety_1.arrayRaretyCoef[element.rarity];
    }
    var randomNumber;
    var enemyRandom = enemies[0]; // j'utilise une valeur
    // par default pour éviter les erreru de typage
    var sum = 0;
    for (var _c = 0, enemies_2 = enemies; _c < enemies_2.length; _c++) {
        var enemy = enemies_2[_c];
        randomNumber = Math.floor(Math.random() * sumOfCoefRarety) + 1;
        var rarety = enemy.rarity;
        var coefRaretyPlayer = rarety_1.arrayRaretyCoef[rarety];
        sum += coefRaretyPlayer;
        var randomByCoefOfRarety = Math.floor(Math.random() * sum);
        if (randomByCoefOfRarety > randomNumber) {
            enemyRandom = enemy;
            break;
        }
    }
    var raceId = enemyRandom.race;
    var objetRace = jsonObjectRace.find(function (element) { return element.id === raceId; }) || jsonObjectRace[0];
    var classId = enemyRandom.class;
    var objetClass = jsonObjectClass.find(function (element) { return element.id === classId; }) || jsonObjectClass[0];
    var difficult = function () {
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
