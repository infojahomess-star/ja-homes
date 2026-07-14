const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // CON-XXXXXX format
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    interest: {
      type: String,
      default: "General Inquiry",
    },
  },
  { 
    timestamps: true,
    _id: false
  }
);

ContactSchema.virtual("id").get(function() {
  return this._id;
});

ContactSchema.set("toJSON", { virtuals: true });
ContactSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Contact", ContactSchema);
