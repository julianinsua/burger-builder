import React from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

export const NavItem = (props) => {
	return (
		<li className={classes.NavItem}>
			<NavLink exact to={props.link} activeClassName={classes.active}>
				{props.children}
			</NavLink>
		</li>
	);
};
export default NavItem;
