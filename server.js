const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
// This is the basic express session({..}) initialization.
app.use(passport.initialize())
// init passport on every route call.
app.use(passport.session())
// allow passport to use "express-session.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
app.use(cors({ origin: 'https://library-api-gmet.onrender.com', credentials: true }))

app.use("/", require("./routes/index.js"))


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({githubId: profile.id}, function (err, user) {
        return done(null, profile);
        //)};       
}));


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out");
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs'
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });



process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


// Connect to DB and start server
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and Running on port ${port}`)});
    }
})
