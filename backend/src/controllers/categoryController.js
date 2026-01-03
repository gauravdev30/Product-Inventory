const Category = require('../models/Category');

exports.seedCategories = async (req, res) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  await Category.deleteMany();
  const data = await Category.insertMany(
    categories.map(name => ({ name }))
  );

  res.json(data);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
