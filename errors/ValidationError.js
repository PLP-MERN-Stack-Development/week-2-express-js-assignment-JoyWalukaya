// errors/ValidationError.js

class ValidationError extends Error {
  constructor(message = 'Invalid input') {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

module.exports = ValidationError;
