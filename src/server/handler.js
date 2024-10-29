const predictClassification = require("../services/inferencesService");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const { Firestore } = require("@google-cloud/firestore");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const imageSize = Buffer.byteLength(image, "base64");

  if (imageSize > 1000000) {
    const response = h.response({
      status: "fail",
      message: "Payload content length greater than maximum allowed: 1000000",
    });
    response.code(413);
    return response;
  }

  const { label, suggestion } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion: suggestion,
    createdAt,
  };

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);

  await storeData(id, data);

  return response;
}

// async function getData() {
//   const db = new Firestore();
//   const querySnapshot = await db.collection("prediction").get();
//   const data = [];

//   querySnapshot.forEach((doc) => {
//     const data = doc.data();
//     const formattedData = {
//       id: doc.id,
//       history: {
//         result: data.result,
//         createdAt: data.createdAt,
//         suggestion: data.suggestion,
//         id: doc.id,
//       },
//     };
//     dataArray.push(formattedData);
//   });

//   return {
//     status: "success",
//     data: data,
//   };
// }

module.exports = postPredictHandler;
