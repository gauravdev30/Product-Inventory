const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Product name must be unique' });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 5, search = '', categories } = req.query;

  let filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (categories) filter.categories = { $in: categories.split(',') };

  const products = await Product.find(filter)
    .populate('categories')
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);
  res.json({ products, total });
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};


exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, categories } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (name && name.toLowerCase().trim() !== product.nameLower) {
      const existing = await Product.findOne({
        nameLower: name.toLowerCase().trim(),
        _id: { $ne: id }
      });

      if (existing) {
        return res.status(400).json({ message: 'Product name must be unique' });
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.categories = categories || product.categories;

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};