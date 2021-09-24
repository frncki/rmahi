import express from "express";
import path from 'path';
import fs from 'fs';
import { processImages } from "../public/js/exifRemoving";

const router = express.Router();

const savingDirPath = path.join(__dirname, '../public/images')
const outDirPath = path.join(__dirname, '../public/out')

const makeDir = (path) => {
  return new Promise(() => {
    fs.mkdir(path, { recursive: true }, function (err) {
      if (err) {
        throw new Error(err);
      } else {
        console.log("New directory successfully created.")
      }
    })
  });
}

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

const writeImages = (imagesData, newIdSavingPath) => {
  imagesData.forEach((imageData) => {
    const { base64Image, fileName } = imageData;
    imgSync(base64Image, newIdSavingPath, fileName)
  });
}

// Route Controller for uploading base64 image file
router.post('/base64', (req, res) => {
  const imagesData = req.body.base64Files;
  const requestID = req.body.id;
  const newIdSavingPath = path.join(savingDirPath, requestID);
  const newIdOutPath = path.join(outDirPath, requestID);

  try {
    makeDir(newIdSavingPath)
      .then(writeImages(imagesData, newIdSavingPath))
      .then(makeDir(newIdOutPath))
      .then(processImages(requestID))
      .catch((err) => console.log(err));

    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

module.exports = router;