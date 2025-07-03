// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
//importing middlewares
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const validateProduct = require('./middleware/validator');
//importing errors
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(logger);
app.use('/api/products', auth);
// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Example route implementation for GET /api/products
app.get('/api/products', logger, auth, (req, res) => {
  const { category, page = 1, limit = 10, search } = req.query;

  let filteredProducts = products;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    total: filteredProducts.length,
    page: Number(page),
    limit: Number(limit),
    results: paginatedProducts
  });
});

// GET /api/products/stats - Get product statistics
app.get('/api/products/stats', auth, (req, res) => {
  const stats = {};

  products.forEach(product => {
    if (!stats[product.category]) {
      stats[product.category] = 1;
    } else {
      stats[product.category]++;
    }
  });

  res.json({
    totalProducts: products.length,
    countByCategory: stats
  });
});

app.get('/api/products/:id', logger, auth, (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
  throw new NotFoundError('Product not found.');
}

  res.json(product);
});
// POST /api/products - Create a new product
app.post('/api/products',  logger, auth, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  // Basic validation
  if (!name || !description || price === undefined || !category || inStock === undefined) {
  throw new ValidationError('All product fields are required.');
}


  const newProduct = {
    id: uuidv4(), // Generate unique ID
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});
// PUT /api/products/:id - Update an existing product
app.put('/api/products/:id', logger, auth, validateProduct, (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, inStock } = req.body;

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
  throw new NotFoundError('Product not found.');
  }

  // Validate input
  if (!name || !description || price === undefined || !category || inStock === undefined) {
  throw new ValidationError('All product fields are required.');
  }

  // Update product
  products[productIndex] = {
    id,
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[productIndex]);
});
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', logger, auth, (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
  throw new NotFoundError('Product not found.');
  }

  // Remove product from array
  const deletedProduct = products.splice(productIndex, 1)[0];

  res.json({ message: 'Product deleted successfully.', product: deletedProduct });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//errors
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler); // This should be the last middleware

// Export the app for testing purposes
module.exports = app; 