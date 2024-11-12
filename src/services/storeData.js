// const { Firestore } = require("@google-cloud/firestore");

// async function storeData(id, data) {
//   const db = new Firestore();

//   const predictCollection = db.collection("prediction");
//   return predictCollection.doc(id).set(data);
// }

const mysql = require('mysql2/promise');

async function storeData(id, data) {
  // Buat koneksi ke database
  const connection = await mysql.createConnection({
    host: 'localhost', // Ganti dengan host database Anda
    user: 'root',      // Ganti dengan username database Anda
    password: 'password', // Ganti dengan password database Anda
    database: 'cancer' // Ganti dengan nama database Anda
  });

  try {
    // Query untuk menyimpan data
    const query = `INSERT INTO predictions (id, data) VALUES (?, ?) 
                   ON DUPLICATE KEY UPDATE data = VALUES(data)`;

    // Eksekusi query dengan nilai id dan data sebagai parameter
    await connection.execute(query, [id, JSON.stringify(data)]);

    console.log('Data berhasil disimpan');
  } catch (error) {
    console.error('Error menyimpan data:', error);
  } finally {
    // Tutup koneksi
    await connection.end();
  }
}


module.exports = storeData;
