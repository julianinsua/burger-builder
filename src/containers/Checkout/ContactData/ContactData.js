import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

export default class ContactData extends Component {
	state = {
		name: "",
		email: "",
		adress: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: "Julian",
				adress: {
					street: "123 fake st.",
					zipCode: "1234",
					country: "Achoo",
				},
				email: "test@test.tst",
			},
			deliveryMethod: "fastest",
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
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<Input
						inputType='input'
						type='text'
						name='name'
						placeholder='Your Name'
					/>
					<Input
						inputType='input'
						type='email'
						name='email'
						placeholder='Your email'
					/>
					<Input
						inputType='input'
						type='text'
						name='street'
						placeholder='Your street'
					/>
					<Input
						inputType='input'
						type='text'
						name='postalCode'
						placeholder='Your postal code'
					/>
					<Button btnType='Success' clicked={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
	}
}
