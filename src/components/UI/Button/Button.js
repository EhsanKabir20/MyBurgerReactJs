import React from 'react'
import classes from '../Button/Button.css'
const button = (props) => {
    let buttonClasses = [classes.Button, props.buttonType].join(' ');
    return(
        <button className={buttonClasses} onClick={props.btnClicked} disabled={(props.canDisabled && props.isPurchasable) || !props.canDisabled ? "" : "disabled"}>
            {props.children}
        </button>
    );
}

export default button;