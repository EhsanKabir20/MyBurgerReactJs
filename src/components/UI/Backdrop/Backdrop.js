import React from "react"
import classes from "./Backdrop.css"

const Backdrop = (props) => {
    let backDrop = null;
    if(props.isShowBackdrop){
        backDrop = (
            <div className={classes.Backdrop} onClick={props.BackdropClicked}></div>
        );
    }
    return backDrop;
}

export default Backdrop;