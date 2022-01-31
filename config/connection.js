const { connect, connection } = require("mongoose");

connect("mongodb://localhost/socialNetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((connection) =>
  Object.values(connection.models).forEach((model) => model.deleteMany({}))
);

module.exports = connection;
