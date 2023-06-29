const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

userSchema.methods.validatePassword = function(password){
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex') == this.password


}


const User = mongoose.model('User', userSchema);

module.exports = User;