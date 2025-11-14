const validator = require('../helpers/validate');

const validateUser = (req, res, next) => {
    const rules = {
        name: 'required|string',
        email: 'required|email',
        memberSince: 'required|string',
        favoriteGenre: 'string',
        borrowedBooks: 'array',
        isActive: 'boolean',
        role: 'string'
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

module.exports = validateUser;