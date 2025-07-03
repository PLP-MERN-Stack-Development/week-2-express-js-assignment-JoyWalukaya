function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({
      error: 'Invalid product data. Please check the types of each field.'
    });
  }

  next();
}

module.exports = validateProduct;
