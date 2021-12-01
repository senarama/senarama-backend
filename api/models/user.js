const { Schema, model } = require('mongoose');

const userSchema = Schema({
  active: {
    required: true,
    type: Boolean,
  },
  description: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  idType: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  movie: {
    default: null,
    type: String,
  },
  role: {
    default: 'senarauta',
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  picture: {
    default: null,
    type: String,
  },
  profile: {
    default: null,
    type: String,
  },
  senaCode: {
    default: null,
    type: Number,
  },
  social: {
    default: [],
    type: Array,
  },
  state: {
    default: false,
    type: Boolean,
  },
  userType: {
    default: 'normal',
    type: String,
  },
  userID: {
    required: true,
    type: String,
    unique: true,
  },
  userName: {
    required: true,
    type: String,
  },
});

const User = model('User', userSchema);
module.exports = User;
