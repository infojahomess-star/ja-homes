const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // JAH-XXXXXX format
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
      required: [true, "Phone number is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    timeSlot: {
      type: String,
      default: "10:00 AM",
    },
    tourType: {
      type: String,
      default: "In-Person Private Tour",
    },
    property: {
      type: String,
      default: "The Alpine Crest",
    },
    config: {
      cladding: { type: String, default: null },
      flooring: { type: String, default: null },
      amenity: { type: String, default: null },
      totalPrice: { type: String, default: null },
    },
    userId: {
      type: String,
      default: null, // References User._id
    },
  },
  { 
    timestamps: true,
    _id: false
  }
);

BookingSchema.virtual("id").get(function() {
  return this._id;
});

BookingSchema.set("toJSON", { virtuals: true });
BookingSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Booking", BookingSchema);
