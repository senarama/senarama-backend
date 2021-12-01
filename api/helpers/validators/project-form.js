const isEmpty = require('../is-empty');

const checkProjectInput = (reqBody, edit = false) => {
  const data = { ...reqBody };
  const errors = {};

  data.collaborators = isEmpty(data.collaborators) ? [] : data.collaborators;
  data.description = isEmpty(data.description) ? '' : data.description;
  data.members = isEmpty(data.members) ? [] : data.members;
  // data.owner = isEmpty(data.owner) ? '' : data.owner;
  data.projectName = isEmpty(data.projectName) ? '' : data.projectName;
  data.projectStatus = isEmpty(data.projectStatus) ? 'started' : data.projectStatus;
  data.resources = isEmpty(data.resources) ? [] : data.resources;
  data.title = isEmpty(data.title) ? '' : data.title;
  data.isProject = true;

  if (!edit) {
    data.active = false;
    data.uid = isEmpty(data.uid) ? '' : data.uid;
    data.status = false;
    data.onListing = false;
  } else {
    data.userUID = data.uid;
    delete data.active;
    delete data.uid;
    delete data.status;
    delete data.onListing;
  }

  if (isEmpty(data.title)) {
    errors.title = 'Este campo es obligatorio';
  }

  if (isEmpty(data.description)) {
    errors.description = 'La descripción es obligatoria';
  }

  if (isEmpty(data.owner)) {
    errors.description = 'Este campo es obligatorio';
  }

  if (isEmpty(data.resources)) {
    errors.resources = 'Esta información es obligatoria';
  }

  if (isEmpty(data.projectName)) {
    errors.projectName = 'El nombre el proyecto es obligatorio';
  }

  if (isEmpty(data.projectStatus)) {
    errors.projectStatus = 'El estado es obligatorio';
  }
  return {
    errors,
    data,
    isValid: isEmpty(errors),
    formName: 'project',
  };
};

module.exports = checkProjectInput;
