import ExifTransformer from 'exif-be-gone';
import fs from "fs";

import {encodeImgName, decodeImgName} from './hashing';

const removeExif = (filePath, newName, fileFormat) => {
    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(`public/out/${newName}.jpg`);
    
    reader.pipe(new ExifTransformer()).pipe(writer);
}

const processImages = () => {
    let ciphertext = "";
    let decipheredText = "";
    let directory_name = process.env.INPUT_IMAGES;

    let filenames = fs.readdirSync(directory_name);
    console.log("\nFilenames in directory:");
    filenames.forEach((file) => {
        ciphertext = encodeImgName(file);
        decipheredText = decodeImgName(ciphertext);
        let path = `${directory_name}/${file}`
        removeExif(path, ciphertext);
        console.log(decipheredText);
    });
}

export { processImages };