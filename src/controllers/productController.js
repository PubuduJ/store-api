const {StatusCodes} = require("http-status-codes");

const getAllProducts = async (req, res) => {
    res.status(StatusCodes.OK).json({message: "product testing route"});
}

module.exports = {getAllProducts};