const router = require("express").Router();

const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger');

const booksRoutes = require('./books');
const usersRoutes = require('./users');

const passport = require('passport');

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
            res.redirect('/');
    });
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  swaggerOptions: {
    withCredentials: true,  // ← important! allows sending cookies
  }
}));

router.use('/books', booksRoutes);
router.use('/users', usersRoutes);

module.exports = router;