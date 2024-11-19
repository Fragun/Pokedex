export interface Spells {
  id:       number;
  name:     string;
  cost:     number | string;
  dmg:      number | string;
  effect:   string;
  cooldown: number | string;
  race:     string;
  class:    string;
  rarity:   number;
}
