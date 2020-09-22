import React from 'react';
import classes from "./NavItem.module.css";

export const NavItem = (props) => {
    return (
        <li className = {classes.NavItem}>
            <a 
                href = {props.link}
                className = {props.active ? classes.active : null}
            >
                {props.children}
            </a> 
        </li>
    )
}
export default NavItem;
