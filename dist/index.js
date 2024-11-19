"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-import-module-exports
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
const { Pool } = require('mysql2');
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const pool = new Pool({
    user: 'dethoo_d',
    password: 'dede',
    host: 'localhost',
    port: 5432,
    database: 'pokedex_soutenance',
});
module.exports = {
    query: (text, params) => pool.query(text, params),
};
app.get('/', (req, res) => {
    res.send('Bienvenue dans ma première API, cool');
});
app.get('/', (req, res) => {
    res.send('Bienvenue dans ma première API, cool');
});
app.listen(port, () => {
    console.log(`Serveur démarré sur le port http://localhost:${port}`);
});
