const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  userId: Object,
  permissions: Array,
});

module.exports = Mongoose.model("permission", userSchema);

/*
permissions:
{
"userId": "621bb32f45696063617e62b1",
    "permissions": [
      "View Subscriptions",
      "Create Subscriptions",
      "Delete Subscriptions",
      "View Movies",
      "Create Movies",
      "Delete Movies"
    ]
}
*/
