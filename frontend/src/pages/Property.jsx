import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProperty } from '../features/properties/propertySlice';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaBed, FaBath } from 'react-icons/fa';
import { Loader } from '@googlemaps/js-api-loader';
import 'swiper/swiper-bundle.css';
import Footer from '../components/Footer';

function Property() {
  const { property, isError, isLoading } = useSelector(
    (state) => state.properties
  );
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({
    lat: 44,
    lng: -80,
  });

  const { propertyId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPropertyInfo = async () => {
      await dispatch(getProperty(propertyId));
      setLoading(false);
    };

    getPropertyInfo().catch((error) => console.log(error));
  }, [propertyId]);

  const loader = new Loader({
    apiKey: 'AIzaSyA0mCXusgXn5kQWE62ecdyL3ZU6TP44Koc',
    version: 'weekly',
  });

  const mapOptions = {
    center: {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    zoom: 12,
    mapId: 'MAP_ID',
  };

  loader
    .importLibrary('maps', 'marker')
    .then(async ({ Map }) => {
      const map = new Map(document.getElementById('map'), mapOptions);
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');
      new AdvancedMarkerElement({ map, position: mapOptions.center });
    })
    .catch((e) => console.log(e));

  if (isError) {
    return <h3>Something went wrong...</h3>;
  }

  if (loading || isLoading) {
    return <Spinner isLoading={loading || isLoading} />;
  }

  return (
    <div>
      <main>
        <div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            style={{ height: '60vh', width: 'auto' }}
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className='swiperSlideDiv'
                  style={{
                    background: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '100%',
                    width: 'auto',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='container property__container'>
          <div>
            <div className='property__info'>
              <div className='property__info--heading'>
                {property.type === 'rent' ? (
                  <p>
                    $
                    {property.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    / month
                  </p>
                ) : (
                  <p>
                    $
                    {property.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                )}
                <p>{property.address}</p>
              </div>
              <div>
                <div className='property__info--rooms'>
                  <div className='rooms--container'>
                    <p className='property__info--icons'>
                      <FaBed />{' '}
                      {property.bedrooms > 1
                        ? `${property.bedrooms} Bedrooms`
                        : '1 Bedroom'}
                    </p>
                    <p className='property__info--icons'>
                      <FaBath />{' '}
                      {property.bathrooms > 1
                        ? `${property.bathrooms} Bathrooms`
                        : '1 Bathroom'}
                    </p>
                  </div>
                </div>
              </div>
              <div className='property__info--title'>
                {property.squareFeet ? (
                  <p>
                    {property.squareFeet
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    ft&#xb2; lot
                  </p>
                ) : (
                  <p>Square footage is unavailable</p>
                )}
              </div>
              {property.description && (
                <div className='property__info--title'>
                  <h3 className='property__info--heading'>Overview:</h3>
                  <p>{property.description}</p>
                </div>
              )}
            </div>
            <div className='map_wrapper'>
              <div
                className='map'
                id='map'
                style={{ width: '100%', height: '100%' }}
              ></div>
            </div>
          </div>

          <Link
            to={`/contact?property=${property.address}`}
            state={{ email: property.email }}
            className='btn contact__btn'
          >
            Contact Realtor
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Property;
