import React from 'react'
import classes from '../BurgerControls/BurgerControls.css'
import BurgerControl from '../BurgerControls/BurgerControl/BurgerControl'
import Button from "../../UI/Button/Button"

const burgerControls = (props) => {
    let burgerIngredients = Object.keys(props.ingredients);
    let burgerControls = burgerIngredients.map(ik => {
        return <BurgerControl type={ik} key={ik} removeIngridient={props.removeIngridient} addIngridient={props.addIngridient}></BurgerControl>
    })
    return (
        <div className={classes.BuildControls}>
            <div>Total Price: <strong>{props.totalPrice}</strong></div>
            {burgerControls}
            <Button btnClicked={props.modalOpen} isPurchasable={props.isPurchasable} canDisabled={true}>Order Now</Button>
        </div>
    );
}

export default burgerControls;