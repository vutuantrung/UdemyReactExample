import React from 'react';
import classes from './Layout.module.css';
import Auxiliary from '../../hoc/Auxiliary';

function Layout(props) {
    return (
        <Auxiliary>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.content}>
                {props.children}
            </main>
        </Auxiliary>
    )
};

export default Layout;