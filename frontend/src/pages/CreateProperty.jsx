import { useState } from 'react';
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
        description: ''
    });

    const { type, address, price, squareFeet, bedrooms, bathrooms, description } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value   
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // setLoading(true);


    }

    if(loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className='container'>
            <header>
                <h3>Enter the information about your property</h3>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor='type'>Sale / Rent</label>
                        <input name="type" id="type" type="radio" value="Sale" onChange={onChange} />
                        <input name="type" id="type" type="radio" value="Rent" onChange={onChange} />
                    </div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <input name="address" id="address" value={address} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input name="price" id="price" value={price} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor="squareFeet">Square Feet (optional)</label>
                        <input name="squareFeet" id="squareFeet" value={squareFeet} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor="bedrooms">Bedrooms</label>
                        <input name="bedrooms" id="bedrooms" value={bedrooms} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor="bathrooms">Bathrooms</label>
                        <input name="bathrooms" id="bathrooms" value={bathrooms} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor='description'>Description (optional)</label>
                        <textarea name="description" id="description" value={description} onChange={onChange} />
                    </div>
                    <button className="btn">Create</button>
                </form>

            </main>
        </div>
    )
}

export default CreateProperty;