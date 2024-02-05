const asyncHandler = (requestHandler) => async (req, res) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      suceess: false,
      message: error.message,
    });
  }
};


export {asyncHandler}