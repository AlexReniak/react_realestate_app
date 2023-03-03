import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

function SignUp() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

    useEffect(() => {
        if(isError) {
            alert(`Error: ${message}`);
        }

        if(user || isSuccess) {
            navigate('/dashboard')
        }
        dispatch(reset());
    }, [isError, user, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));    
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2) {
            alert('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password
            }
    
            dispatch(register(userData));
            navigate('/dashboard');
        };
    };

    if(isLoading) {
        return (
            <Spinner isLoading={isLoading} />
        )
    }

    return (
        <div className="container login__container">

            <h3 className="login__heading">Sign Up</h3>

            <section>
                <form className="form" onSubmit={onSubmit}>
                <div className="form__group">
                        <input type="text" id="name" className="form__input" required value={name} onChange={onChange} placeholder="Name"/>
                    </div>
                    <div className="form__group">
                        <input type="email" id="email" className="form__input" required value={email} onChange={onChange} placeholder="Email"/>
                    </div>
                    <div className="form__group">
                        <input type="password" id="password" className="form__input" required value={password} onChange={onChange} placeholder="Password"/>
                    </div>
                    <div className="form__group">
                        <input type="password" id="password2" className="form__input" required value={password2} onChange={onChange} placeholder="Confirm password"/>
                    </div>
                    <button className="btn form__btn">Sign Up</button>
                </form>

            </section>

            <p className="form__text--sub">Already have an account?</p>

            <div className="redirect__btn">
                <Link to="/login" className="btn form__btn--secondary">Login</Link>
            </div>

            <Footer />

        </div>
    )
}

export default SignUp;