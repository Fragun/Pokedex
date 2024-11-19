"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRaceByIds_1 = require("../action/component/getRaceByIds");
var fs = require('fs');
var Display = /** @class */ (function () {
    function Display() {
    }
    Display.displayCharacter = function (character, maxHp) {
        console.log("\u0C8A\u0C8A\u0C8A\u0C8A\u0C8A\u0C8A".concat(character.name, "\u0C8A\u0C8A\u0C8A\u0C8A\u0C8A\u0C8A\u0C8A"));
        var displayHp = function () {
            var arrayHp = [];
            for (var index = 0; index < character.hp; index += 1) {
                arrayHp.push('■');
            }
            var hpLost = maxHp - character.hp;
            for (var j = 0; j < hpLost; j += 1) {
                arrayHp.push('□');
            }
            return arrayHp.join('');
        };
        console.log("\u2661 ".concat(displayHp(), " ").concat(character.hp, " / ").concat(maxHp));
    };
    Display.displayOptionCharacter = function (player, race, classes, playerType, exp, lvl) {
        var raceContent = fs.readFileSync('./ressourcesJson/races.json', 'utf-8');
        var jsonObjectRaces = JSON.parse(raceContent);
        var raceContentClasses = fs.readFileSync('./ressourcesJson/classes.json', 'utf-8');
        var jsonObjectClasses = JSON.parse(raceContentClasses);
        var racesWeakness = (0, getRaceByIds_1.default)(race.strength, jsonObjectRaces);
        var racesStrength = (0, getRaceByIds_1.default)(race.weakness, jsonObjectRaces);
        var classesWeakness = (0, getRaceByIds_1.default)(classes.strengths, jsonObjectClasses);
        var classesStrength = (0, getRaceByIds_1.default)(classes.weaknesses, jsonObjectClasses);
        var titleExpAndLevel = '';
        var titlePlayer = '';
        var titleRace = '';
        var titleClass = '';
        if (playerType === 1) {
            titleExpAndLevel = "xp : ".concat(exp, " level : ").concat(lvl);
            titlePlayer = 'You are';
            titleRace = 'Your race is';
            titleClass = 'Your class is';
        }
        else if (playerType === 2) {
            titleExpAndLevel = '';
            titlePlayer = 'Your opponent is';
            titleRace = 'The opponent\'s race is';
            titleClass = 'The opponent\'s class is';
        }
        console.log("\n===========================================================\n==================".concat(titlePlayer, " ").concat(player.name, "=================== \n=============").concat(titleExpAndLevel, "============================\n===========================================================\n                 Hit point = ").concat(player.hp, "                  \n                 Magic point = ").concat(player.mp, "               \n                 Strength = ").concat(player.str, "                    \n                 Intelligence = ").concat(player.int, "                \n                 Defense = ").concat(player.def, "                     \n                 Resistance = ").concat(player.res, "                  \n                 Speed = ").concat(player.spd, "                      \n                 Luck  = ").concat(player.luck, "                   \n===========================================================\n___________________________________________________________\n-----------------").concat(titleRace, " ").concat(race.name, "-----------------\n\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E   \n                Strength against = ").concat(racesWeakness, "                      \n                Weakness = ").concat(racesStrength, "  \n\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\n___________________________________________________________            \n    ----------- ").concat(titleClass, " ").concat(classes.name, "-------------- \n\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E                                                          \n                Strength = ").concat(classesWeakness, "\n                Weaknesses = ").concat(classesStrength, "                        \n                Attack type = ").concat(classes.attack_type, "\n                Alignment = ").concat(classes.alignment, "      \n  \u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E\u203E  \n  "));
    };
    Display.displayRace = function (jsonObjectRace) {
        for (var _i = 0, jsonObjectRace_1 = jsonObjectRace; _i < jsonObjectRace_1.length; _i++) {
            var race = jsonObjectRace_1[_i];
            var arrayWeakRace = [];
            var arrayStrongRace = [];
            if (race.strength.length > 0) {
                for (var _a = 0, _b = race.strength; _a < _b.length; _a++) {
                    var r = _b[_a];
                    arrayWeakRace.push(jsonObjectRace[r - 1].name);
                }
            }
            if (race.weakness.length > 0) {
                for (var _c = 0, _d = race.weakness; _c < _d.length; _c++) {
                    var a = _d[_c];
                    arrayStrongRace.push(jsonObjectRace[a - 1].name);
                }
            }
            console.log("".concat(race.id, "- ").concat(race.name, "\n        strong against : ").concat(arrayWeakRace, ";\n        weak against : ").concat(arrayStrongRace, ";\n        "));
        }
    };
    Display.displayClasses = function (jsonObjectClass) {
        for (var _i = 0, jsonObjectClass_1 = jsonObjectClass; _i < jsonObjectClass_1.length; _i++) {
            var classes = jsonObjectClass_1[_i];
            var arrayWeakClass = [];
            var arrayStrongClass = [];
            for (var _a = 0, _b = classes.strengths; _a < _b.length; _a++) {
                var r = _b[_a];
                arrayWeakClass.push(jsonObjectClass[r - 1].name);
            }
            for (var _c = 0, _d = classes.weaknesses; _c < _d.length; _c++) {
                var r = _d[_c];
                arrayStrongClass.push(jsonObjectClass[r - 1].name);
            }
            console.log("".concat(classes.id, "- ").concat(classes.name, "\n        strong against : ").concat(arrayWeakClass, ";\n        weak against : ").concat(arrayStrongClass, ";\n        "));
        }
    };
    return Display;
}());
exports.default = Display;
