const {StatusCodes} = require("http-status-codes");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query;
    // filtering.
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
    // sorting.
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        // default sort based on createdAt property, if req doesn't have the sort param.
        result = result.sort("createdAt");
    }
    // selecting relevant fields.
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }
    // pagination.
    // If user doesn't pass the page value, it will be 1 by default.
    const page =  Number(req.query.page) || 1;
    // If user doesn't pass the limit value, it will be 10 by default.
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    
    const products = await result;
    res.status(StatusCodes.OK).json({products, resultCount: products.length});
}

module.exports = {getAllProducts};