import React from 'react';
import MainHeader from './mainHeader';

const Layout = (props) => {
    return (
        <>
            <MainHeader></MainHeader>
            <main>{props.children}</main>
        </>
    );
};

export default Layout;