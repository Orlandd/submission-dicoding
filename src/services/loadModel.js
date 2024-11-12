const tf = require("@tensorflow/tfjs-node");


const path = require('path');

async function loadModel() {
    const modelPath = 'file://' + path.resolve(__dirname, '../../model/model.json');
    console.log("Loading model from:", modelPath);
    return tf.loadGraphModel(modelPath);
}


module.exports = loadModel;