const router = require('express').Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require('../controllers/productController');

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;
