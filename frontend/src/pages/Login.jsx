import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

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

        const userData = {
            email,
            password
        }

        dispatch(login(userData));
        navigate('/dashboard');
    }

    if(isLoading) {
        return (
            <Spinner isLoading={isLoading} />
        )
    }

    return (
        <div className="container login__container">

            <h3 className="login__heading">Login</h3>

            <section>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form__group">
                        <input type="email" id="email" className="form__input" required value={email} onChange={onChange} placeholder="Email"/>
                    </div>
                    <div className="form__group">
                        <input type="password" id="password" className="form__input" required value={password} onChange={onChange} placeholder="Password"/>
                    </div>
                    <button className="btn form__btn">Login</button>
                </form>

            </section>

            <p className="form__text--sub">Don't have an account?</p>

            <div className="redirect__btn">
                <Link to="/sign-up" className="btn form__btn--secondary">Sign Up</Link>
            </div>

            <Footer />

        </div>
    )
}

export default Login;