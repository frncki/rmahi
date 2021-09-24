/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import Button from '../Button/Button';
import React, { useState, useRef } from 'react';
import AppDataContext from "../../context/AppDataContext";
import axios from 'axios';
import { v4 as uuid } from 'uuid'; 

const Upload = ({ type }) => {
    const appContext = React.useContext(AppDataContext);
    const [base64Files, setBase64Files] = useState([]);
    const formRef = useRef(null);

    const createBase64Image = (file) => {
        const reader = new FileReader();
        return new Promise(function (resolve, reject) {
            reader.onload = function (event) {
                resolve(event.target.result)
            }
            reader.readAsDataURL(file);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = uuid();
        for (const image of appContext.files) {
            const base64 = await createBase64Image(image);
            setBase64Files(base64Files => base64Files.concat({
                base64Image: base64,
                fileName: image.name
            }));
        }
        if (base64Files.length > 0) {
            axios.post('api/images/base64', {
                id: id,
                base64Files: base64Files
            })
                .then(data => appContext.setMessage(data.data.message))
                .catch((error) => appContext.setMessage('Error'));
            setBase64Files([]);
            formRef.current && formRef.current.reset();
            setTimeout(() => {
                appContext.setMessage('');
            }, 4000);
        }
    }

    return (
        <Button type="upload" handleAction={handleSubmit} />
    );
}

export default Upload;