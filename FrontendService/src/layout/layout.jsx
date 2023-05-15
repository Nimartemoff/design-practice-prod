import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Outlet } from "react-router-dom";

const Layout = (props) => {
    return (
      <>
        <Header Ai={props.Ai} Name={props.Name} Info={props.Info}/>
        <Outlet />
        <main>
          {props.children}
        </main>
        <Footer />
        
      </>
    )
  }
  
  export default Layout
  