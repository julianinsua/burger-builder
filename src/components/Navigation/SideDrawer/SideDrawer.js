import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../../Navigation/NavItems/NavItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { Aux } from "../../../HOC/Auxiliar";

export const SideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavItems isAuth={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};
