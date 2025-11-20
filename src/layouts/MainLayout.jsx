
import Navbar from '../../src/components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            
            <Navbar></Navbar>

            <section>
                <Outlet></Outlet>
            </section>

            
                <Footer></Footer>
        </div>
    );
};

export default MainLayout;