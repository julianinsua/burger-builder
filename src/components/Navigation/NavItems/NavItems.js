import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "../Navitem/NavItem";

export const NavItems = (props) => {
	return (
		<ul className={classes.NavItems}>
			<NavItem link='/'>Burger Builder</NavItem>

			<NavItem link='/orders'>Orders</NavItem>
		</ul>
	);
};

export default NavItems;
