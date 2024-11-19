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
class Types {
    constructor(id, identifier, generation_id, damage_class_id) {
        this.id = id;
        this.identifier = identifier;
        this.generation_id = generation_id;
        this.damage_class_id = damage_class_id;
    }
    static getAllTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows0 = yield DatabaseController_1.default.promise().query('SELECT identifier FROM types', []);
            return rows0[0];
        });
    }
}
exports.default = Types;
