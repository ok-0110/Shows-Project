const employeesModel = require("../models/employeeModel");

//get all
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    employeesModel.find({}, (err, employees) => {
      if (err) {
        reject(err);
      } else {
        resolve(employees);
      }
    });
  });
};

//get by id
const getEmployeeById = (_id) => {
  return new Promise((resolve, reject) => {
    employeesModel.findOne({ userId: _id }, (err, employee) => {
      if (err) {
        reject(err);
      } else {
        resolve(employee);
      }
    });
  });
};

//post employee
const addEmployee = (newEmployee) => {
  return new Promise((resolve, reject) => {
    const employee = new employeesModel(newEmployee);

    employee.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(employee);
      }
    });
  });
};

//update \ put employee
const updateEmployee = (_id, employeeToUpdate) => {
  return new Promise((resolve, reject) => {
    employeesModel.updateOne({ userId: _id }, employeeToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Updated");
      }
    });
  });
};

//delete
const deleteEmployee = (_id) => {
  return new Promise((resolve, reject) => {
    employeesModel.deleteOne({ userId: _id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
