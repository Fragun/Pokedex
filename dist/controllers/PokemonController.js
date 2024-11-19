"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePokemonById = exports.updatePokemonById = exports.add = exports.getOnePokemon = exports.getAllPokemon = void 0;
const logger_1 = __importDefault(require("../logger"));
const pokemonModel_1 = __importDefault(require("../models/pokemonModel"));
const getAllPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemon = yield pokemonModel_1.default.getPokemonFromDb();
        return res.json(pokemon);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});
exports.getAllPokemon = getAllPokemon;
const getOnePokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id, 10);
        const pokemon = yield pokemonModel_1.default.getPokemonById(idNumber);
        if (pokemon === null) {
            logger_1.default.error('Pokemon not found');
            return res.status(412).send(`Pokemon not found with id n°${id}`);
        }
        return res.json(pokemon);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});
exports.getOnePokemon = getOnePokemon;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, identifier, specieId, height, weight, baseExperience, order, isDefault, } = req.body;
    try {
        const pokemonExisting = yield pokemonModel_1.default.getPokemonById(id);
        const pokemonIdentifierExisting = yield pokemonModel_1.default.getPokemonByIdentifier(identifier);
        console.log('====================================');
        console.log(pokemonIdentifierExisting);
        console.log('====================================');
        if (pokemonExisting) {
            logger_1.default.error(`conflit with databse, id n°${id} already exists`);
            return res.status(409).json({
                message: `Pokemon with id n°${id} already exists`,
            });
        }
        if (pokemonIdentifierExisting) {
            logger_1.default.error(`conflit with databse, identifier ${identifier} already exists`);
            return res.status(409).json({
                message: `Pokemon with identifier ${identifier} already exists`,
            });
        }
        const newPokemon = new pokemonModel_1.default(id, identifier, specieId, height, weight, baseExperience, order, isDefault);
        yield pokemonModel_1.default.addPokemon(newPokemon);
        return res.status(201).json({
            message: 'pokemon created',
        });
    }
    catch (err) {
        logger_1.default.error('Erreur lors de l\'ajout du Pokémon', { error: err });
        return res.status(500).send('Server error');
    }
});
exports.add = add;
const updatePokemonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    const { identifier, specieId, height, weight, baseExperience, order, isDefault, } = req.body;
    try {
        const pokemonExisting = yield pokemonModel_1.default.getPokemonById(idNumber);
        if (!pokemonExisting) {
            logger_1.default.error(`id n°${id} doesn't existed`);
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
        yield pokemonExisting.updatePokemon();
        logger_1.default.info(`Pokemon with id n°${id} updated`);
        return res.status(201).json({
            message: `Pokemon with id n°${id} updated`,
        });
    }
    catch (err) {
        logger_1.default.error('Erreur lors de la mide à jour du Pokémon', { error: err });
        return res.status(500).send('Server error');
    }
});
exports.updatePokemonById = updatePokemonById;
const deletePokemonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    try {
        const pokemonExisting = yield pokemonModel_1.default.getPokemonById(idNumber);
        if (!pokemonExisting) {
            return res.status(404).json({
                message: `Pokemon with id ${id} does not exist`,
            });
        }
        yield pokemonModel_1.default.deletePokemon(id);
        logger_1.default.info(`Pokemon with id ${id} deleted`);
        return res.status(202).json({
            message: `Pokemon with id ${id} deleted`,
        });
    }
    catch (err) {
        logger_1.default.error(`Error when deleting pokemon with id : ${id}`, err);
        return res.status(500).send(`Error when deleting pokemon with id : ${id}`);
    }
});
exports.deletePokemonById = deletePokemonById;
