const { mongoose, Schema } = require("mongoose");

let blogSchema = mongoose.Schema(
  {
    imageUrl: String,
    body: String,
    title: String,
    createdAt: String,
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
