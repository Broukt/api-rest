const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error('JWT_SECRET environment variable is not defined');
  process.exit(1);
}

const payload = {
    id: 1
};

const options = {
  expiresIn: '60d'
};

const token = jwt.sign(payload, secret, options);
console.log('Generated JWT:', token);

module.exports = token;