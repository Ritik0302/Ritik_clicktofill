// models/AllUser.js
const mongoose = require("mongoose");

// const allUserSchema = new mongoose.Schema({
//   employeeID: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   uID: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Number,
//     required: true,
//   },
// });

// module.exports = mongoose.model("allUsers", allUserSchema);

const allUserSchema = mongoose.model("allUsers", {
  employeeID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  uID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});
module.exports = allUserSchema;
