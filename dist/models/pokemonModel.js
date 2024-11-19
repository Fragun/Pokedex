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
const DatabaseController_1 = __importDefault(require("../controllers/DatabaseController"));
const logger_1 = __importDefault(require("../logger"));
class Pokemon {
    constructor(id, identifier, speciesId, height, weight, baseExperience, order, isDefault) {
        this.id = id;
        this.identifier = identifier;
        this.speciesId = speciesId;
        this.height = height;
        this.weight = weight;
        this.baseExperience = baseExperience;
        this.order = order;
        this.isDefault = isDefault;
    }
    static getPokemonFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield DatabaseController_1.default.promise().query('SELECT * FROM pokemon', []);
            return rows[0];
        });
    }
    static getPokemonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promise = yield DatabaseController_1.default.promise().query('SELECT * FROM pokemon WHERE id = ?', [id]);
                // console.log('====================================');
                // console.log(promise[0].length);
                // console.log('====================================');
                if (promise[0].length > 0) {
                    logger_1.default.info('request pokemon by id', id, 'success');
                    const promiseRow0 = promise[0][0];
                    // console.log('================promiseRow0====================');
                    // console.log(promiseRow0);
                    // console.log('====================================');
                    return new Pokemon(promiseRow0.id, promiseRow0.identifier, promiseRow0.species_id, promiseRow0.height, promiseRow0.weight, promiseRow0.base_experience, promiseRow0.order, promiseRow0.is_default);
                }
                return null;
            }
            catch (err) {
                logger_1.default.error('Erreur de connexion à la table pokemon', err);
                throw err;
            }
        });
    }
    static getPokemonByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('====================================');
                console.log(identifier);
                console.log('====================================');
                const promise = yield DatabaseController_1.default.promise().query('SELECT * FROM pokemon WHERE identifier = ?', [identifier]);
                console.log('====================promise[0]================');
                console.log(promise[0]);
                console.log('====================================');
                if (promise[0].length > 0) {
                    logger_1.default.info(`request pokemon by identifier ${identifier} success`);
                    const promiseRow0 = promise[0][0];
                    return new Pokemon(promiseRow0.id, promiseRow0.identifier, promiseRow0.speciesId, promiseRow0.height, promiseRow0.weight, promiseRow0.baseExperience, promiseRow0.order, promiseRow0.isDefault);
                }
                return null;
            }
            catch (err) {
                logger_1.default.error('Error connection table pokemon', err);
                throw err;
            }
        });
    }
    static addPokemon(pokemon) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = 'INSERT INTO pokemon (id, identifier, species_id, height, weight, base_experience, `order`, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            return DatabaseController_1.default.promise().query(request, [
                pokemon.id,
                pokemon.identifier,
                pokemon.speciesId,
                pokemon.height,
                pokemon.weight,
                pokemon.baseExperience,
                pokemon.order,
                pokemon.isDefault
            ]);
        });
    }
    updatePokemon() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = 'UPDATE pokemon SET identifier = ?, species_id = ?, height = ?, weight = ?, base_experience = ?, `order` = ?, is_default = ? WHERE id = ?';
            return DatabaseController_1.default.promise().query(request, [
                this.identifier,
                this.speciesId,
                this.height,
                this.weight,
                this.baseExperience,
                this.order,
                this.isDefault,
                this.id,
            ]);
        });
    }
    static deletePokemon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return DatabaseController_1.default.promise().query('DELETE FROM pokemon WHERE id = ?', [id]);
        });
    }
}
exports.default = Pokemon;
