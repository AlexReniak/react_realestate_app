import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    return (
        <div className="container">
            <form>
                <input type="email" id="email" value={email} />
                <label htmlFor="email">Email</label>
                <input type="password" id="password" value={password} />
                <label htmlFor="password">password</label>
            </form>
        </div>
    )
}

export default Login;