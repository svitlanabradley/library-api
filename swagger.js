const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API for Books and Users",
    },
    servers: [
      { url: "https://library-api-gmet.onrender.com" }, // or your deployed URL
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', // default express-session cookie name
        }
      }
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;