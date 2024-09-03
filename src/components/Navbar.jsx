import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BankContext from '../context/BankContext';

const Navbar = () => {
    const { isAuthenticated, setToken, setIsAuthenticated } = useContext(BankContext)
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        localStorage.removeItem('token')
        setToken("")
        setIsAuthenticated(false)
        navigate('/login')
        handleMenuToggle();
    }
    return (
        <>
            <div className="container navBar">
                <nav>
                    <Link to={'/'} className="left">
                        <i className="fa-solid fa-gem"></i>
                        <h5>ApnaBank</h5>
                    </Link>
                    {isAuthenticated && (
                        <div className="mid">
                            <ul>
                                <Link to={'/'} className='li'>Home</Link>
                                <Link to={'/deposit'} className='li'>Deposit</Link>
                                <Link to={'/withdraw'} className='li'>Withdraw</Link>
                                <Link to={'/profile'} className='li'>Profile</Link>
                            </ul>
                        </div>
                    )}
                    <div className="right">
                        {!isAuthenticated && (
                            <>
                                <Link to={'/createaccount'} className='btn'>Create Account</Link>
                                <Link to={'/login'} className='btn login'>Login</Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Link to={'/'} className='btn logout' onClick={logout}>Logout</Link>
                            </>
                        )}
                        <button className='btn' onClick={handleMenuToggle}>
                            <img src="/menu.png" alt="menu-img" />
                        </button>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className="menu">
                        <ul>
                            {isAuthenticated && (
                                <>
                                    <Link to={'/'} className='li' onClick={handleMenuToggle}>Home</Link>
                                    <Link to={'/deposit'} className='li' onClick={handleMenuToggle}>Deposit</Link>
                                    <Link to={'/withdraw'} className='li' onClick={handleMenuToggle}>Withdraw</Link>
                                    <Link to={'/profile'} className='li' onClick={handleMenuToggle}>Profile</Link>
                                    <Link to={'/'} className='btn logoutm' onClick={logout}>Logout</Link>
                                </>
                            )}
                            {!isAuthenticated && (
                                <>
                                    <li className="li msign" onClick={handleMenuToggle}><Link to={'/createaccount'} className='btn'>Create Account</Link></li>
                                    <li className='li mli' onClick={handleMenuToggle}><Link to={'/login'} className='btn loginm'>Login</Link></li>
                                </>
                            )}


                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar