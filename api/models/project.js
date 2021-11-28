const { Schema, model } = require('mongoose');

const projectSchema = Schema({
  active: {
    default: false,
    type: Boolean,
  },
  collaborators: {
    default: [],
    type: Array,
  },
  cover: {
    default: null,
    type: String,
  },
  date: {
    default: Date.now(),
    type: Date,
  },
  description: {
    required: true,
    type: String,
  },
  members: {
    default: [],
    type: Array,
  },
  onListing: {
    default: false,
    type: Boolean,
  },
  owner: {
    required: true,
    type: String,
  },
  projectStatus: {
    required: true,
    type: String,
  },
  resources: {
    required: true,
    type: Array,
  },
  status: {
    default: false,
    type: Boolean,
  },
  title: {
    required: true,
    type: String,
  },
  uid: {
    default: null,
    type: String,
  },
  url: {
    default: null,
    type: String,
  },
});

module.exports = model('Project', projectSchema);
