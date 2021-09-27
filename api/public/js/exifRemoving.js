import ExifTransformer from 'exif-be-gone';
import fs from "fs";
import path from 'path';

import { encodeImgName, decodeImgName } from './hashing';

const removeExif = (filePath, idDir, newName, fileFormat) => {
    let newFilePath = path.join(`${process.env.OUTPUT_IMAGES}/${idDir}`, `${newName}.${fileFormat}`);

    const reader = fs.createReadStream(filePath);
    const writer = fs.createWriteStream(newFilePath);

    reader.pipe(new ExifTransformer()).pipe(writer);
}

const extractFileNameAndFormat = (file) => {
    const regexForFilePath = '(.*)\\.([^.]+)$';
    const regexMatches = file.match(regexForFilePath);

    return { fileName: regexMatches[1], fileFormat: regexMatches[2] };
}

const processImages = async (idDir) => {
    let directory_name = process.env.INPUT_IMAGES;
    let idPath = path.join(directory_name, idDir)
    try {
        let filenames = await fs.promises.readdir(idPath);
        console.log("\nFilenames in directory:");
        filenames.forEach((fileNameAndFormat) => {
            let { fileName, fileFormat } = extractFileNameAndFormat(fileNameAndFormat);
            let filePath = path.join(idPath, fileNameAndFormat);
            let ciphertext = encodeImgName(fileName);

            removeExif(filePath, idDir, fileName, fileFormat);

            let decipheredText = decodeImgName(ciphertext);
            console.log(`${decipheredText}.${fileFormat}`);
        });
    } catch (err) {
        console.error(err)
    }
}

export { processImages };