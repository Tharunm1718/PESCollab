import { useState } from "react";
import "./Login.css";
import pescollebLogo from "./assets/pescolleb_logo.jpeg";
import { Navigate, useNavigate } from "react-router-dom";
import { use } from "react";
import Snowfall from "react-snowfall";

function Login() {
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        usn: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ message: "", type: "" });
    const [fieldState, setFieldState] = useState({});

    let handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const newErrors = {};
        const newFieldState = {};

        if (!usn) {
            newErrors.usn = "USN is required.";
            newFieldState.usn = 'error';
        } else if (usn.length < 3) {
            newErrors.usn = "USN must be at least 3 characters.";
            newFieldState.usn = 'error';
        } else {
            newFieldState.usn = 'success';
        }

        if (!password) {
            newErrors.password = "Password is required.";
            newFieldState.password = 'error';
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            newFieldState.password = 'error';
        } else {
            newFieldState.password = 'success';
        }

        setErrors(newErrors);
        setFieldState(newFieldState);

        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(' http://localhost:3000/ ', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usn: formdata.usn, password: formdata.password }),
            credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("token", data.token);
            navigate('/dashboard');
        } else {
            alert('Login failed: ' + data.message);
        }
    };

    return (
        <div className="main">
            <Snowfall color="white" snowflakeCount={30} />
            <div className="page-container">
                <section className="right-section">
                    <div className="decorative-elements">
                        <div className="group">
                            <div className="overlap-group">
                                <div className="group-wrapper">
                                    <div className="div-wrapper">
                                        <div className="identifier-wrapper">
                                            <div className="identifier">
                                                <div className="rectangle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div">
                                    <div className="group-2">
                                        <div className="group-3">
                                            <div className="rectangle-wrapper">
                                                <div className="rectangle-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-4">
                                    <div className="group-5">
                                        <div className="group-6">
                                            <div className="identifier-2">
                                                <div className="rectangle-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="TO-pescollab">TO&nbsp;&nbsp;peSCOllAB</div>
                            <div className="text-wrapper">Welcome</div>
                        </div>
                        <div className="group-12">
                            <div className="group-5">
                                <div className="group-6">
                                    <div className="identifier-2">
                                        <div className="rectangle-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="left-section">
                    <form className="login-form" noValidate>
                        <img className="screenshot" src={pescollebLogo} alt="Pescollab Logo" />

                        <div className="form-group">
                            <label htmlFor="usn-input" className="text-wrapper-3">University Seat Number</label>
                            <div className="group-7">
                                <div className="group-8">
                                    <div className="group-9">
                                        <div className="identifier-3">
                                            <div className="rectangle-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                id="usn-input"
                                className={`input-field ${fieldState.usn || ''}`}
                                name="usn"
                                placeholder="Enter Your USN"
                                required
                                value={formdata.usn}
                                onChange={handleChange}
                                minLength={3}
                                maxLength={20}
                                aria-describedby="usn-error"
                            />
                            <div id="usn-error" role="alert" className={`error-message ${errors.usn ? 'visible' : ''}`}>
                                {errors.usn}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password-input" className="text-wrapper-4">Password</label>
                            <div className="group-10">
                                <div className="group-11">
                                    <div className="group-9">
                                        <div className="identifier-3">
                                            <div className="rectangle-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="password"
                                id="password-input"
                                className={`input-field ${fieldState.password || ''}`}
                                name="password"
                                placeholder="Enter Your Password"
                                required
                                value={formdata.password}
                                onChange={handleChange}
                                minLength={6}
                                aria-describedby="password-error"
                            />
                            <div id="password-error" role="alert" className={`error-message ${errors.password ? 'visible' : ''}`}>
                                {errors.password}
                            </div>
                        </div>

                        <button type="submit" className="login-button" id="login-btn" aria-label="Login to your account" onClick={handleSubmit}>Login</button>
                        <div id="form-status" role="status" className={`form-status ${status.message ? 'visible' : ''} ${status.type}`}>
                            {status.message}
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Login;