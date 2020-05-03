import React from 'react'
import classes from './OrderItem.css'

const OrderItem = (props) => {
    let ingredients = Object.keys(props.orderItem.ingredients).map( ingredient => {
        return <span key={ingredient} className={classes.Ingredient}>{ingredient}: {props.orderItem.ingredients[ingredient]}</span>;
    });
    return(
        <div className={classes.OrderItem}>
            <div className={classes.Customer}>{props.orderItem.customer}</div>
            <div className={classes.CustomerAddress}>{props.orderItem.email}</div>
            <div className={classes.CustomerAddress}>{props.orderItem.address}</div>
            <div className={classes.IngredientContainer}>
                Burger Ingredients: { ingredients }
            </div>
            <div style={{"textTransform": "capitalize"}}>Delivery Method: {props.orderItem.deliveryMethod}</div>
        </div>
    );
}

export default OrderItem;