import express from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { processImages } from "../public/js/exifRemoving";

const router = express.Router();

const savingDirPath = path.join(__dirname, '../public/images')
const outDirPath = path.join(__dirname, '../public/out')
// Create Upload Instace to use in route middlware
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, savingDirPath),
  filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  return res.send('Images');
});

router.post('/', upload.array('multipleImages'), (req, res) => {
  try {
    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});
//=================================================================================================================================================
const img = (data) => {
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);

  if (!match) {
    throw new Error('image base64 data error');
  }

  return match[2];
}

const imgSync = (data, destpath, name) => {
  const base64Image = img(data);
  const filepath = path.join(destpath, name);
  fs.writeFileSync(filepath, base64Image, { encoding: 'base64' });

  return filepath;
};

// Route Controller for uploading base64 image file
router.post('/base64', async (req, res) => {
  const imagesData = req.body.base64Files;
  const requestID = req.body.id;
  const newIdSavingPath = path.join(savingDirPath, requestID);
  const newIdOutPath = path.join(outDirPath, requestID);

  fs.mkdir(newIdSavingPath, { recursive: true }, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("New directory successfully created.")
    }
  })

  fs.mkdir(newIdOutPath, { recursive: true }, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("New directory successfully created.")
    }
  })

  try {
    imagesData.forEach(async (imageData) => {
      const { base64Image, fileName } = imageData;
      imgSync(base64Image, newIdSavingPath, fileName)
    });

    //processImages(requestID);

    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

module.exports = router;