"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const pokemonRoutes_1 = __importDefault(require("./routes/pokemonRoutes"));
const typesRoutes_1 = __importDefault(require("./routes/typesRoutes"));
const DatabaseController_1 = __importDefault(require("./controllers/DatabaseController"));
const dotenv = require('dotenv');
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
DatabaseController_1.default.promise().query('SELECT 1')
    .then(() => logger_1.default.info('Connecté à la base de données'))
    .catch((err) => logger_1.default.error('Erreur de connexion à la base de données', err));
app.use(express_1.default.json());
app.use('/pokedex', pokemonRoutes_1.default);
app.use('/types', typesRoutes_1.default);
app.listen(port, () => {
    logger_1.default.info(`Serveur démarré sur le port http://localhost:${port}`);
});
