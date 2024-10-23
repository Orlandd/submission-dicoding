const  tf  = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
    const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224,224])
        .expandDims()
        .toFloat()
    
    const predition = model.predict(tensor);
    const score = await predition.data()
    const confidanceScore = Math.max(...score) * 100;

    const classes = ['Cancer', 'Non-cancer'];

    const classResult = tf.argMax(predition, 1).dataSync()[0]
    const label = classes[classResult];

    let suggestion;

    if (label === 'Cancer') {
        suggestion = 'Segera periksa ke dokter!'
    }

    if (label === 'Non-Cancer') {
        suggestion = 'Penyakit kanker tidak terdeteksi.'
    }

    return { confidanceScore, label, suggestion};
}

module.exports = predictClassification;