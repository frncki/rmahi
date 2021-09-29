/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import Button from '../Button/Button';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";
import { v4 as uuid } from 'uuid';
const Attach = () => {
    const appContext = React.useContext(AppDataContext);
    const inputRef = React.useRef(null);
    const formRef = React.useRef(null);

    const handleClick = () => {
        let id = uuid();
        appContext.setID(id);
        inputRef && inputRef.current && inputRef.current.click()
        appContext.setMessage('Pliki do przesłania:');
        appContext.setStatus('upload');
    };
    const handleFiles = async (e) => appContext.setFiles(e.target.files ? Array.from(e.target.files) : []);

    return (
        <form ref={formRef}>
            <Button type="attach" handleAction={handleClick} />
            <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} multiple accept="image/*" />
        </form>
    );
}

export default Attach;