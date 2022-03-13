const path = require("path");

//expres
const express = require("express"); //thig to bild server
const app = express(); //name the thing to bild server

app.use(express.json()); // thing to convet json to obj
app.use(express.urlencoded({ extended: true })); //anather thing to convet json to obj

//cros
const cors = require("cors"); //thing to acsess data
app.use(cors()); //activate thing to acsess data

//DB
const connectToDB = require("./config/DB"); //"link" to connect the DB to the server
connectToDB(); //to activate the connection the DB to the server

//controlers
const usersController = require("./controllers/usersController");
app.use("/company/users", usersController); //http://localhost:7070/company/users

const permissionsController = require("./controllers/permissionsController");
app.use("/company/permissions", permissionsController); //http://localhost:7070/company/permissions

const employeeController = require("./controllers/employeeController");
app.use("/company/employee", employeeController); //http://localhost:7070/company/employee

//start server
app.listen(7070, () => {
  console.log("the company server is listening");
  console.log("http://localhost:7070/company/");
});

//chek if admin exsist (if not - creat one)
const admin = async () => {
  console.log("admin check");
  const userServices = require("./services/userServices");
  const permissionsServices = require("./services/permissionsServices");

  let allUsers = await userServices.getAllUsers();
  const exsist = allUsers.find((el) => el.UserName === "admin");
  if (exsist === undefined) {
    const adminToUserDB = {
      UserName: "admin",
      Password: "admin",
    };
    const resolveAdmin = await userServices.addUser(adminToUserDB);
    console.log("created admin");

    //set permissions
    const adminToPremission = {
      userId: resolveAdmin._id,
      permissions: [
        "Admin",
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies",
      ],
    };

    await permissionsServices.addPermission(adminToPremission);
    console.log("created permissions");
  } else {
    console.log("admin exsist");
  }
};

admin();
