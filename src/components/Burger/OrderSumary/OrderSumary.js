import React, { Component } from 'react'
import { Aux } from "../../../HOC/Auxiliar";
import Button from "../../UI/Button/Button";

class  OrderSumary extends Component {
        
    render () {
        const ingredientSumary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
            <li key = {igKey}>
                <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        );
        });


        return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger whit the following ingredients:</p>
            <ul>
                {ingredientSumary}
            </ul>
            <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType = 'Danger' clicked = {this.props.cancelPurchase}>CANCEL</Button>
            <Button btnType = 'Success'clicked = {this.props.continuePurchase}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSumary;
