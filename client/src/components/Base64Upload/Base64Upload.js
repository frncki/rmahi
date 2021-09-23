import React, { useState, useRef } from 'react';
import axios from 'axios';

const Base64Upload = () => {
    const [files, setFiles] = useState([]);
    const [base64Files, setBase64Files] = useState([]);
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);
    const formRef = useRef(null);

    const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
    const handleFiles = async (e) => setFiles(e.target.files ? Array.from(e.target.files) : []);

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
        for (const image of files) {
            const base64 = await createBase64Image(image);
            setBase64Files(base64Files => base64Files.concat({
                base64Image: base64,
                fileName: image.name
            }));
        }
        if (base64Files.length > 0) {
            console.log(base64Files);
            axios.post('http://localhost:8080/api/images/base64', base64Files)
                .then(data => setMessage(data.data.message))
                .catch((error) => setMessage('Error'));
                setBase64Files([]);
            formRef.current && formRef.current.reset();
            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    }

    return (
        <form ref={formRef}>
            <div>{message}</div>
            <div onClick={handleClick} style={{ color: 'white' }}>
                Click and Select files to Upload (Base64) <hr />
                {files.map((x, index) => <React.Fragment key={index}>{x.name}<br /></React.Fragment>)}
            </div>
            <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} multiple accept="image/*" />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default Base64Upload;