const router = require('express').Router();
const { seedCategories, getCategories } = require('../controllers/categoryController');

router.get('/seed', seedCategories);
router.get('/', getCategories);

module.exports = router;
