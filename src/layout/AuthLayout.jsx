import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Loading from '../pages/Loading';
import { AuthContext } from '../provider/AuthProvider';

const AuthLayout = () => {
  // const { loading } = useContext(AuthContext);
  // if (loading) {
  //   return <Loading></Loading>;
  // }
    return (
        <>
        <header>
          <Navbar></Navbar>
        </header>
        <section>
          <Outlet></Outlet>
        </section>
        <footer>
          <Footer></Footer>
        </footer>
      </>
    );
};

export default AuthLayout;