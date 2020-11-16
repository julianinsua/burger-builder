import React, { Component } from "react";
import { Aux } from "../../HOC/Auxiliar";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { SideDrawer } from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

export class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	SideDrawerOpenHandler = () => {
		this.setState({ showSideDrawer: true });
	};

	render() {
		return (
			<Aux>
				<Toolbar
					sideDrawerOpen={this.SideDrawerOpenHandler}
					isAuth={this.props.isAuth}
				/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
					isAuth={this.props.isAuth}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
