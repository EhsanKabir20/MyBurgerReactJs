import React from "react"
import { NavLink } from 'react-router-dom';
import classes from "../NavigationItems/NavigationItems.css"

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>            
            <li className={classes.NavigationItem}>
                <NavLink to="/" exact activeClassName={classes.active}>Burger Builder</NavLink>                
            </li>
            <li className={classes.NavigationItem}>
                <NavLink to="/Orders" exact activeClassName={classes.active}>Orders</NavLink>                
            </li>
        </ul>
    );
}

export default NavigationItems;