import React from 'react';
import classes from "./Modal.css"
import Backdrop from "../Backdrop/Backdrop"
import Auxc from "../../../hoc/Auxc/Auxc"
import Button from "../../UI/Button/Button"
import btnClasses from '../../UI/Button/Button.css'

const Modal = (props) =>{
    return (
        <Auxc>
            <Backdrop isShowBackdrop={props.isShowModal} BackdropClicked={props.modalClose}></Backdrop>  
            <div className={classes.Modal}                     
                style={{
                    transform: props.isShowModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.isShowModal ? '1' : '0'
                }}>
                <div className={classes.modalContent}>
                    <div className={classes.modalHeader}>                
                        <h3>{props.modalTitle}</h3>
                        <strong className={classes.modalCloseBtn} onClick={props.modalClose}>
                            <span>×</span>
                        </strong>
                    </div>
                    <div className={classes.modalBody}>
                        {props.children}
                    </div>
                    <div className={classes.modalFooter}>
                        <Button btnClicked={props.modalClose}>Close</Button>
                        <span>&nbsp;</span>
                        <Button btnClicked={props.modalAction} buttonType={btnClasses.Success}>{props.modalActionName}</Button>
                    </div>
                </div>
            </div>
        </Auxc>
    )
}

export default Modal;
