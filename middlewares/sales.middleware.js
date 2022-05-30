const Joi = require('joi');

const salesDTO = Joi.object({
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

module.exports = { validationSalesMiddleware };
