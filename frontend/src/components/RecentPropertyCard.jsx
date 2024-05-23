import { Link } from 'react-router-dom';

const RecentPropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property._id}`} className='recent-property__link'>
      <div className='recent-property__card'>
        <div className='recent-property__image-container'>
          <img
            src={property.images[0]}
            alt='property'
            className='recent-property__image'
          />
        </div>
        <div className='recent-property__body'>
          <h3 className='recent-property__title'>{property.address}</h3>
          <p className='recent-proprty__price'>${property.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecentPropertyCard;
