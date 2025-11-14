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
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;
