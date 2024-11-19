"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = shuffle;
function shuffle(players) {
    var _a;
    for (var i = players.length; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * i);
        _a = [players[j], players[i - 1]], players[i - 1] = _a[0], players[j] = _a[1];
    }
    return players;
}
