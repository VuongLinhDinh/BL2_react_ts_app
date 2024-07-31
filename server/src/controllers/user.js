import User from "../models/User.js";
export const getUsers = async (req, res, next) => {
  try {
    const data = await User.find({});

    if (!data) {
      return res.status(400).json({
        message: errorMessages?.GET_FAIL
      });
    }
    const newUser = data.map((user) => {
      return {
        ...user._doc, // or user.toObject()
        password: undefined
      };
    });
    return res.status(200).json({
      message: successMessages.GET_SUCCESS,
      newUser
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.GET_FAIL
      });
    }
    data.password = undefined;
    return res.status(200).json({
      message: successMessages.GET_SUCCESS,
      data
    });
  } catch (error) {
    next(error);
  }
};
