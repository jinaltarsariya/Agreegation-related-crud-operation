const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentResultSchema = new Schema(
  {
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    email: { type: String, trim: true },
    subOne: { type: String, trim: true },
    subTwo: { type: String, trim: true },
    subThree: { type: String, trim: true },
  },
  { timestamps: { createdAt: "Created_at", updatedAt: "Updated_at" } }
);

const studentResultModel = mongoose.model("student", studentResultSchema);

module.exports = studentResultModel;
