const express = require('express');
const PokemonController = require('../controllers/PokemonController');

const router = express.Router();

router.get('/:id', PokemonController.getOnePokemon);
router.get('/', PokemonController.getAllPokemon);
router.get('/moves/:identifier', PokemonController.getMovesByPokemon);
router.get('/eggs/:identifier', PokemonController.getEggsByPokemon);
router.delete('/delete/:id', PokemonController.deletePokemonById);
router.post('/add', PokemonController.add);
router.put('/update/:id', PokemonController.updatePokemonById);

module.exports = router;
