import express from 'express';
import logger from './logger';
import pool from './controllers/DatabaseController';

const dotenv = require('dotenv');
const pokemonRoutes = require('./routes/pokemonRoutes');
const typesRoutes = require('./routes/typesRoutes');

dotenv.config();
const app = express();
const port: string | undefined = process.env.PORT;

pool.promise().query('SELECT 1')
  .then(() => logger.info('Connecté à la base de données'))
  .catch((err: any) => logger.error('Erreur de connexion à la base de données', err));

app.use(express.json());
app.use('/pokedex', pokemonRoutes);
app.use('/types', typesRoutes);

app.listen(port, () => {
  logger.info(`Serveur démarré sur le port http://localhost:${port}`);
});
