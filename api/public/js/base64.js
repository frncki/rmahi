import path from 'path';
import fs from 'fs';
// Methods for  POST
const extractBase64Data = (data) => {
  const regexForBase64 = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(regexForBase64);

  if (!match) {
    throw new Error('image base64 data error');
  }

  return match[2];
}

const writeBase64Image = async (data, destpath, name) => {
  const base64Image = extractBase64Data(data);
  const filepath = path.join(destpath, name);
  await fs.promises.writeFile(filepath, base64Image, { encoding: 'base64' });

  return filepath;
}

const writeImages = (imagesData, newIdSavingPath) => {
  imagesData.forEach((imageData) => {
    const { base64Image, fileName } = imageData;
    writeBase64Image(base64Image, newIdSavingPath, fileName)
  });
}
// Methods for GET
const convertImagesToBase64 = async (idDirpath) => {
  const imagesNames = await fs.promises.readdir(idDirpath);
  let base64Images = [];
  imagesNames.forEach((image) => {
    const imagePath = path.join(idDirpath, image);
    const base64 = fs.readFileSync(imagePath, 'base64');
    base64Images.push({
      base64Image: base64,
      fileName: image
    });
  });
  return base64Images;
}

export { writeImages, convertImagesToBase64 };