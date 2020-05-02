import React from 'react';
import Burger from '../../../components/Burger/Burger'
import Button from '../../../components/UI/Button/Button'
import btnClasses from '../../../components/UI/Button/Button.css'
import classes from '../CheckoutSummary/CheckoutSummary.css'

const CheckoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h2>Hope the burger will test well!!</h2>
            <Burger ingredients={props.ingredients}></Burger>                
            <Button btnClicked={props.goToBurgerBuilderPage} buttonType={btnClasses.Link}>Cancel</Button>
            <Button btnClicked={props.checkout} buttonType={btnClasses.Link}>Continue</Button>
        </div>
    );
}

export default CheckoutSummary;