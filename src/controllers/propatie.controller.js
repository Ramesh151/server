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

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new ApiError(400, "No files were uploaded.");
    }

    const images = req.files.images;
    const videos = req.files.videos;

    if (!images || images.length === 0) {
      throw new ApiError(400, "Images are required.");
    }

    if (!videos || videos.length === 0) {
      throw new ApiError(400, "Videos are required.");
    }

    const uploadImagePromises = images.map(async (image) => {
      const upload = await uploadOnCloudinary(image.path);
      console.log(upload);
      return upload.url;
    });

    const uploadVideoPromises = videos.map(async (video) => {
      const upload = await uploadOnCloudinary(video.path);
       console.log(upload);
      return upload.url;
    });

    const uploadedImageUrls = await Promise.all(uploadImagePromises);
    const uploadedVideoUrls = await Promise.all(uploadVideoPromises);

    const property = new Property({
      address,
      email,
      phoneNumber,
      images: uploadedImageUrls,
      videos: uploadedVideoUrls,
    });

    const savedProperty = await property.save();

    return res
      .status(201)
      .json(new ApiResponse(200, savedProperty, "Property added successfully"));
  } catch (error) {
    console.log("Error adding property:", error);
    res
      .status(error.statusCode || 500)
      .send(error.message || "Internal Server Error");
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
