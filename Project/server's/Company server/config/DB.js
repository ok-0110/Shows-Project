const Mongoose = require("mongoose");

const connectToDb = () => {
  const uri = "mongodb+srv://admin:admin@cluster0.aiv5m.mongodb.net/Cluster0?retryWrites=true&w=majority";

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  Mongoose.connect(uri, options);
  console.log("connected to company DB");
};

module.exports = connectToDb;
