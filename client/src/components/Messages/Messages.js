import './Messages.css';
import * as React from 'react';
import AppDataContext from "../../context/AppDataContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Messages = () => {
    const appContext = React.useContext(AppDataContext);
    const nodeRef = React.useRef(null);

    return (
        <div className="card-body">
            <div className={`card ${appContext.status}`}>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        classNames="fade"
                        nodeRef={nodeRef}
                        timeout={200} 
                        key={appContext.message}
                    >
                        <p ref={nodeRef} className="message">{appContext.message}</p>
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