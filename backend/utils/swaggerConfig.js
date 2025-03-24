const { appData } = require("./appData");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Market Pod Doc ',
            version: '1.0.0',
            description: 'API documentation for Market Pod ',
        },
        servers: [
            {
                url:appData.getBaseUrl(),
                //   url: 'https://kidan.ticketmastermr.com/',

            },
        ],
    },
    // Path to the API files
    apis: ['./controllers/*/*.js'], // Add the path to your route files
};

module.exports = {
    swaggerOptions
}
