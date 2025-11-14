const validator = require('../helpers/validate');

const validateBook = (req, res, next) => {
    const rules = {
        title: 'required|string',
        author: 'required|string',
        genre: 'string',
        year: 'numeric',
        pages: 'numeric',
        language: 'string',
        isbn: 'string'
    };

    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
        next();
    });
};

module.exports = validateBook;