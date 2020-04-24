import React, { Component } from 'react'
import Auxc from '../Auxc/Auxc'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from "./Layout.css"

class Layout extends Component {
    state = {
        isSidebarShown: false
    }

    hideSidebarHandeler = () => {
        this.setState({ isSidebarShown: false });
    }

    toggleSidebarHandeler = () => {
        this.setState( ( prevState ) => {
            return { isSidebarShown: !prevState.isSidebarShown };
        } );
    }
    
    render () {
        return (
            <Auxc>
                <Toolbar toggleSidebarClicked={this.toggleSidebarHandeler} />
                <SideDrawer
                    isSidebarShown={this.state.isSidebarShown}
                    hideSidebar={this.hideSidebarHandeler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxc>
        )
    }
};

export default Layout;