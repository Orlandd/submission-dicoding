const { tensor } = require("@tensorflow/tfjs-node");

const tf = tensor

async function loadModel() {
    return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;