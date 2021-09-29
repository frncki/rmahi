/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import Button from '../Button/Button';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Download = () => {
    const appContext = React.useContext(AppDataContext);

    const zipAndSaveFiles = (filesData) => {
        const zip = new JSZip();
        var imgDirectory = zip.folder("images");
        filesData.forEach(image => {
            imgDirectory.file(image.fileName, image.base64Image, { base64: true });
        });
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, "example.zip");
            });
    }

    const handleSubmit = async (e) => {
        try {
            const { data } = await axios.get(`api/images/base64/${appContext.id}`);
            zipAndSaveFiles(data);
        } catch (err) {
            console.log(err);
            appContext.setMessage('Error');
        }
    }

    return (
        <Button type="download" handleAction={handleSubmit} />
    );
}

export default Download;