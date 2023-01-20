import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import PropertyItem from '../components/PropertyItem';
import { getAllProperties, getFilteredProperties } from '../features/properties/propertySlice';
import Spinner from '../components/Spinner';

function Properties() {
    const { properties, isLoading, isError, message } = useSelector((state) => state.properties);
    const { filterType } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        filterType ? dispatch(getFilteredProperties(filterType)) : dispatch(getAllProperties())        
    }, [filterType])

    const handleRental = async () => {      
        navigate('/properties/Rent')
    }

    const handleSale = async () => {
        navigate('/properties/Sale')
    }

    if(isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="container">
            <header className="properties__head-container">
                <h2 className="properties__heading">Searching for: {filterType ? `Properties for ${filterType}` : 'All Properties'}</h2>
                <div>
                    <button className="btn properties__btn" onClick={handleRental}>Browse Rentals</button>
                    <button className="btn properties__btn" onClick={handleSale}>Browse Sale</button>
                </div>
            </header>

            <main>
                {properties.map((property) => (
                    <PropertyItem key={property._id} property={property} />
                ))}
            </main>
        </div>
    )
}

export default Properties;