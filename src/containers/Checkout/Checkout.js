import React, {Component} from 'react'
import CheckoutSummary from '../../containers/Checkout/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import ContactForm from '../Checkout/ContactForm/ContactForm'
import {Route} from 'react-router-dom'

class Checkout extends Component {

    state={
        ingredients:[],
        totalPrice: 0
    }

    componentWillMount () {
        const queryString = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (const param of queryString.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = param[1];
            }
        }
        this.setState({totalPrice: price, ingredients: ingredients});
    }

    goToBurgerBuilderPageHandeler = () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-form' );
    }

    render(){
        let contentSection = (
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                goToBurgerBuilderPage={this.goToBurgerBuilderPageHandeler}
                checkout={this.checkoutContinuedHandler}/>
        );
        if(this.state.isLoading){
            contentSection = <Spinner/>;
        }
        return (
            <div>
                {contentSection}
                <Route 
                    path={this.props.match.path + '/contact-form'} 
                    component={
                        () => <ContactForm 
                            totalPrice={this.state.totalPrice} 
                            ingredients={this.state.ingredients} 
                            goToOrdersPage={() => {this.props.history.push('/Orders')}}/>
                        }/>
            </div>
        )
    }   
}

export default Checkout;