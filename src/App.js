import React, { Component } from "react";
import Layout from "./containers/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import { asyncComponent } from "./HOC/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
	return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
	return import("./containers/Auth/Auth");
});

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		let routes = (
			<Switch>
				<Route path='/auth' exact component={asyncAuth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path='/orders' component={asyncOrders} />
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/logout' exact component={Logout} />
					<Route path='/auth' exact component={asyncAuth} />
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to='/' />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
