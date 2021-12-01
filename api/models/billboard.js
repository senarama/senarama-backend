const { Schema, model } = require('mongoose');

const billboardSchema = Schema({
  show: Array,
  dance: Array,
  audiovisual: Array,
});

const Billboard = model('Billboard', billboardSchema, 'billboard');
module.exports = Billboard;
