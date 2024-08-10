const { mongoose } = require("mongoose");

let userSchema = mongoose.Schema(
  {
    name: { type: "string", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
