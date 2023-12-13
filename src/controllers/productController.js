const {StatusCodes} = require("http-status-codes");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    // filtering.
    const filterObject = {};
    if (featured) {
        filterObject.featured = (featured === "true") ? true : false;
    }
    if (company) {
        filterObject.company = company;
    }
    if (name) {
        // search names based on regex, case-insensitive.
        filterObject.name = { $regex: name, $options: "i"};
    }
    // numeric filters
    if (numericFilters) {
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte",
        }
        const regEx = /\b(>|>=|=|<=|<)\b/g;
        let filters = numericFilters.replace(regEx, (match) => {
            return `-${operatorMap[match]}-`;
        })
        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                filterObject[field] = {[operator]:Number(value)}
            }
        })
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
    return res.status(StatusCodes.OK).json({products, resultCount: products.length});
}

module.exports = {getAllProducts};