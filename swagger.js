const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API for Books and Users",
    },
    servers: [
      {
        url: "https://library-api-gmet.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;
