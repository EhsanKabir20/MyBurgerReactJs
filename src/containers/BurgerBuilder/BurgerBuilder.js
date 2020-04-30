import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from "../../components/UI/Modal/Modal"
import AxiosInstance from "../../AxiosInstance"
import Auxc from "../../hoc/Auxc/Auxc"
import Spinner from '../../components/UI/Spinner/Spinner'
import NotificationPopups from "../../hoc/NotificationPopups/NotificationPopups"

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 1.5,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 3,
        isModalShow: false,
        isPurchasable: false,
        isLoading: false,
        notification: null
    }
    

    componentDidMount= () => {
        this.setState( { isLoading: true } );
        AxiosInstance.get("/ingredients.json")
            .then( response => {
                this.setState( { isLoading: false, ingredients: response.data } );
            })
            .catch( error => {
                this.setState({
                    isLoading: false,
                    notification: {
                        type: 'error',
                        message: 'Ingredients load failed!',
                        title: 'Error',
                        timeOut: 2000,
                        callback: () => {},
                        priority: true
                    }
                });
            });
    }

    updatePurchaseState = (indgredients) => {
        let countOfIngredients = Object.keys(indgredients).map((ik)=>{
            return indgredients[ik] > 0; 
        }).reduce((acumulator, currentValue, currentIndex) => {
            return acumulator + currentValue;
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
        this.setState( { isLoading: true, isModalShow: false } );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ehsan Kabir',
                address: {
                    street: 'Address line 1',
                    postalCode: '7410',
                    city: 'Dhaka',
                    country: 'Bangaldesh'
                },
                email: 'ehsan@minasu.net'
            },
            deliveryMethod: 'fastest'
        }
        AxiosInstance.post( '/orders.json', order )
            .then( response => {
                this.setState({
                    isLoading: false,
                    notification: {
                        type: 'success',
                        message: 'Checkout Done!',
                        title: 'Success',
                        timeOut: 2000,
                        callback: () => {},
                        priority: true
                    }
                });
            } )
            .catch( error => {
                this.setState({
                    isLoading: false,
                    notification: {
                        type: 'error',
                        message: 'Checkout failed!',
                        title: 'Error',
                        timeOut: 2000,
                        callback: () => {},
                        priority: true
                    }
                });
            } );
    }

    render(){        
        let burger = this.state.isLoading ? <Spinner /> : null;
        let orderSummary = null;
        if(this.state.ingredients){
            burger = (
                <Auxc>
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
                </Auxc>
            );
            
            orderSummary = (
                <OrderSummary
                    totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients}>                    
                </OrderSummary>
            );
        }
        return (
            <div>
                <NotificationPopups notification={this.state.notification}/>
                <Modal isShowModal={this.state.isModalShow} 
                    modalClose={this.modalClosedHandeler} 
                    modalTitle={"Order Summary"}
                    modalAction={this.checkoutHandeler}
                    modalActionName={"Checkout"}>
                    {orderSummary}
                </Modal>
                {burger}                 
            </div>
        );
    }
}

export default BurgerBuilder;