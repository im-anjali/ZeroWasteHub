const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

const getImage = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const client = await mongoClient.connect();
    const db = client.db(process.env.DB_NAME);
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // Find file metadata first
    const filesCollection = db.collection('uploads.files');
    const file = await filesCollection.findOne({ _id: fileId });

    if (!file) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', file.contentType || 'image/png'); // fallback

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error streaming image:', error);
    res.status(500).send('Server error');
  }
};

module.exports = getImage;


