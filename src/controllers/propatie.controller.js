import { Property } from "../models/property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProperties = asyncHandler(async (req, res) => {
  try {
    const { address, email, phoneNumber } = req.body;

    if ([address, email, phoneNumber].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    console.log(req.body);

    const images = req.file.path;
    console.log(req.file);
    console.log(images);
    if (!images) {
      throw new ApiError(400, "images file is required");
    }

    const uploadimage = await uploadOnCloudinary(images);
    console.log(uploadimage);

    if (!uploadimage) {
      throw new ApiError(400, "photo file is required");
    }

    // const newProperty = await User.create({

    //   address,
    //   email,
    //   phoneNumber,
    //   images: uploadimage?.url || "",
    // });

    const newProperty = new Property({
      address,
      email,
      phoneNumber,
      images: uploadimage?.url || "",
    });

    console.log(newProperty);

    const saveproperty = await newProperty.save();
    console.log(saveproperty);

    return res
      .status(201)
      .json(new ApiResponse(200, saveproperty, "add propertiy"));
  } catch (error) {
    console.log("add error in property", error);
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const getProperties = asyncHandler(async (req, res) => {
  try {
    const propert = await Property.find();
    res.json(propert);
  } catch (error) {
    console.log("getproduct erroe hai", error);
  }
});

export { addProperties, getProperties };
