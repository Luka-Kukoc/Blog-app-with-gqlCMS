import React from 'react'
import {Header} from './' 

export const Layout = ({ children }) => {
  return (
    <>
    <Header/>
    {children}
    </>
    )
}
