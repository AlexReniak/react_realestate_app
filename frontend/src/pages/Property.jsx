import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProperty} from '../features/properties/propertySlice';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaBed, FaBath } from 'react-icons/fa';


function Property() {
    const { property, isError, isLoading } = useSelector((state) => state.properties);
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    const { propertyId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        
        const getPropertyInfo = async () => {
            await dispatch(getProperty(propertyId));
            setLoading(false);
        }

        getPropertyInfo()
            .catch((error) => console.log(error));

    }, [propertyId]);
    
    if(isError) {
        return <h3>Something went wrong...</h3>
    }

    if(loading || isLoading) {
        return (
            <Spinner />

        )
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
                        style={{height: '60vh', width: 'auto'}}
                    >
                        {property.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="swiperSlideDiv"
                                    style={{
                                        background: `url(${image})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        height: '100%',
                                        width: 'auto'
                                    }}
                                >
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="container">
                    <div className="property__info">
                        <div className="property__info--title">
                            <p>{property.address}</p>
                        </div>
                        <div>
                            <div className="property__info--rooms">
                                <p className="property__info--icons"><FaBed /> {property.bedrooms > 1 ? `${property.bedrooms} Bedrooms` : '1 Bedroom'}</p>
                                <p className="property__info--icons"><FaBath /> {property.bathrooms > 1 ? `${property.bathrooms} Bathrooms` : '1 Bathroom'}</p>
                            </div>
                        </div>
                        <div>
                            {property.squareFeet ? (
                                <p>{property.squareFeet
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                } ft&#xb2;</p>
                            ) : (
                                <p>Square footage is unavailable</p>
                            )}
                        </div>
                        {property.description && (
                            <div>
                                <p>{property.description}</p>
                            </div>
                        )}
                        <div>
                            {property.type === 'rent' ? (
                                <p>${property.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / month</p>
                            ) : (
                                <p>${property.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </p>
                            )}
                        </div>

                    {property.user === user._id && (
                        <Link
                            to={`/contact?property=${property.address}`}
                            state={{ email: user.email }}
                            className="btn contact__btn"
                        >
                            Contact Realtor
                        </Link>
                    )}

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Property;