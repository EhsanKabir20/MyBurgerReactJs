import React from "react"
import classes from "./ToggleIcon.css"

const ToggleIcon = (props) => {
    return (
        <div className={classes.ToggleIcon} onClick={props.toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default ToggleIcon;