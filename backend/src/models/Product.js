const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameLower: { type: String, unique: true, index: true },
  description: String,
  quantity: Number,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });

productSchema.pre('save', function () {
  this.nameLower = this.name.toLowerCase().trim();
});

module.exports = mongoose.model('Product', productSchema);

