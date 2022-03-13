const permissionsModel = require("../models/permissionsModel");

//get all
const getAllPermissions = () => {
  return new Promise((resolve, reject) => {
    permissionsModel.find({}, (err, permissions) => {
      if (err) {
        reject(err);
      } else {
        resolve(permissions);
      }
    });
  });
};

//get by id
const getPermissionById = (_id) => {
  return new Promise((resolve, reject) => {
    // { userId: _id }, (err, employee) => {
    permissionsModel.findOne({ userId: _id }, (err, permission) => {
      if (err) {
        reject(err);
      } else {
        resolve(permission);
      }
    });
  });
};

//post permission
const addPermission = (newPermission) => {
  return new Promise((resolve, reject) => {
    const permission = new permissionsModel(newPermission);

    permission.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(permission);
      }
    });
  });
};

//update \ put permission
const updatePermission = (_id, permissionToUpdate) => {
  return new Promise((resolve, reject) => {
    permissionsModel.updateOne({ userId: _id }, permissionToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Updated");
      }
    });
  });
};

//delete
const deletePermission = (_id) => {
  return new Promise((resolve, reject) => {
    permissionsModel.deleteOne({ userId: _id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllPermissions,
  getPermissionById,
  addPermission,
  updatePermission,
  deletePermission,
};
