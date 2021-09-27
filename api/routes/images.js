import express from "express";
import path from 'path';
import fs from 'fs';
import { processImages } from "../public/js/exifRemoving";
import { writeImages } from "../public/js/base64";

const router = express.Router();

const savingDirPath = path.join(__dirname, `../${process.env.INPUT_IMAGES}`);
const outDirPath = path.join(__dirname, `../${process.env.OUTPUT_IMAGES}`);

// Route Controller for uploading base64 image file
router.post('/base64', (req, res) => {
  const imagesData = req.body.base64Files;
  const requestID = req.body.id;
  const newIdSavingPath = path.join(savingDirPath, requestID);
  const newIdOutPath = path.join(outDirPath, requestID);

  try {
    fs.promises.mkdir(newIdSavingPath)
      .then(writeImages(imagesData, newIdSavingPath))
      .catch((err) => console.log(err));

    fs.promises.mkdir(newIdOutPath)
      .then(processImages(requestID))
      .catch((err) => console.log(err));

    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

router.get('base64', (req, res) => {
  
});

module.exports = router;