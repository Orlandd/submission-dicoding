const predictClassification = require("../services/inferencesService");

async function postPredictHandler(request, h) {
    const {image} = request.payload;
    const {model} = request.server.app;
    
    const {confidenceScore, label, suggestion} = await predictClassification(model, image);

    const id = crypto.randomUUID;
    const createdAt = new Date().toISOString;

    const data = {
        id,
        "result": label,
        "suggestion": suggestion,
        createdAt
    }

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })
    response.code(201);
    return response;
}

module.exports = postPredictHandler;