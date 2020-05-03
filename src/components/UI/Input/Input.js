import React from 'react'
import classes from './Input.css'

const Input = (props) => {
    let inputItem = null;
    let classNames = [classes.InputItem];
    if(!props.isValid && props.touched){
        classNames.push(classes.Invalid);
    }
    switch (props.inputType) {
        case "input":
            inputItem = (
                <input className={classNames.join(" ")} onChange={props.inputChanged} value={props.inputValue} {...props.inputAtrributes}/>
            )
            break;
        case "textarea":
            inputItem = (
                <textarea className={classNames.join(" ")} onChange={props.inputChanged} value={props.inputValue} {...props.inputAtrributes}/>               
            )
            break;    
        case "select":
            inputItem = (
                <select className={classNames.join(" ")} onChange={props.inputChanged} value={props.inputValue}>
                    {                          
                        props.inputAtrributes.options.map(option=>{
                        return <option value={option.value}>{option.text}</option>;
                        })
                    }
                </select>               
            )
            break;               
        default:
            break;
    }

    return (
        <div className={classes.InputContainer}>
            <label className={classes.Label}>{props.nameOfInput}</label>
            {inputItem}
        </div>
    );
}

export default Input;