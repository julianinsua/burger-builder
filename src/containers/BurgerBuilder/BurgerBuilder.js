import React, { Component } from "react";
import { Aux } from "../../HOC/Auxiliar";
import Burger from "../../components/Burger/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/WithErrorHandler";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
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
		let burger = this.props.error ? (
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
		error: state.error
	};
};

const mapDispatchTpProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchTpProps
)(withErrorHandler(BurgerBuilder, axios));
