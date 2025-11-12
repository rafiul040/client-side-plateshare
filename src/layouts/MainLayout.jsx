import React from 'react';
import Home from '../Pages/Home/Home';
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <header>
            <Navbar></Navbar>
            </header>
            

            <section>
                <Outlet></Outlet>
            </section>

            
                <Footer></Footer>
        </div>
    );
};

export default MainLayout;