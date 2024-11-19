import { Players } from '../interface/players';

export default function heal(player: Players, attackNumber: number, maxHp: number) {
  console.log(`======== ROUND ${attackNumber}  ========`);
  player.hp += maxHp * 0.5;
  if (player.hp > maxHp) {
    player.hp = maxHp;
  }
  return player;
}
