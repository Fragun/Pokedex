import { Players } from '../../interface/players';

export default function shuffle(players: Players[]) {
  for (let i = players.length; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [players[i - 1], players[j]] = [players[j], players[i - 1]];
  }
  return players;
}
