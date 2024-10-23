'use strict';
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const loadModel = require('../services/loadModel');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
        }
    });

    server.route(routes);

    const model = await loadModel();
    server.app.model = model;

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        // if (response instanceof InputError) {
        //     const newResponse = h.response({
        //         status: 'fail',
        //         message: `${response.message} Silahkan gunakan foto lain`
        //     })

        //     newResponse.code(response.statusCode);
        //     return newResponse;
        // }

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })

            newResponse.code(response.statusCode)
            return newResponse;
        }

        return h.continue;
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();