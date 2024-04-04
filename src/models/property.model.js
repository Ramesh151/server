import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
});

const Property = mongoose.model("Property", propertySchema);

export { Property };
