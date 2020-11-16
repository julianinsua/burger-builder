import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from "../DrawerToggle/DrawerToggle";

export const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle sideDrawerOpen={props.sideDrawerOpen} />

			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavItems isAuth={props.isAuth} />
			</nav>
		</header>
	);
};
export default Toolbar;
