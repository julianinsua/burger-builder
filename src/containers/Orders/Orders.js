import React, { Component } from "react";
import Order from "./Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/WithErrorHandler";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((e) => (
				<Order ingredients={e.ingredients} price={e.price} key={e.id} />
			));
		}
		return <div>{orders}</div>;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId)),
	};
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
