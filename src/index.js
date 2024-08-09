const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Ensure ObjectId validation
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

require('./db/config.js');
const User = require('./db/User.js');
const Product = require('./db/Product.js');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your client origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to verify token
function verifyToken(req, resp, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        console.error('Token verification failed:', err); // Log the error
        return resp.status(401).send({ result: 'Please provide a valid token' });
      }
      next();
    });
  } else {
    return resp.status(403).send({ result: 'Please add token with header' });
  }
}

// Register route
app.post('/register', async (req, resp) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        console.error('Error signing token:', err); // Log the error
        return resp.send({ result: 'Something went wrong' });
      }
      resp.send({ user, auth: token });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    resp.status(500).send({ result: 'Internal Server Error' });
  }
});

// Login route
// Login route
app.post('/login', async (req, resp) => {
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select('-password');
      if (user) {
        Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
          if (err) {
            console.error('Error signing token:', err); // Log the error
            return resp.send({ result: 'Something went wrong' });
          }
          resp.send({ user, auth: token });
        });
      } else {
        resp.send({ result: 'No User Found' });
      }
    } else {
      resp.send({ result: 'Invalid credentials provided' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    resp.status(500).send({ result: 'Internal Server Error' });
  }
});


// Add product route
app.post('/add-product', verifyToken, async (req, resp) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
  } catch (error) {
    console.error('Error adding product:', error);
    resp.status(500).send({ result: 'Internal Server Error' });
  }
});

// Get all products route
app.get('/products', verifyToken, async (req, resp) => {
  try {
    let products = await Product.find();
    if (products.length > 0) {
      resp.json(products);
    } else {
      resp.json({ result: 'No products found' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    resp.status(500).send({ result: 'Internal Server Error' });
  }
});

// Delete product route
app.delete('/products/:id', verifyToken, async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).send({ error: 'Invalid product ID format' });
  }

  try {
    const result = await Product.deleteOne({ _id: id });
    resp.send(result);
  } catch (error) {
    console.error('Error deleting product:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});

// Get product by ID route
app.get('/products/:id', verifyToken, async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).send({ error: 'Invalid product ID format' });
  }

  try {
    let result = await Product.findOne({ _id: id });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: 'No Records Found.' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});

// Update product route
app.put('/product/:id', verifyToken, async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).send({ error: 'Invalid product ID format' });
  }

  try {
    let result = await Product.updateOne(
      { _id: id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (error) {
    console.error('Error updating product:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});

// Search products route
app.get('/search/:key', verifyToken, async (req, resp) => {
  try {
    let result = await Product.find({
      "$or": [
        { name: { $regex: req.params.key, $options: 'i' } },
        { company: { $regex: req.params.key, $options: 'i' } },
        { category: { $regex: req.params.key, $options: 'i' } },
      ]
    });
    resp.send(result);
  } catch (error) {
    console.error('Error searching products:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
