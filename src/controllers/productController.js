const getAllProducts = async (req, res) => {
    res.status(200).json({message: "product testing route"});
}

module.exports = {getAllProducts};