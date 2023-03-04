import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaBars } from 'react-icons/fa';


function Navbar() {

    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
    };

    const openNavMenu = () => {
        const navbarList = document.querySelector(".navbar__list");
        navbarList.classList.toggle('show');
    };

    const closeNavMenu = () => {
        const navbarList = document.querySelector(".navbar__list")
        navbarList.classList.toggle('show');
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <FaBars className="navbar__menu" onClick={openNavMenu} />
                {user ? (
                    <ul className="navbar__list">
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/' className="navbar__link">Home</Link></li>
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/properties' className="navbar__link">Properties</Link></li>
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/dashboard' className="navbar__link">Dashboard</Link></li>
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/' className="navbar__link" onClick={onLogout} >Logout</Link></li>
                    </ul>
                ) : (<ul className="navbar__list">
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/' className="navbar__link" >Home</Link></li>
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/properties' className="navbar__link" >Properties</Link></li>
                        <li className="navbar__item" onClick={closeNavMenu}><Link to='/login' className="navbar__link" >Login</Link></li>
                    </ul>)}
            </div>

        </nav>

    )
}

export default Navbar;