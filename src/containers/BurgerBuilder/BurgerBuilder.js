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
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		// axios
		// 	.get("https://burger-builder-4ffc3.firebaseio.com/ingredients.json")
		// 	.then((response) => {
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ error: true });
		// 	});
	}

	updatePurchasehandler(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0 ;
	}

	purchaseHandler = () => {
		const shouldPurchase = this.state.purchasing;
		this.setState({ purchasing: !shouldPurchase });
	};

	continuePurchaseHandler = () => {
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
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

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchasehandler(this.props.ings)}
						clicked={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSumary = (
				<OrderSumary
					ingredients={this.props.ings}
					cancelPurchase={this.purchaseHandler}
					continuePurchase={this.continuePurchaseHandler}
					price={this.props.price}
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

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};

const mapDispatchTpProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				ingredientName: ingName,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchTpProps
)(withErrorHandler(BurgerBuilder, axios));
