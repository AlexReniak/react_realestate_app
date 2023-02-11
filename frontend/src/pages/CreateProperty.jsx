import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProperty, } from '../features/properties/propertySlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function CreateProperty() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'rent',
        address: '',
        price: 0,
        squareFeet: 0,
        bedrooms: 1,
        bathrooms: 1,
        description: '',
        images: {}
    });

    const { type, address, price, squareFeet, bedrooms, bathrooms, description, images } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        
        const response = await dispatch(createProperty(propertyData));

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate(`/property/${response.payload._id}`)
        }, 1000)
    }

    if(loading) {
        return (
            <Spinner isLoading={loading} />
        )
    }

    return (
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
                            <input name="type" id="type" className='property__form--radio' type="radio" value="Sale" onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor='type'>Rent</label>
                            <input name="type" id="type" className='property__form--radio' type="radio" value="Rent" onChange={onChange} />
                        </div>
                    </div>
 
                    <div className='property__form--control'>
                        <label htmlFor="address" className='property__form--label'>Address</label>
                        <input name="address" id="address" value={address} className="property__formInput" onChange={onChange} />
                    </div>
                    <div className='property__form--control'>
                        <label htmlFor="price" className='property__form--label'>{type === 'Rent' ? 'Price (per month)' : 'Price'}</label>
                        <span className="input--dollar">
                            <input name="price" id="price" type="number" className="property__formInput" value={price} onChange={onChange} />  
                        </span>
                        
                    </div>
                    <div className='property__form--control'>
                        <label htmlFor="squareFeet" className='property__form--label'>Square Feet (optional)</label>
                        <input name="squareFeet" id="squareFeet" className="property__formInput" value={squareFeet} onChange={onChange} />
                    </div>
                    <div className='property__form--control'>
                        <label htmlFor="bedrooms" className='property__form--label'>Bedrooms</label>
                        <input name="bedrooms" id="bedrooms" type="number" className="property__formInput" value={bedrooms} onChange={onChange} />
                    </div>
                    <div className='property__form--control'>
                        <label htmlFor="bathrooms" className='property__form--label'>Bathrooms</label>
                        <input name="bathrooms" id="bathrooms" type="number" className="property__formInput" value={bathrooms} onChange={onChange} />
                    </div>
                    <div className='property__form--control form--textarea'>
                        <label htmlFor='description' className='property__form--label'>Description (optional)</label>
                        <textarea name="description" id="description" className="property__form--textarea" value={description} onChange={onChange} />
                    </div>

                    <div className="property__form--control">
                        <label htmlFor="images" className='property__form--label btn'>Upload Images</label>
                        <input name="images" id="images" type="file" className='property__formImages' accept='.jpg,.jpeg' multiple onChange={onChange} />
                    </div>

                    <button className="btn property__form--btn">Create</button>
                </form>

            </main>
        </div>
    )
}

export default CreateProperty;