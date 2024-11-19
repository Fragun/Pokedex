"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = levelAndExperience;
function levelAndExperience(expPlayer, levelPlayer, player, hpMax) {
    var expPointsRandom = Math.floor(Math.random() * (50 - 15) + 15);
    expPlayer += expPointsRandom;
    if (expPlayer >= 150) {
        levelPlayer += 1;
        expPlayer = 0;
        var randomHpWin = Math.floor(Math.random() * 30) + 1; // 30 :xp max pouvant être gagné
        player.hp += 20;
        if (player.hp > hpMax) {
            player.hp = hpMax;
        }
        console.log('====================================');
        console.log("You win ".concat(randomHpWin, " hp maximum"));
        console.log('====================================');
    }
    return [expPlayer, levelPlayer, player];
}
