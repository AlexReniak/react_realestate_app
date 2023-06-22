import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropertyItem from '../components/PropertyItem';
import { getUserProperties, deleteProperty, reset } from '../features/properties/propertySlice';
import Spinner from '../components/Spinner';
import { Link, redirect } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

function Dashboard() {

    const { properties, isLoading, isError, isSuccess, message } = useSelector(state => state.properties);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {

        if(!user) {
            redirect('/login');
        }

        if(isError) {
            toast.error(isError);
        }

        dispatch(getUserProperties());

        return () => {
            if(isSuccess) {
                dispatch(reset());
            }
        }
    }, [isSuccess, dispatch]);

    if(isLoading) {
        return (
            <Spinner isLoading={isLoading} />
        )
    };

    const onDelete = (propertyId) => {
        if(window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteProperty(propertyId));
        }

        dispatch(getUserProperties());
    };

    return (
        <>
            <div className="dashboard">
                <header className="dashboard__header">
                    <h2 className="dashboard__text">Hello, {user.name}</h2>
                    <h2>Email: {user.email}</h2>
                </header>

                <main>
                    <div className="btn__containter">
                        <Link to='/create' className="btn dashboard__btn">
                            <BsPlus className="dashboard__icon" /> Add Property
                        </Link>
                    </div>
                    {properties.map((property) => (
                        <PropertyItem key={property._id} property={property} onEdit={true} onDelete={onDelete} />
                    ))}
                </main>
                
                
            </div>
            <Footer />
        </>
    )
}

export default Dashboard;