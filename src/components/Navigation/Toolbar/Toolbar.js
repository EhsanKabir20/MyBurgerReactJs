import React from "react"
import ToggleIcon from "../ToggleIcon/ToggleIcon"
import Logo from "../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import BrandName from "../BrandName/BrandName"
import classes from "../Toolbar/Toolbar.css"
import appClasses from "../../../App.css"

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={appClasses.DisplayFlex}>
                <Logo></Logo>
                <BrandName></BrandName>                
            </div>
            <ToggleIcon toggleSidebar={props.toggleSidebarClicked}></ToggleIcon>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar;