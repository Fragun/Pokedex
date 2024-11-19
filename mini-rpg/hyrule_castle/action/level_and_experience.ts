import { Players } from '../interface/players';

export default function levelAndExperience(
  expPlayer: number,
  levelPlayer:number,
  player: Players,
  hpMax: number,
): [number, number, Players] { // ////////////// debug en ajoutant le type de retour ici////////////
  const expPointsRandom: number = Math.floor(Math.random() * (50 - 15) + 15);
  expPlayer += expPointsRandom;
  if (expPlayer >= 150) {
    levelPlayer += 1;
    expPlayer = 0;
    const randomHpWin: number = Math.floor(Math.random() * 30) + 1; // 30 :xp max pouvant être gagné
    player.hp += 20;
    if (player.hp > hpMax) {
      player.hp = hpMax;
    }
    console.log('====================================');
    console.log(`You win ${randomHpWin} hp maximum`);
    console.log('====================================');
  }

  return [expPlayer, levelPlayer, player];
}
