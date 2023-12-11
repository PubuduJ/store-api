const {StatusCodes} = require("http-status-codes");

const errorHandler = async (err, req, res, next) => {
  console.log(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandler;
