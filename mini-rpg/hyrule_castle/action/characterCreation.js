"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = characterCreation;
var displayClass_1 = require("../class/displayClass");
var fs = require('fs');
var readline = require('readline-sync');
function characterCreation() {
    var playerContent = fs.readFileSync('./ressourcesJson/players.json', 'utf-8');
    var jsonObject = JSON.parse(playerContent);
    var RacePlayerContent = fs.readFileSync('./ressourcesJson/races.json', 'utf-8');
    var jsonObjectRace = JSON.parse(RacePlayerContent);
    var ClassPlayerContent = fs.readFileSync('./ressourcesJson/classes.json', 'utf-8');
    var jsonObjectClass = JSON.parse(ClassPlayerContent);
    var classCharacterCreation = jsonObjectClass[0];
    var raceCharacterCreation = jsonObjectRace[0];
    var confirm = false;
    var characterCreationInGame = {
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
    var _loop_1 = function () {
        var idCreation = (jsonObject[jsonObject.length - 1].id) + 1;
        var nameCreation = readline.question('Choose name for your personnage : ');
        console.log('================Name====================');
        console.log("Your name is ".concat(nameCreation));
        console.log('====================================');
        console.log('Now you will have to choose a race from the following : ');
        console.log('================Races====================');
        displayClass_1.default.displayRace(jsonObjectRace);
        var raceChoose = readline.questionInt("Choose your race between 1 and ".concat(jsonObjectRace.length, " : "));
        while (raceChoose > 17) {
            raceChoose = readline.questionInt("Please tap your number race (between 1 and ".concat(jsonObjectRace.length, ") : "));
        }
        console.log('====================================');
        console.log('Now you will have to choose a class from the following : ');
        console.log('================Races====================');
        displayClass_1.default.displayClasses(jsonObjectClass);
        var classChoose = readline.keyIn("Choose your class between 1 and ".concat(jsonObjectClass.length, " : "));
        classCharacterCreation = jsonObjectClass[classChoose - 1];
        raceCharacterCreation = jsonObjectRace[raceChoose - 1];
        // displayReadlineTest();
        // ----------------------------------LOGIQUE POINT STATISTIQUE ----------------------------
        var counter = 0;
        console.log('====================================');
        console.log('Choose your game difficulty between :');
        console.log('====================================');
        var playerDifficultySelected = readline.keyIn('1- Beginner (400 statistics points) \n 2- Easy (200 statistics points) \n 3- Normal (150 statistics points) \n 4- Hard (100 statistics points)', { limit: '1234' });
        console.log(playerDifficultySelected);
        if (playerDifficultySelected === '1') {
            counter = 400;
        }
        else if (playerDifficultySelected === '2') {
            counter = 200;
        }
        else if (playerDifficultySelected === '3') {
            counter = 150;
        }
        else if (playerDifficultySelected === '4') {
            counter = 100;
        }
        else {
            console.log('Please Tap a correct value between 1, 2 or 3 !');
        }
        var repartitionPoints = function (count) {
            var totalPointsRemaining = count;
            var maxHp = Math.floor(count * 0.4);
            var maxMp = Math.floor(count * 0.7);
            var maxStr = Math.floor(count * 0.1);
            var maxInt = Math.floor(count * 0.1);
            var maxDef = Math.floor(count * 0.12);
            var maxRes = Math.floor(count * 0.05);
            var maxSpd = Math.floor(count * 0.08);
            var maxLuck = Math.floor(count * 0.2);
            console.log('====================================');
            console.log("Please distribute your ".concat(counter, " points"));
            console.log('====================================');
            var displayStatisticsChoice = function (text, max) {
                var valid = false;
                var statPlayer;
                while (valid === false) {
                    statPlayer = readline.questionInt("Distribute ".concat(text, " (max: ").concat(max, ") points, remaining points: ").concat(totalPointsRemaining, ": "));
                    if (statPlayer > max) {
                        console.error('Please select a valid value');
                    }
                    else if (statPlayer > totalPointsRemaining) {
                        console.error('You have no points left to distribute');
                    }
                    else {
                        totalPointsRemaining -= statPlayer;
                        valid = true;
                    }
                }
                return statPlayer;
            };
            var pointsHp = displayStatisticsChoice('Health Points', maxHp);
            var pointsMp = displayStatisticsChoice('Magic Points', maxMp);
            var pointsStr = displayStatisticsChoice('Strength', maxStr);
            var pointsInt = displayStatisticsChoice('Intelligence', maxInt);
            var pointsDef = displayStatisticsChoice('Defense', maxDef);
            var pointsRes = displayStatisticsChoice('Resistance', maxRes);
            var pointsSpd = displayStatisticsChoice('Speed', maxSpd);
            var pointsLuck = displayStatisticsChoice('Luck', maxLuck);
            return {
                pointsHp: pointsHp,
                pointsMp: pointsMp,
                pointsStr: pointsStr,
                pointsInt: pointsInt,
                pointsDef: pointsDef,
                pointsRes: pointsRes,
                pointsSpd: pointsSpd,
                pointsLuck: pointsLuck,
            };
        };
        var stats = repartitionPoints(counter);
        var pointsHp = stats.pointsHp, pointsMp = stats.pointsMp, pointsStr = stats.pointsStr, pointsInt = stats.pointsInt, pointsDef = stats.pointsDef, pointsRes = stats.pointsRes, pointsSpd = stats.pointsSpd, pointsLuck = stats.pointsLuck;
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
        displayClass_1.default.displayOptionCharacter(characterCreationInGame, jsonObjectRace[characterCreationInGame.race], jsonObjectClass[characterCreationInGame.class], 1, 0, 1);
        confirm = readline.keyInYN('Do you confirm ? ');
    };
    while (confirm === false) {
        _loop_1();
    }
    return {
        player: characterCreationInGame,
        race: raceCharacterCreation,
        class: classCharacterCreation,
    };
}
