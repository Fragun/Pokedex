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
const logger_1 = __importDefault(require("../logger"));
const typesModel_1 = __importDefault(require("../models/typesModel"));
const getTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const types = yield typesModel_1.default.getAllTypes();
        res.json(types);
    }
    catch (err) {
        logger_1.default.error('Erreur lors de la récupération des types de pokémon', { error: err });
        res.status(500).send('Server error');
    }
});
exports.default = getTypes;
