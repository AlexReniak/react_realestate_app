import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, updateProperty } from '../features/properties/propertySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@googlemaps/js-api-loader';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

function EditProperty() {
    const [formData, setFormData] = useState({
        type: 'rent',
        address: '',
        city: '',
        state: '',
        postcode: '',
        coordinates: { lat: null, lng: null},
        price: 0,
        squareFeet: 0,
        bedrooms: 1,
        bathrooms: 1,
        description: '',
    });

    const { type, address, city, state, postcode, price, squareFeet, bedrooms, bathrooms, description } = formData;

    const { property, isLoading, isError, message, isSuccess } = useSelector((state) => state.properties)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        if(isError) {
            toast.error(isError);
        }

        dispatch(getProperty(params.id))

        if(isSuccess) {
            setFormData({...property})
        }

        initAutocomplete();
        
    }, [isSuccess, params.id])

    const onChange = (e) => {
        let boolean = null;

        if (e.target.value === 'true') {
            boolean = true;
        }

        if (e.target.value === 'false') {
            boolean = false;
        }

        if(e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }

        if(!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value   
            }))
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const propertyData = new FormData(document.querySelector('.property__form'))

        
        const images = JSON.stringify({...property.images})

        propertyData.append('images', images);

        const response = await dispatch(updateProperty({propertyData, propertyId: params.id}));

        setTimeout(() => {
            navigate(`/property/${response.payload._id}`)
        }, 1000)
    }

    const loader = new Loader({
        apiKey: 'AIzaSyA0mCXusgXn5kQWE62ecdyL3ZU6TP44Koc',
        version: "weekly",
    });

    let autocomplete;
    let addressField;
    let postalField;

    const initAutocomplete = () => {
        addressField = document.getElementById('address');
        postalField = document.getElementById('postcode');

        loader
            .importLibrary('places')
            .then(({ Autocomplete }) => {
                autocomplete = new Autocomplete(addressField, {
                    componentRestrictions: { country: ['us'] },
                    fields: ['address_components', 'geometry'],
                    types: ['address'], 
                });
                addressField.focus();
                autocomplete.addListener("place_changed", fillInAddress);
            })
            .catch(error => console.log(error));
        }

    function fillInAddress() {
        const place = autocomplete.getPlace();

        let address1 = "";
        let postcode = "";

        setFormData((prevState) => ({
            ...prevState,
            coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
        }));

        for (const component of place.address_components) {

            const componentType = component.types[0];
        
            switch (componentType) {
            case "street_number": {  
                address1 = `${component.long_name} ${address1}`;
                break;
            }
            case "route": {
                address1 += component.short_name;
                break;
            }
            case "city":
                document.getElementById("city").value = component.long_name;
                break;
            case "state":
                document.getElementById('state').value = component.long_name;
                break; 
            case "postal_code":
                postcode = `${component.long_name}${postcode}`;
                break;
            }
            addressField.value = address1;
            postalField.value = postcode;
        }
    }

    if(isLoading) {
        return (
            <Spinner isLoading={isLoading} />
        )
    }

    return (
        <>
            <div className='container'>
                <header>
                    <h3 className="property__form--heading">Enter the information about the property</h3>
                </header>

                <main>
                    <form onSubmit={onSubmit} className="property__form" encType='multipart/form-data'>
                        <div className='property__form--control'>
                            <p>For sale or rent?</p>
                            <div>
                                <label htmlFor='type'>Sale</label>
                                <input name="type" id="type" className='property__form--radio radio-btn-sale' type="radio" value='Sale' onChange={onChange} 
                                defaultChecked={type === 'Sale' ? true : false}
                                />
                            </div>
                            <div>
                                <label htmlFor='type'>Rent</label>
                                <input name="type" id="type" className='property__form--radio radio-btn-rent' type="radio" value='Rent' onChange={onChange} 
                                defaultChecked={type === 'Rent' ? true : false}
                                />
                            </div>
                        </div>
    
                        <div className='property__form--control'>
                            <input name="address" id="address" value={address} className="property__formInput" autoComplete='off' onChange={onChange} />
                            <span className="form__label">Address</span>
                        </div>
                        <div className='property__form--control'>
                            <input name="city" id="city" value={city} className="property__formInput" autoComplete='off' onChange={onChange} />
                            <span className="form__label">City</span>
                        </div>
                        <div className='property__form--control'>
                            <input name="state" id="state" value={state} className="property__formInput" autoComplete='off' onChange={onChange} />
                            <span className="form__label">State</span>
                        </div>
                        <div className='property__form--control'>
                            <input name="postcode" id="postcode" value={postcode} className="property__formInput" autoComplete='off' onChange={onChange} />
                            <span className="form__label">Postal code</span>
                        </div>
                        <div className='property__form--control'>
                            <span className="input--dollar">
                                <input name="price" id="price" type="number" className="property__formInput" value={price} onChange={onChange} />
                                <span className="form__label-price">{type === 'Rent' ? 'Price (per month)' : 'Price'}</span> 
                            </span>
                            
                        </div>
                        <div className='property__form--control'>
                            <input name="squareFeet" id="squareFeet" className="property__formInput" value={squareFeet} onChange={onChange} />
                            <span className="form__label">Square feet (optional)</span>
                        </div>
                        <div className='property__form--control'>
                            <input name="bedrooms" id="bedrooms" type="number" className="property__formInput" value={bedrooms} onChange={onChange} />
                            <span className="form__label">Bedrooms</span>
                        </div>
                        <div className='property__form--control'>
                            <input name="bathrooms" id="bathrooms" type="number" className="property__formInput" value={bathrooms} onChange={onChange} />
                            <span className="form__label">Bathrooms</span>
                        </div>
                        <div className='property__form--control form--textarea'>
                            <textarea name="description" id="description" className="property__form--textarea" value={description} onChange={onChange} />
                            <span className="form__label">Description (optional)</span>
                        </div>

                        <div className="property__form--control">
                            <label htmlFor="images" className='property__form--label btn'>Upload Images</label>
                            <input name="images" id="images" type="file" className='property__formImages' accept='.jpg,.jpeg' multiple onChange={onChange} />
                        </div>

                        <button className="btn property__form--btn">Update</button>
                    </form>

                </main>
            </div>
            <Footer/>
        </>
    )
}

export default EditProperty;