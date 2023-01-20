import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';

function PropertyItem({property}) {
    return (
        <div className="property__card">
            <p className="property__body-type">{property.type.toLowerCase() === 'rent' ? "Rent" : "Sale"}</p>
            <div className="property__image-container">

                <img src={property.images[0]} alt="property" className="property__image" />
            </div>
            <div className="property__body">
                <h3 className="property__body-title">{property.address}</h3>
                <div>
                    <p className="property__body-icon"><FaBed /> {property.bedrooms > 1 ? `${property.bedrooms} Bedrooms` : '1 Bedroom'}</p>
                    <p className="property__body-icon"><FaBath /> {property.bathrooms > 1 ? `${property.bathrooms} Bathrooms` : '1 Bathroom'}</p>
                </div>
                <p className="property__body-price">${property.type.toLowerCase() === 'rent' ? 
                    `${property.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / Month` : 
                    property.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p className="property__body-date">Date posted: {new Date(property.createdAt).toLocaleDateString('en-us')}</p>
                <Link to={`/property/${property._id}`} className="btn property__body-btn">View Property</Link>
            </div>
        </div>
    )
}

export default PropertyItem;