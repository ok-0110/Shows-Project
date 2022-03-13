const express = require("express");
const permissionsServices = require("../services/permissionsServices");

const router = express.Router();

/*
map :)

_id = permissions _id


permissions:
get all: method-get /permissions
get by user id: method-get /permissions/:_id
post new permissions: method-post /permissions
update by id: method-put /permissions/:_id
Delete by id: method-delete /permissions/:_id


*/

//get all permissionss
router.route("/").get(async (request, response) => {
  try {
    const permissionss = await permissionsServices.getAllPermissions();

    return response.json(permissionss);
  } catch (error) {
    return response.json(error);
  }
});

//get permissionss by user id
router.route("/:_id").get(async (request, response) => {
  try {
    const _id = request.params._id;
    const permissions = await permissionsServices.getAllPermissions();
    const findedPermissions = permissions.find((el) => el.userId == _id);
    if (findedPermissions === undefined) {
      console.log(`permissions not fund`);
    }
    return response.json(findedPermissions);
  } catch (error) {
    return response.json(error);
  }
});

//post
router.route("/").post(async (request, response) => {
  try {
    const newPermissions = request.body;
    const permissions = await permissionsServices.addPermission(newPermissions);

    return response.json(permissions);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:_id").put(async (request, response) => {
  try {
    const _id = request.params._id;
    const updatePermissions = request.body;
    const permissions = await permissionsServices.updatePermission(_id, updatePermissions);
    return response.json(permissions);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:_id").delete(async (request, response) => {
  try {
    const _id = request.params._id;
    const permissions = await permissionsServices.deletePermission(_id);
    return response.json(permissions);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
