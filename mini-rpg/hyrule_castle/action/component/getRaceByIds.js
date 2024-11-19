"use strict";
// import { Races } from '../../interface/races';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getArrayRaceNameByIds;
function getArrayRaceNameByIds(ids, races) {
    var racesArray = [];
    var raceNameArray = [];
    var _loop_1 = function (id) {
        racesArray.push(races.find(function (element) { return element.id === id; }));
    };
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        _loop_1(id);
    }
    for (var _a = 0, racesArray_1 = racesArray; _a < racesArray_1.length; _a++) {
        var names = racesArray_1[_a];
        raceNameArray.push(names.name);
    }
    return raceNameArray;
}
