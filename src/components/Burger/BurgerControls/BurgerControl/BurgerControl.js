import React from 'react'
import classes from '../BurgerControl/BurgerControl.css'
import Button from '../../../UI/Button/Button'
import btnClasses from '../../../UI/Button/Button.css'

const burgerControl = (props) => (
    <div className={classes.BuildControl}>
       <span className={classes.Label}>{props.type}</span>
       <Button btnClicked={() => props.removeIngridient(props.type)} buttonType={btnClasses.Success}>Less</Button>
       <Button btnClicked={() => props.addIngridient(props.type)} buttonType={btnClasses.Danger}>More</Button>
    </div>
);

export default burgerControl;