import React, { Component } from 'react';
import AxiosInstance from '../../AxiosInstance'
import NotificationPopups from "../../hoc/NotificationPopups/NotificationPopups"
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderItem from '../Orders/OrderItem/OrderItem'
import classes from './Orders.css'

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true,
        notification: null
    }

    componentDidMount(){
        AxiosInstance.get('/orders.json')
            .then( response => {
                let orders = [];
                for (const orderId in response.data) {
                    const orderItem = response.data[orderId];
                    const address = orderItem.customer.address;
                    orders.push({
                        id: orderId,
                        ingredients: orderItem.ingredients,
                        customer: orderItem.customer.name,
                        address: address,
                        email: orderItem.customer.email,
                        deliveryMethod: orderItem.deliveryMethod
                    });
                }    
                this.setState( { isLoading: false, orders: orders } );
            })
            .catch( error => {
                this.setState({
                    isLoading: false,
                    notification: {
                        type: 'error',
                        message: 'Get orders failed!',
                        title: 'Error',
                        timeOut: 2000,
                        callback: () => {},
                        priority: true
                    }
                });
            });
    }

    render() {
        let ordersSection = <Spinner/>;
        if(!this.state.isLoading){  
            let orders = [];                    
            if(this.state.orders.length > 0){
                orders = this.state.orders.map(orderItem => {
                    return <OrderItem key={orderItem.id} orderItem={orderItem}/>
                });
            }
            ordersSection = (
                <div className={classes.Orders}>
                    {orders}
                </div>
            );
        }
        return (
            <div>
                <NotificationPopups notification={this.state.notification}/>
                {ordersSection}
            </div>
        );
    }
}

export default Orders;