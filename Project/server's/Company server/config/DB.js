const Mongoose = require("mongoose");

const connectToDb = () => {
  const uri = "mongodb+srv://admin:admin@cluster0.aiv5m.mongodb.net/Database Deployments?retryWrites=true&w=majority";

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  Mongoose.connect(uri, options);
  console.log("connected to company DB");
};

module.exports = connectToDb;
