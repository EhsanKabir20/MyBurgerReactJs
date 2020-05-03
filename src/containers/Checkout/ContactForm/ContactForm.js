import React, {Component} from 'react'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactForm.css'
import AxiosInstance from '../../../AxiosInstance'
import NotificationPopups from '../../../hoc/NotificationPopups/NotificationPopups'
import Button from '../../../components/UI/Button/Button'

class ContactForm extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Enter name',
                },
                validation:{
                    isRequired: true
                },
                value: '',
                valid: false,
                touched: false
            },
            email: {
                inputType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Enter email',
                },
                validation:{
                    isRequired: true
                },
                value: '',
                valid: false,
                touched: false
            },
            address: {
                inputType: 'textarea',
                inputConfig: {
                    type: 'textarea',
                    placeholder: 'Enter address'
                },
                value: '',
                validation:{
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                inputType: 'select',
                inputConfig:{
                    options: [
                        {text: 'cheapest', value:'cheapest'},
                        {text: 'fastest', value:'fastest'}
                    ]
                },                
                validation:{},
                value: 'cheapest',
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        isLoading: false,
        notification: null
    }

    inputChangedHandeler = (event, inputName) => {
        let enteredValue = event.target.value;
        let isInputValid = true;
        if(enteredValue.trim() === ""){
            isInputValid = false;
        }
        const updatedInput = {
            ...this.state.orderForm[inputName], 
            ...{
                value: enteredValue,
                valid: isInputValid,
                touched: true
            }
        };
        const updatedForm = {
            ...this.state.orderForm, 
            ...{
                [inputName]: updatedInput
            }
        };

        let isFormValid = true;
        for (let inputElement in updatedForm) {
            isFormValid = updatedForm[inputElement].valid && isFormValid;
        }
        this.setState({formIsValid: isFormValid, orderForm: updatedForm});
    }

    placeOrderHandeler = (event) =>{
        event.preventDefault();

        if(this.state.formIsValid){
            this.setState( { isLoading: true } );
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice,
                customer: {
                    name: this.state.orderForm.name.value,
                    address: this.state.orderForm.address.value,
                    email: this.state.orderForm.email.value
                },
                deliveryMethod: this.state.orderForm.deliveryMethod.value
            }
            let goToOrdersPage = this.props.goToOrdersPage;
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
                    setTimeout(function(){
                        goToOrdersPage();
                    },3000);
                })
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
                });
        }else{
            this.setState({
                notification: {
                    type: 'warning',
                    message: 'Please enter contact data!',
                    title: 'Error',
                    timeOut: 2000,
                    callback: () => {},
                    priority: true
                }
            });
        }
    }

    render(){
        let contentSection = <Spinner/>;
        if(!this.state.isLoading){
            let formInputs = [];
            for (let key in this.state.orderForm) {
                formInputs.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }
            contentSection = (
                <form method="Post">
                    <h3>Enter your Contact Data</h3>
                    {
                        formInputs.map((formElement, index) => (
                            <Input 
                                key={index} 
                                inputChanged={(event) => this.inputChangedHandeler(event, formElement.id)} 
                                nameOfInput={formElement.id} 
                                inputValue={formElement.config.value}
                                inputType={formElement.config.inputType}
                                isValid={formElement.config.valid}
                                touched={formElement.config.touched}
                                inputAtrributes={formElement.config.inputConfig}/>
                        ))
                    }
                    <br/>                    
                    <Button btnClicked={(event) => this.placeOrderHandeler(event)}>Place Order</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactForm}>
                <NotificationPopups notification={this.state.notification}/>
                { contentSection }
            </div>
        );
    }
}

export default ContactForm;