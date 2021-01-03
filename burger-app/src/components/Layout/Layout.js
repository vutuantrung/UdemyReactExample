import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';

function Layout(props) {
    return (
        <Auxiliary>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main>
                {props.children}
            </main>
        </Auxiliary>
    )
};

export default Layout;