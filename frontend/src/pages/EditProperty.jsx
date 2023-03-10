import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, updateProperty } from '../features/properties/propertySlice';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

function EditProperty() {
    const [formData, setFormData] = useState({
        type: 'rent',
        address: '',
        price: 0,
        squareFeet: 0,
        bedrooms: 1,
        bathrooms: 1,
        description: '',
    });

    const { type, address, price, squareFeet, bedrooms, bathrooms, description } = formData;

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

                        <button className="btn property__form--btn">Update</button>
                    </form>

                </main>
            </div>
            <Footer customClass={'footer__bottom'}/>
        </>
    )
}

export default EditProperty;