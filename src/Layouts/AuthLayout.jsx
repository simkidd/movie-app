import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthHeader from '../components/header/AuthHeader'
import Footer from '../components/footer/Footer'

const AuthLayout = () => {
  return (
    <>
        <AuthHeader />
        <Outlet />
        <Footer />
    </>
  )
}

export default AuthLayout