import './Messages.css';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Messages = () => {
    const appContext = React.useContext(AppDataContext);
    let msg = appContext.message;
    return (
        <div className="card-body">
            <div className={`card ${appContext.status}`}>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        classNames="fade"
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        key={msg}
                    >
                        <p className="message">{msg}</p>
                    </CSSTransition>
                </SwitchTransition>
                <ul className="check-list">
                    {appContext.files.map((file, index) => <React.Fragment key={index}><li>{file.name}</li></React.Fragment>)}
                </ul>
            </div>
        </div>
    );
}

export default Messages;