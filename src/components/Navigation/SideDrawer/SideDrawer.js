import React from "react"
import Auxc from "../../../hoc/Auxc/Auxc"
import Backdrop from "../../UI/Backdrop/Backdrop"
import classes from "../SideDrawer/SideDrawer.css"
import Logo from "../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import BrandName from "../BrandName/BrandName"

const SideDrawer = (props) => {
    
    return (
        <Auxc>
            <Backdrop></Backdrop>
            <div className={[classes.SideDrawer, props.isSidebarShown ? classes.Open : classes.Close].join(" ")}>
                <div className={classes.SideDrawerHeader}>
                    <Logo></Logo>
                    <BrandName></BrandName>                        
                    <strong className={classes.SideDrawerCloseBtn} onClick={props.hideSidebar}>
                            <span>×</span>
                    </strong> 
                </div>
                <div className={classes.SideDrawerNavigations}>
                    <NavigationItems></NavigationItems>
                </div>
            </div>
        </Auxc>
    );
}

export default SideDrawer;