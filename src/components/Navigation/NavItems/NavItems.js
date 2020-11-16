import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "../Navitem/NavItem";

export const NavItems = (props) => {
	return (
		<ul className={classes.NavItems}>
			<NavItem link='/'>Burger Builder</NavItem>
			{props.isAuth ? <NavItem link='/orders'>Orders</NavItem> : null}
			{props.isAuth ? (
				<NavItem link='/logout'>Logout</NavItem>
			) : (
				<NavItem link='/auth'>Authenticate</NavItem>
			)}
		</ul>
	);
};

export default NavItems;
