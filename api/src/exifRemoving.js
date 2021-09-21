import ExifTransformer from 'exif-be-gone';
import fs from "fs";

import {encodeImgName, decodeImgName} from './hashing';

const removeExif = (filePath, newName, fileFormat) => {
    let newFilePath = `${process.env.OUTPUT_IMAGES}/${newName}.${fileFormat}`

    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(newFilePath);

    reader.pipe(new ExifTransformer()).pipe(writer);
}

const extractFileNameAndFormat = (file) => {
    let regexForFilePath = '(.*)\\.([^.]+)$';
    let regexMatches = file.match(regexForFilePath);

    return { fileName: regexMatches[1], fileFormat: regexMatches[2] };
}

const processImages = () => {
    let ciphertext = "";
    let decipheredText = "";
    let directory_name = process.env.INPUT_IMAGES;

    let filenames = fs.readdirSync(directory_name);
    console.log("\nFilenames in directory:");
    filenames.forEach((file) => {
        let { fileName, fileFormat } = extractFileNameAndFormat(file);

        ciphertext = encodeImgName(fileName);

        let path = `${directory_name}/${file}`
        removeExif(path, ciphertext, fileFormat);

        decipheredText = decodeImgName(ciphertext);
        console.log(`${decipheredText}.${fileFormat}`);
    });
}

export {processImages};