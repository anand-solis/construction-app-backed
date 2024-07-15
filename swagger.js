const swaggerAutogen = require("swagger-autogen")();

const docs = {
    info: {
        title: "Solis Construction",
        description: "Solis Construction Backend API Documentation",
        version: "1.0.0"
    },
    host: "http://localhost:5000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
};

const outputFile = "./docs/swagger.json";

const routes = ["routes/**/*.js"];

swaggerAutogen(outputFile, routes, docs);