import { Request, Response } from 'express';
import logger from '../logger';
import Types from '../models/typesModel';

// export default class TypesController {}
export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await Types.getAllTypes();
    res.json(types);
  } catch (err) {
    logger.error('Erreur lors de la récupération des types de pokémon', { error: err });
    res.status(500).send('Server error');
  }
};

export const getTypesByIdentifier = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    if (!Number.isNaN(Number(identifier))) {
      console.log('Identifier is a numeric value');
      const numericId = Number(identifier);
      const types = await Types.getTypesId(numericId);
      return res.json(types);
    }
    const types2 = await Types.getTypesIdentifier(identifier);
    return res.json(types2);
  } catch (err) {
    logger.error('Erreur lors de la récupération du type', { error: err });
    return res.status(500).send('Server error');
  }
};

export const getPokemonIdentifierByType = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    console.log('====================================');
    console.log(identifier);
    console.log('====================================');
    const pokemon = await Types.getPokemonIdentifierType(identifier);
    if (pokemon === null) {
      logger.error('Pokemon not found');
      return res.status(412).send(`Pokemon not found with identifier n°${identifier}`);
    }
    console.log('==========pokemon======pokemon=============pokemon=======');
    console.log(pokemon);
    console.log('====================================');
    return res.json(pokemon);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

export const addTypes = async (req: Request, res: Response) => {
  const { identifier, generationId, damageClassId } = req.body;
  try {
    const newType = {
      identifier,
      generation_id: generationId,
      damage_class_id: damageClassId,
    };
    const addType = await Types.addType(newType);
    return res.status(201).json({
      message: 'type created',
      type: addType,
    });
  } catch (err) {
    logger.error('Erreur lors de l\'ajout du Type', { error: err });
    return res.status(500).send('Server error');
  }
};

// export const deleteTypeById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const typeExisting: Types | null = await Types.getTypesIdentifier(id);
//     console.log('====================================');
//     console.log(typeExisting);
//     console.log('====================================');
//     if (!typeExisting) {
//       return res.status(404).json({
//         message: `Type with id ${id} does not exist`,
//       });
//     }
//     await typeExisting.deleteTypes();
//     logger.info(`Type with id ${id} deleted`);
//     return res.status(202).json({
//       message: `Type with id ${id} deleted`,
//     });
//   } catch (err) {
//     logger.error(`Error when deleting type with id : ${id}`, err);
//     return res.status(500).send(`Error when deleting type with id : ${id}`);
//   }
// };

export default getTypes;
