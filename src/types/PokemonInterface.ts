export default interface PokemonInterface {
  updatePokemon(): unknown;
  id: number;
  identifier: string;
  speciesId: number;
  height: number;
  weight: number;
  baseExperience: number;
  order: number;
  isDefault: number;
}
