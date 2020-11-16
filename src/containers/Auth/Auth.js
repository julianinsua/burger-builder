import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/checkValidity";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: { type: "email", placeholder: "Your email adress" },
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: { type: "password", placeholder: "Password" },
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	};

	componentDidMount() {
		if (!this.props.building && this.props.authRedirect !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			}),
		});

		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				invalid={!formElement.config.valid}
				touched={formElement.config.touched}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMsg = null;
		if (this.props.error) {
			errorMsg = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuth) {
			authRedirect = <Redirect to={this.props.authRedirect} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMsg}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType='Success'>SUBMIT</Button>
				</form>
				<Button btnType='Danger' clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
				</Button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthredirectPath("/")),
	};
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirect: state.auth.authRedirectPath,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
