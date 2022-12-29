import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


function Navbar() {

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {user ? (
                    <ul>
                        <li className="navbar__item"><Link to='/' className="navbar__link" >Home</Link></li>
                        <li className="navbar__item"><Link to='/properties' className="navbar__link" >Properties</Link></li>
                        <li className="navbar__item"><Link to='/dashboard' className="navbar__link" >Dashboard</Link></li>
                        <li className="navbar__item"><Link to='/' className="navbar__link" onClick={onLogout} >Logout</Link></li>
                    </ul>
                ) : (<ul>
                        <li className="navbar__item"><Link to='/' className="navbar__link" >Home</Link></li>
                        <li className="navbar__item"><Link to='/properties' className="navbar__link" >Properties</Link></li>
                        <li className="navbar__item"><Link to='/login' className="navbar__link" >Login</Link></li>
                    </ul>)}
            </div>

        </nav>

    )
}

export default Navbar;