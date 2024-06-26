import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaEdit, FaTrashAlt } from 'react-icons/fa';

function PropertyItem({property, onEdit, onDelete}) {
    return (
            <Link to={`/property/${property._id}`} className="propertyItem__link">
                <div className="property__card">
                    {onEdit && (<Link to={`/edit/${property._id}`} className="property__body-edit"><FaEdit /></Link>)}
                    {onDelete && <FaTrashAlt className="property__body-delete" onClick={() => onDelete(property._id)} />}
                    <div className="property__image-container">

                        <img src={property.images[0]} alt="property" className="property__image" />
                    </div>
                    <div className="property__body">
                        <h3 className="property__body-title">{property.address}</h3>
                        <p className="property__body-type">{property.type.toLowerCase() === 'rent' ? "For Rent" : "For Sale"}</p>
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
                    </div>
                </div>
            </Link>
    )
}

export default PropertyItem;