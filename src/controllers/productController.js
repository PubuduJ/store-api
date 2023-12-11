const {StatusCodes} = require("http-status-codes");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort} = req.query;
    const filterObject = {};
    if (featured) {
        filterObject.featured = (featured === "true") ? true : false;
    }
    if (company) {
        filterObject.company = company;
    }
    if (name) {
        // search names based on regex, case insensitive.
        filterObject.name = { $regex: name, $options: "i"};
    }
    let result = Product.find(filterObject);
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        // default sort based on createdAt property.
        result = result.sort("createdAt");
    }
    const products = await result;
    res.status(StatusCodes.OK).json({products, arrayLength: products.length});
}

module.exports = {getAllProducts};