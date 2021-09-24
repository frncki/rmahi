import express from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';

const router = express.Router();

const savingDirPath = path.join(__dirname, '../public/images')

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
  //console.log(data);
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);
  const baseType = {
    jpeg: 'jpg'
  };

  baseType['svg+xml'] = 'svg'

  if (!match) {
    throw new Error('image base64 data error');
  }

  const extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2]
  };
}

const imgSync = async (data, destpath, name) => {
  const result = img(data);
  const filepath = path.join(destpath, name);
  await fs.writeFileSync(filepath, result.base64, { encoding: 'base64' });

  return filepath;
};

// Route Controller for uploading base64 image file
router.post('/base64', async (req, res) => {
  let data = req.body;

  try {
    data.forEach(async (imageData) => {
      const { base64Image, fileName } = imageData;
      await imgSync(base64Image, savingDirPath, fileName)
    });

    res.status(200).send({ message: 'Files uploaded successfully.' });
  } catch (err) {
    res.status(400).send({ message: 'Error uploading file.' });
  }
});

module.exports = router;