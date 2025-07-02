const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const mongoClient = new MongoClient(process.env.MONGO_URI);

router.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const client = await mongoClient.connect();
        const db = client.db(process.env.DB_NAME);
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
        const fileDetails = req.body;
        const extensions = JSON.parse(fileDetails.extensions || "[]");
        const promises = req.files.map((file) => {
            const filename = file.originalname;
            const uploadStream = bucket.openUploadStream(filename, {
                metadata: {
                    filename: filename
                },

            })
            return new Promise((resolve, reject) => {
                uploadStream.on('finish', () => resolve({
                    filename: filename,
                    imageFileId: uploadStream.id
                }));

                uploadStream.on('error', (err) => reject(err));
                uploadStream.end(file.buffer);
            });
        })
        const results = await Promise.all(promises);
        client.close();
        res.status(200).json({ message: 'Files uploaded successfully!', files: results });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(400).json({ message: error.message });
    }
})
router.get('/image/:id', async (req, res) => {
  const client = await mongoClient.connect();
  const db = client.db(process.env.DB_NAME);
  const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

  try {
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(req.params.id));
    downloadStream.pipe(res);
  } catch (err) {
    res.status(404).send('Image not found');
  }
});


module.exports = router