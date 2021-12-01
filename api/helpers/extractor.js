const extractProjectInfo = (projectInfo = {}, type = 'admin') => {
  const data = { ...projectInfo.toObject() };
  switch (type) {
    case 'admin':
      return data;
    case 'other':
      delete data.state;
      delete data.active;
      delete data.onListing;
      return data;
    default:
      return data;
  }
};

const extractProjectsInfo = (projects = [], type = 'admin') => (
  projects.filter((project) => (type === 'others' ? project.active : true))
    .map((project) => extractProjectInfo(project.toObject(), type))
);

const extractUserInfo = (userInfo = {}, type = 'admin') => {
  const data = { ...userInfo };
  // console.log(userInfo);
  switch (type) {
    case 'admin':
      delete data.password;
      return data;
    case 'other':
      delete data.password;
      delete data.role;
      delete data.userID;
      delete data.idType;
      delete data.active;
      delete data.state;
      return data;
    default:
      return data;
  }
};

const extractUsersInfo = (users = [], type = 'admin') => (
  users.filter((user) => (type !== 'admin' ? user.active : true))
    .map((user) => extractUserInfo(user.toObject(), type))
);

module.exports = {
  extractProjectInfo,
  extractProjectsInfo,
  extractUserInfo,
  extractUsersInfo,
};
