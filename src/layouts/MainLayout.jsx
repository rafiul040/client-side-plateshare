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
            {/* <main>
            <Home></Home>
            </main> */}

            <section>
                <Outlet></Outlet>
            </section>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;