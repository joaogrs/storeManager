const Joi = require('joi');
const productsModel = require('../models/productsModel');

const salesDTO = Joi.array().items({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
}).messages({
    'any.required': '{{#label}} is required',
    'number.min': '{{#label}} must be greater than or equal to 1"',
});

const validationSalesMiddleware = (req, res, next) => {
    const { error } = salesDTO.validate(req.body, { abortEarly: false });
    if (!error) {
        return next();
    }
    const message = error.details.map((e) => e.message);
    return res.status(400).json(message);
};

const validationProductQuantity = async (req, res, next) => {
    const [allProducts] = await productsModel.getAll();
    let test = false;
    req.body.forEach((sale) => {
        const message = { message: 'Such amount is not permitted to sell' };
        const { productId, quantity: quantitySale } = sale;
        const productFinded = allProducts.find((p) => p.id === productId);
        const { quantity } = productFinded;
        const total = quantity - quantitySale;
        if (total < 0) {
            test = true;
            return res.status(422).json(message);
        }
    });
    if (!test) return next();
};

module.exports = { validationSalesMiddleware, validationProductQuantity };
