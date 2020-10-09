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
				validation: {
					required: true,
				},
				valid: false,
			},
			street: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Street" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
			},
			zipCode: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Zip Code" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
			},
			country: {
				elementType: "input",
				elementConfig: { type: "text", placeholder: "Your Country" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
			},
			email: {
				elementType: "input",
				elementConfig: { type: "email", placeholder: "Your e-Mail" },
				value: "",
				validation: {
					required: true,
				},
				valid: false,
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
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
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

	checkValidity = (value, rules) => {
		let isValid = false;
		if (rules.required) {
			isValid = value.trim() !== "";
		}

		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);

		updatedOrderForm[inputIdentifier] = updatedFormElement;
		console.log(updatedFormElement);
		this.setState({ orderForm: updatedOrderForm });
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
			<form onSubmit={this.orderhandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
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
