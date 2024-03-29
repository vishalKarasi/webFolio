import {
  cloudinaryUploader,
  handleCloudinaryUpload,
} from "../middlewares/cloudinary.js";

export const getOne = (Model) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Model.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res
      .status(200)
      .json({ message: `Fetch ${Model.modelName} successfully`, data });
  } catch (error) {
    next(error);
  }
};

export const getAll = (Model) => async (req, res, next) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const options = {
      limit: parseInt(limit),
      skip: (page - 1) * limit,
    };

    const data = await Model.find({}, {}, options);

    if (data.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res
      .status(200)
      .json({ message: `Fetch All ${Model.modelName} successfully`, data });
  } catch (error) {
    next(error);
  }
};

export const createOne = (Model) => async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = await handleCloudinaryUpload(req.file.buffer);

    const data = await Model.create(body);

    return res
      .status(200)
      .json({ message: `Create ${Model.modelName} successfully`, data });
  } catch (error) {
    next(error);
  }
};

export const updateOne = (Model) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    const prevData = await Model.findById(id);

    if (req.file) {
      body.image = await handleCloudinaryUpload(req.file.buffer);
      if (prevData.image) await cloudinaryUploader.destroy(prevData.image);
    }

    const data = await Model.findByIdAndUpdate(id, body, { new: true });

    return res
      .status(200)
      .json({ message: `Update ${Model.modelName} successfully`, data });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const prevData = await Model.findById(id);

    if (prevData.image) await cloudinaryUploader.destroy(prevData.image);

    await Model.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `Delete ${Model.modelName} successfully` });
  } catch (error) {
    next(error);
  }
};
