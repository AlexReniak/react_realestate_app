import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <ul className="navbar__list">
                    <li className="navbar__item"><Link to='/' className="navbar__link" >Home</Link></li>
                    <li className="navbar__item"><Link to='/listings' className="navbar__link" >Listings</Link></li>
                    <li className="navbar__item"><Link to='/login' className="navbar__link" >Login</Link></li>
                    {/* Add links to dashboard and profile if user is authenticated */}
                </ul>
            </div>

        </nav>

    )
}

export default Navbar;