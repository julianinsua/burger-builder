import React, { Component } from 'react';
import { Aux } from "../../HOC/Auxiliar";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { SideDrawer } from "../../components/Navigation/SideDrawer/SideDrawer"

export class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    SideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }
    
    render () {
        return (
            <Aux>
                <Toolbar sideDrawerOpen = {this.SideDrawerOpenHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler} />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

