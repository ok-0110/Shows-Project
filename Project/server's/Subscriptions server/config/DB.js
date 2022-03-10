const Mongoose = require("mongoose");

const connectToDb = () => {
  const uri = "mongodb+srv://admin:admin@subscriptions-server.ovjnz.mongodb.net/Subscriptions-server?retryWrites=true&w=majority";

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  Mongoose.connect(uri, options);
  console.log("connected to Subscriptions DB");
};

module.exports = connectToDb;
