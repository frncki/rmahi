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
  };
  
  const writeImages = (imagesData, newIdSavingPath) => {
    imagesData.forEach((imageData) => {
      const { base64Image, fileName } = imageData;
      writeBase64Image(base64Image, newIdSavingPath, fileName)
    });
  }
  // Methods for GET
  const createBase64Image = (file) => {
    const reader = new FileReader();
    return new Promise(function (resolve, reject) {
        reader.onload = function (event) {
            resolve(event.target.result)
        }
        reader.readAsDataURL(file);
    })
  }

  const convertImagesToBase64 = (path) => {
    const imagesNames = await fs.promises.readdir(path);
    let base64Images = [];
    imagesNames.forEach((image) => {
        const base64 = await createBase64Image(image);
        base64Images.pop({
            base64Image: base64,
            fileName: image
        });
    });
  }

export { writeImages };