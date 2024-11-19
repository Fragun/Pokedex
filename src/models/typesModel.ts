import pool from '../controllers/DatabaseController';
import logger from '../logger';
import TypesInterface from '../types/TypesInterface';

export default class Types implements TypesInterface {
  id!: number;

  identifier!: string;

  generation_id!: number;

  damage_class_id!: number;

  constructor(
    id: number,
    identifier: string,
    generation_id: number,
    damage_class_id: number,
  ) {
    this.id = id;
    this.identifier = identifier;
    this.generation_id = generation_id;
    this.damage_class_id = damage_class_id;
  }

  public static async getPokemonIdentifierType(identifier: string): Promise<object | null> {
    const rows = await pool.promise().query('SELECT p.identifier AS Name, t.identifier AS Type FROM pokemon AS p JOIN pokemon_types AS pt ON p.id = pt.pokemon_id JOIN types AS t ON pt.type_id = t.id WHERE p.identifier = ?', [identifier]);
    logger.info(rows[0]);
    if (rows[0].length > 0) {
      logger.info(`Request pokemon by identifier ${identifier} ok`);
      const promiseRow0 = rows[0][0];
      console.log('====================================');
      console.log(promiseRow0);
      console.log('====================================');
      return promiseRow0;
    }
    return null;
  }

  public static async getAllTypes() {
    const rows0 = await pool.promise().query('SELECT identifier FROM types', []);
    return rows0[0];
  }

  public static async getTypesIdentifier(identifier: string) {
    const rows0 = await pool.promise().query('SELECT * FROM types AS t WHERE t.identifier = ?', [identifier]);
    return rows0[0];
  }

  public static async getTypesId(id: number) {
    const rows0 = await pool.promise().query('SELECT * FROM types AS t WHERE t.id = ?', [id]);
    return rows0[0];
  }

  public static async addType(type: {
    identifier: string;
    generation_id: number;
    damage_class_id: number; }): Promise<Types> {
    const request: string = 'INSERT INTO types (identifier, generation_Id, damage_class_id) VALUES (?, ?, ?)';

    return pool.promise().query(request, [
      type.identifier,
      type.generation_id,
      type.damage_class_id,
    ]);
  }

  // async updateTYPE(): Promise<Types> {
  //   const request = 'UPDATE types SET identifier = ?, species_id = ?  WHERE id = ?';

  //   return pool.promise().query(request, [
  //     this.identifier,
  //     this.speciesId,
  //     this.height,
  //     this.weight,
  //     this.baseExperience,
  //     this.order,
  //     this.isDefault,
  //     this.id,
  //   ]);
  // }

  // async deleteTypes(): Promise<void> {
  //   return pool.promise().query('DELETE FROM types WHERE id = ?', [this.id]);
  // }
}
