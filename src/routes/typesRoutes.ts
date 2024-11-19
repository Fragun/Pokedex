const express2 = require('express');
const TypesController = require('../controllers/TypesController');

const router2 = express2.Router();

router2.get('/pokemon/:identifier', TypesController.getPokemonIdentifierByType);
router2.post('/add', TypesController.addTypes);
router2.get('/', TypesController.default);
router2.get('/:identifier', TypesController.getTypesByIdentifier);
// router2.delete('/delete/:id', TypesController.deleteTypesById);
// router.put('/update/:id', TypesController.updateTypesById);
module.exports = router2;
