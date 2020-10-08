import React, { Component } from "react";
import Order from "./Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/WithErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		loading: false,
	};

	componentDidMount() {
		axios
			.get("/orders.json")
			.then((res) => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key,
					});
				}
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map((e) => (
					<Order ingredients={e.ingredients} price={e.price} key={e.id} />
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
