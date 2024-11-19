import { Request, Response } from 'express';
import logger from '../logger';
import Pokemon from '../models/pokemonModel';
import PokemonInterface from '../types/PokemonInterface';

export const getAllPokemon = async (req: Request, res: Response) => {
  try {
    const pokemon = await Pokemon.getPokemonFromDb();
    return res.json(pokemon);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

export const getOnePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNumber: number = parseInt(id, 10);
    const pokemon: PokemonInterface | null = await Pokemon.getPokemonById(idNumber);
    if (pokemon === null) {
      logger.error('Pokemon not found');
      return res.status(412).send(`Pokemon not found with id n°${id}`);
    }
    return res.json(pokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

export const getMovesByPokemon = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    const moves = await Pokemon.getPokemonbyMove(identifier);
    if (moves === null) {
      logger.error('Pokemon not found');
      return res.status(412).send(`Pokemon not found with id n°${identifier}`);
    }
    return res.json(moves);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

export const getEggsByPokemon = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    const moves = await Pokemon.getPokemonbyEggs(identifier);
    if (moves === null) {
      logger.error('Pokemon not found');
      return res.status(412).send(`Pokemon not found with id n°${identifier}`);
    }
    return res.json(moves);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

export const add = async (req: Request, res: Response) => {
  const {
    id, identifier, specieId, height, weight, baseExperience, order, isDefault,
  } = req.body;
  try {
    const pokemonExisting: Pokemon | null = await Pokemon.getPokemonById(id);
    const pokemonIdentifierExisting: Pokemon | null = await Pokemon.getPokemonByIdentifier(
      identifier,
    );

    console.log('====================================');
    console.log(pokemonIdentifierExisting);
    console.log('====================================');
    if (pokemonExisting) {
      logger.error(`conflit with databse, id n°${id} already exists`);
      return res.status(409).json({
        message: `Pokemon with id n°${id} already exists`,
      });
    }
    if (pokemonIdentifierExisting) {
      logger.error(`conflit with databse, identifier ${identifier} already exists`);
      return res.status(409).json({
        message: `Pokemon with identifier ${identifier} already exists`,
      });
    }

    const newPokemon: Pokemon = new Pokemon(
      id,
      identifier,
      specieId,
      height,
      weight,
      baseExperience,
      order,
      isDefault,
    );
    await Pokemon.addPokemon(
      newPokemon,
    );
    return res.status(201).json({
      message: 'pokemon created',
    });
  } catch (err) {
    logger.error('Erreur lors de l\'ajout du Pokémon', { error: err });
    return res.status(500).send('Server error');
  }
};

export const updatePokemonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber: number = parseInt(id, 10);
  const {
    identifier, specieId, height, weight, baseExperience, order, isDefault,
  } = req.body;
  try {
    const pokemonExisting: Pokemon | null = await Pokemon.getPokemonById(idNumber);
    if (!pokemonExisting) {
      logger.error(`id n°${id} doesn't existed`);
      return res.status(409).json({
        message: `Pokemon with id n°${id} doesn't exists`,
      });
    }
    pokemonExisting.identifier = identifier;
    pokemonExisting.speciesId = specieId;
    pokemonExisting.height = height;
    pokemonExisting.weight = weight;
    pokemonExisting.baseExperience = baseExperience;
    pokemonExisting.order = order;
    pokemonExisting.isDefault = isDefault;
    console.log('==========pokemonExisting======pokemonExisting==========pokemonExisting==========');
    console.log(pokemonExisting);
    console.log('====================================');

    await pokemonExisting.updatePokemon();
    logger.info(`Pokemon with id n°${id} updated`);
    return res.status(201).json({
      message: `Pokemon with id n°${id} updated`,
    });
  } catch (err) {
    logger.error('Erreur lors de la mide à jour du Pokémon', { error: err });
    return res.status(500).send('Server error');
  }
};

export const deletePokemonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber: number = parseInt(id, 10);
  try {
    const pokemonExisting: Pokemon | null = await Pokemon.getPokemonById(idNumber);
    if (!pokemonExisting) {
      return res.status(404).json({
        message: `Pokemon with id ${id} does not exist`,
      });
    }
    await pokemonExisting.deletePokemon();
    logger.info(`Pokemon with id ${id} deleted`);
    return res.status(202).json({
      message: `Pokemon with id ${id} deleted`,
    });
  } catch (err) {
    logger.error(`Error when deleting pokemon with id : ${id}`, err);
    return res.status(500).send(`Error when deleting pokemon with id : ${id}`);
  }
};
