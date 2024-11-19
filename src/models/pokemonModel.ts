import pool from '../controllers/DatabaseController';
import PokemonInterface from '../types/PokemonInterface';
import logger from '../logger';

export default class Pokemon implements PokemonInterface {
  id: number;

  identifier: string;

  speciesId: number;

  height: number;

  weight: number;

  baseExperience: number;

  order: number;

  isDefault: number;

  constructor(
    id: number,
    identifier: string,
    speciesId: number,
    height: number,
    weight: number,
    baseExperience: number,
    order: number,
    isDefault: number,
  ) {
    this.id = id;
    this.identifier = identifier;
    this.speciesId = speciesId;
    this.height = height;
    this.weight = weight;
    this.baseExperience = baseExperience;
    this.order = order;
    this.isDefault = isDefault;
  }

  public static async getPokemonFromDb(): Promise<void> {
    const rows = await pool.promise().query('SELECT * FROM pokemon AS p ORDER BY p.identifier', []);
    return rows[0];
  }

  public static async getPokemonById(id: number): Promise<Pokemon | null> {
    try {
      const promise = await pool.promise().query('SELECT * FROM pokemon WHERE id = ?', [id]);
      if (promise[0].length > 0) {
        logger.info(`Request pokemon by id ${id} ok`);
        const promiseRow0 = promise[0][0];
        return new Pokemon(
          promiseRow0.id,
          promiseRow0.identifier,
          promiseRow0.species_id,
          promiseRow0.height,
          promiseRow0.weight,
          promiseRow0.base_experience,
          promiseRow0.order,
          promiseRow0.is_default,
        );
      }
      return null;
    } catch (err) {
      logger.error('Erreur de connexion à la table pokemon', err);
      throw err;
    }
  }

  public static async getPokemonByIdentifier(identifier: string): Promise<Pokemon | null> {
    try {
      const promise = await pool.promise().query('SELECT * FROM pokemon WHERE identifier = ?', [identifier]);

      if (promise[0].length > 0) {
        logger.info(`request pokemon by identifier ${identifier} success`);
        const promiseRow0: Pokemon = promise[0][0];
        return new Pokemon(
          promiseRow0.id,
          promiseRow0.identifier,
          promiseRow0.speciesId,
          promiseRow0.height,
          promiseRow0.weight,
          promiseRow0.baseExperience,
          promiseRow0.order,
          promiseRow0.isDefault,
        );
      }
      return null;
    } catch (err) {
      logger.error('Error connection table pokemon', err);
      throw err;
    }
  }

  public static async addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const request: string = 'INSERT INTO pokemon (id, identifier, species_id, height, weight, base_experience, `order`, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    return pool.promise().query(request, [
      pokemon.id,
      pokemon.identifier,
      pokemon.speciesId,
      pokemon.height,
      pokemon.weight,
      pokemon.baseExperience,
      pokemon.order,
      pokemon.isDefault]);
  }

  async updatePokemon(): Promise<Pokemon> {
    const request = 'UPDATE pokemon SET identifier = ?, species_id = ?, height = ?, weight = ?, base_experience = ?, `order` = ?, is_default = ? WHERE id = ?';

    return pool.promise().query(request, [
      this.identifier,
      this.speciesId,
      this.height,
      this.weight,
      this.baseExperience,
      this.order,
      this.isDefault,
      this.id,
    ]);
  }

  async deletePokemon(): Promise<void> {
    return pool.promise().query('DELETE FROM pokemon WHERE id = ?', [this.id]);
  }

  public static async getPokemonbyMove(identifier: string): Promise<void> {
    const rows = await pool.promise().query('SELECT m.identifier AS "Attaques à apprendre", m.power, m.pp, m.accuracy, t.identifier AS types FROM moves AS m JOIN pokemon_moves AS pm ON m.id = pm.move_id JOIN pokemon AS p ON pm.pokemon_id = p.id JOIN types AS t ON m.type_id = t.id WHERE p.identifier = ?;', [identifier]);
    return rows[0];
  }

  public static async getPokemonbyEggs(identifier: string): Promise<void> {
    const rows = await pool.promise().query('SELECT eg.identifier AS TypeOeuf FROM pokemon AS p JOIN pokemon_egg_groups AS peg ON p.id = peg.species_id JOIN egg_groups AS eg ON peg.egg_group_id = eg.id WHERE p.identifier = ?;', [identifier]);
    return rows[0];
  }
}
