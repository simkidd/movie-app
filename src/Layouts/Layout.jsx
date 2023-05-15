import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ScrollToTop from '../components/buttons/ScrollToTop';

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
        <ScrollToTop />
    </>
  )
}

export default Layout