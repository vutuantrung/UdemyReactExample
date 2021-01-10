import React, { useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auxiliary from '../Auxiliary/Auxiliary';
import { connect } from 'react-redux';

function Layout(props) {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);