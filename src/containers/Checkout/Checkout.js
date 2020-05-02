import React, {Component} from 'react'
import AxiosInstance from '../../AxiosInstance'
import NotificationPopups from '../../hoc/NotificationPopups/NotificationPopups'
import CheckoutSummary from '../../containers/Checkout/CheckoutSummary/CheckoutSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

class Checkout extends Component {

    state={
        ingredients:[],
        isLoading: false,
        notification: null,
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

    checkoutHandeler = () =>{
        this.setState( { isLoading: true } );
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
        let contentSection = (<CheckoutSummary 
            ingredients={this.state.ingredients}
            goToBurgerBuilderPage={this.goToBurgerBuilderPageHandeler}
            checkout={this.checkoutHandeler}
        />);
        if(this.state.isLoading){
            contentSection = <Spinner/>;
        }
        return (
            <div>
                <NotificationPopups notification={this.state.notification}/>
                {contentSection}
            </div>
        )
    }   
}

export default Checkout;