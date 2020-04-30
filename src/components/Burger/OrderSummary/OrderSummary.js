import React, { Component } from "react"
import classes from './OrderSummary.css'

class OrderSummary extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props.ingredients !== nextProps.ingredients;
    }

    render(){
        return (
            <div>
                <div className={classes.OrderSummaryContainer}>
                    <h4>Burger Ingredients</h4>
                    {
                        Object.keys(this.props.ingredients).map(ik=>{
                            return (
                                <div key={ik} className={classes.OrderEntry}>
                                    <span style={{textTransform: "capitalize"}}>{ik} : </span> 
                                    <span>{this.props.ingredients[ik]}</span>                                
                                </div>
                            )
                        })
                    }
                    <p>Total Price: <b>{this.props.totalPrice}</b></p>
                </div>        
            </div>
        )
    }
}

export default OrderSummary;