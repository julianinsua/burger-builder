import React, { Component } from 'react'
import { Aux } from "../../HOC/Aux";
import { Burger } from "../../components/Burger/Burger/Burger";

export class BurgerBuilder extends Component {
    state = {

    }

    render() {
        return (
            <Aux>
                <Burger />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder
