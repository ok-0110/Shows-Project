const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  createdDate: Date,
  SessionTimeOut: Number,
  userId: String,
});

module.exports = Mongoose.model("employee", userSchema);

/*
employee:

{"firstName":"dod",
"lastName":"dodi",
"userName":"dod",
"createdDate":"2022-02-27",
"SessionTimeOut":60,
"userId":"621bb32f45696063617e62b1"}
*/
