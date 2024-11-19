"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heal;
function heal(player, attackNumber, maxHp) {
    console.log("======== ROUND ".concat(attackNumber, "  ========"));
    player.hp += maxHp * 0.5;
    if (player.hp > maxHp) {
        player.hp = maxHp;
    }
    return player;
}
