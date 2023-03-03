import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer__container">
            <ul className="footer__list">
                <li className="footer__item"><Link to='/' className="footer__link">Home</Link></li>
                <li className="footer__item"><Link to='/properties' className="footer__link">Properties</Link></li>
            </ul>
            <p className="footer__text">&#169; React Real Estate</p>
        </footer>
    )
}

export default Footer;