import React from 'react';
import Logo from "../../Logo/Logo";
import NavItems from "../../Navigation/NavItems/NavItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { Aux } from "../../../HOC/Aux"

export const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show = {props.open} clicked = {props.closed} />
            <div className = {attachedClasses.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />    
                </nav>            
            </div>
        </Aux>
    );
}