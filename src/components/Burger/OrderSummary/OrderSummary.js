import React from "react"
import classes from './OrderSummary.css'

const OrderSummary = (props) => {
    return (
        <div>
            <div className={classes.OrderSummaryContainer}>
                <h4>Burger Ingredients</h4>
                {
                    Object.keys(props.ingredients).map(ik=>{
                        return (
                            <div key={ik} className={classes.OrderEntry}>
                                <span style={{textTransform: "capitalize"}}>{ik} : </span> 
                                <span>{props.ingredients[ik]}</span>                                
                            </div>
                        )
                    })
                }
                <p>Total Price: <b>{props.totalPrice}</b></p>
            </div>        
        </div>
    )
}

export default OrderSummary;