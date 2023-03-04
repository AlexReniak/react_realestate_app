import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/Header";
import Card from "../components/Card";
import { ReactComponent as RentIcon} from '../assets/icons/rent.svg';
import { ReactComponent as SellIcon} from '../assets/icons/sell.svg';
import { ReactComponent as SearchIcon} from '../assets/icons/search.svg';
import Footer from '../components/Footer';

function Home() {

    const navigate = useNavigate();

    const onClick = (param) => {
        if(param) {
            navigate(`/properties/${param}`)
        } else {
            navigate('/properties')
        }
    }

    return (
        <>
            <Header />

            <h2 className="home__heading">Looking to Buy or Rent?</h2>

            <div className="home__container">

                <Card customClassName={"home__card"} heading={<SellIcon className="home__card--icon" />} onClick={() => onClick('Sale')}>
                    <p className="home__card--text">Buy</p>
                    <p className="home__card--sub">Browse a selection of homes with detailed descriptions giving you an informed buying experience.</p>
                </Card>

                <Card customClassName={"home__card"} heading={<RentIcon className="home__card--icon" />} onClick={() => onClick('Rent')}>
                    <p className="home__card--text">Rent</p>
                    <p className="home__card--sub">Browse all homes and apartments for rent, allowing you to find the right place for the right price.</p>
                </Card>

                <Card customClassName={"home__card"} heading={<SearchIcon className="home__card--icon" />} onClick={() => onClick()}>
                    <p className="home__card--text">View all Properties</p>
                    <p className="home__card--sub">Search all homes and apartments, either for rent or for sale.</p>
                </Card>

            </div>

            <hr className="home__line"/>
            
            <h2 className="home__heading">Looking to sell or rent?</h2>

            <p className="home__text">Login or create an account to post your listing</p>

            <div className="home__btn--container">
                <Link to="/login" className="btn home__btn">Login</Link>
                <Link to="/sign-up" className="btn home__btn">Sign Up</Link>
            </div>
            <Footer />
        </>
    )
}

export default Home;