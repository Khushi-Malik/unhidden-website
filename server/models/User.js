const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
  if (this.password.length < 8) {
    next(new Error('Password must be at least 8 characters'));
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);