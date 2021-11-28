const { Schema, model } = require('mongoose');

const billboardSchema = Schema({
  music: Array,
  dance: Array,
  audiovisual: Array,
});

module.exports = model('Billboard', billboardSchema, 'billboard');
