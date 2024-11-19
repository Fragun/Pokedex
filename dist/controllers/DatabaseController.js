"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createPool } = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const passwordDb = process.env.DB_PASSWORD;
const userDb = process.env.DB_USER;
const hostDb = process.env.DB_HOST;
const pool = createPool({
    user: userDb,
    password: passwordDb,
    host: hostDb,
    port: 3306,
    database: 'pokedex_soutenance',
    waitForConnections: true,
});
exports.default = pool;
