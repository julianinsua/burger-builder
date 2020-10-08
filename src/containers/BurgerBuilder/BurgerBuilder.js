import React, { Component } from "react";
import { Aux } from "../../HOC/Auxiliar";
import Burger from "../../components/Burger/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/WithErrorHandler";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get("https://burger-builder-4ffc3.firebaseio.com/ingredients.json")
			.then((response) => {
				this.setState({ ingredients: response.data });
			})
			.catch((error) => {
				this.setState({ error: true });
			});
	}

	addIngredientHandler = (type) => {
		const updateCount = this.state.ingredients[type] + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updateCount;

		const PriceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];

		this.setState({
			totalPrice: PriceAddition,
			ingredients: updatedIngredients,
		});
		this.updatePurchasehandler(updatedIngredients);
	};
	removeIngredientHandler = (type) => {
		const updateCount = this.state.ingredients[type] - 1;
		if (updateCount < 0) {
			return;
		}
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updateCount;

		const PriceAddition = this.state.totalPrice - INGREDIENT_PRICES[type];

		this.setState({
			totalPrice: PriceAddition,
			ingredients: updatedIngredients,
		});
		this.updatePurchasehandler(updatedIngredients);
	};

	updatePurchasehandler(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	purchaseHandler = () => {
		const shouldPurchase = this.state.purchasing;
		this.setState({ purchasing: !shouldPurchase });
	};

	continuePurchaseHandler = () => {
		const queryParams = [];

		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					"=" +
					encodeURIComponent(this.state.ingredients[i])
			);
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join("&");

		this.props.history.push({
			pathname: "/checkout",
			search: "?" + queryString,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};

		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSumary = null;
		let burger = this.state.error ? (
			<p>
				Ah-ah-ah, you didn't say the magic word... ingredients couldn't be
				loaded
			</p>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						clicked={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSumary = (
				<OrderSumary
					ingredients={this.state.ingredients}
					cancelPurchase={this.purchaseHandler}
					continuePurchase={this.continuePurchaseHandler}
					price={this.state.totalPrice}
				/>
			);
		}

		if (this.state.loading) {
			orderSumary = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing}>{orderSumary}</Modal>
				<Backdrop show={this.state.purchasing} clicked={this.purchaseHandler} />
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
