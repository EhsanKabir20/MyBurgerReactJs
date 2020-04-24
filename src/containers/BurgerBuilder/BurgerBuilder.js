import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from "../../components/UI/Modal/Modal"

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 1.5,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 3,
        isModalShow: false,
        isPurchasable: false
    }

    updatePurchaseState = (indgredients) => {
        let countOfIngredients = Object.keys(indgredients).map((ik)=>{
            return indgredients[ik] > 0; 
        }).reduce((ac, cv, ci) => {
            console.log(cv, ci);
            return ac + cv;
        }, 0);
        this.setState({
            isPurchasable: countOfIngredients > 0
        })
    }

    removeIngridientHandeler = (ingredientType) => {
        let ingredientsToUpdate = {...this.state.ingredients};
        const oldCount = this.state.ingredients[ingredientType];
        if(oldCount > 0){
            const updatedCount = oldCount - 1;
            ingredientsToUpdate[ingredientType] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[ingredientType];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAddition;
            this.setState( { totalPrice: newPrice, ingredients: ingredientsToUpdate } );
        }
        this.updatePurchaseState(ingredientsToUpdate);
    }

    addIngridientHandeler = (ingredientType) => {
        let ingredientsToUpdate = {...this.state.ingredients};
        const oldCount = this.state.ingredients[ingredientType];
        const updatedCount = oldCount + 1;
        ingredientsToUpdate[ingredientType] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[ingredientType];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: ingredientsToUpdate } );
        this.updatePurchaseState(ingredientsToUpdate);
    }

    modalClosedHandeler = () => {
        this.setState({
            isModalShow: false
        })
    }

    modalOpenHandeler = () => {
        this.setState({
            isModalShow: true
        })
    }

    checkoutHandeler = () =>{
        alert("checkout");
    }

    render(){
        return (
            <div>
                <Modal isShowModal={this.state.isModalShow} 
                    modalClose={this.modalClosedHandeler} 
                    modalTitle={"Order Summary"}
                    modalAction={this.checkoutHandeler}
                    modalActionName={"Checkout"}>
                    <OrderSummary
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}>                    
                    </OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BurgerControls 
                    ingredients={this.state.ingredients} 
                    removeIngridient={this.removeIngridientHandeler} 
                    addIngridient={this.addIngridientHandeler} 
                    totalPrice={this.state.totalPrice} 
                    modalClosed={this.modalOpenHandeler}
                    modalOpen={this.modalOpenHandeler}
                    isPurchasable={this.state.isPurchasable}>                        
                </BurgerControls>               
            </div>
        );
    }
}

export default BurgerBuilder;