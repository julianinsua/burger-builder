import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";

export default class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your name" },
				value: "",
			},
			street: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Street" },
				value: "",
			},
			zipCode: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Zip Code" },
				value: "",
			},
			country: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your Country" },
				value: "",
			},
			email: {
				elementType: "input",
				elementConfig: { type: "email", placeholder: "Your e-Mail" },
				value: "",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "",
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
		};
		axios
			.post("/orders.json", order)
			.then((response) => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch((error) => {
				this.setState({ loading: false, purchasing: false });
			});
	};

	render() {
		const formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
					/>
				))}
				<Button btnType='Success' clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}
