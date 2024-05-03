import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { ReactComponent as RentIcon } from '../assets/icons/rent.svg';
import { ReactComponent as SellIcon } from '../assets/icons/sell.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import Footer from '../components/Footer';
import RecentProperties from '../components/RecentProperties';

function Home() {
  const navigate = useNavigate();

  const onClick = (param) => {
    if (param) {
      navigate(`/properties/${param}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <>
      <Header />
      <section className='container cta__subheading'>
        <div className='cta-text'>
          <h2>Find your dream home with us today</h2>
        </div>
        <div className='cta__btn-group'>
          <p className='cta__btn-text'>
            Discover a wide range of properties today.
          </p>
          <div className='cta__btn-container'>
            <button onClick={() => onClick('Sale')} className='btn cta-btn'>
              Buy
            </button>
            <button onClick={() => onClick('Rent')} className='btn cta-btn'>
              Rent
            </button>
          </div>
        </div>
      </section>

      <hr className='home__line' />

      <section className='container home__info'>
        <div className='home__info-text-card'>
          <h2 className='home__info-heading'>
            Discover a wide selection of properties on our real estate platform
          </h2>
          <p className='home__info-text'>
            With our user-friendly interface, finding your dream property has
            never been easier. Browse through a wide selection of listings and
            filter your search to match your needs
          </p>
        </div>
        <div className='home__info-cards'>
          <div className='home__info-card'>
            <h4 className='home__info-card-title'>
              <SearchIcon className='home__icon' />
            </h4>
            <p className='home__info-card-text'>
              Browse through a selection of properties and find the perfect home
              for you and your family.
            </p>
          </div>
          <div className='home__info-card'>
            <h4 className='home__info-card-title'>
              <SellIcon className='home__icon' />
            </h4>
            <p className='home__info-card-text'>
              Get your property noticed by interested buyers and sell your home
              quickly and effertlessly.
            </p>
          </div>
          <div className='home__info-card'>
            <h4 className='home__info-card-title'>
              <RentIcon className='home__icon' />
            </h4>
            <p className='home__info-card-text'>
              List your property and connect with potential tenants looking for
              a place to rent.
            </p>
          </div>
        </div>
      </section>

      <hr className='home__line' />

      <RecentProperties />

      <hr className='home__line' />

      <p className='home__text'>
        Looking to sell or rent your property? Sign up or login to get started.
      </p>

      <div className='home__btn--container'>
        <Link to='/sign-up' className='btn home__btn'>
          Sign Up
        </Link>
        <Link to='/login' className='btn home__btn'>
          Login
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Home;
