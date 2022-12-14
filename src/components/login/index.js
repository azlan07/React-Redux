import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

async function doLogin({ email, password }) {
    // Gunakan endpoint-mu sendiri
    const response = await fetch("http://localhost:3001/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const data = await response.json();
    return data.token;
}

async function doLoginWithGoogle(token) {
    // Sesuaikan endpoint
    const response = await fetch("http://localhost:8000/v1/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token
        }),
    });
    const data = await response.json();
    return data.token;
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    function handleSubmit(e) {
        setIsLoading(true);
        e.preventDefault();
        doLogin({ email, password })
            .then((token) => localStorage.setItem("token", token))
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false));
    }

    const haldleSuccessGoogle = (response) => {
        console.log(response);
        console.log(response.tokenId);
        if (response.tokenId) {
            doLoginWithGoogle(response.tokenId)
                .then((token) => {
                    localStorage.setItem(
                        "token", token);
                    setIsLoggedIn(token);
                })
                .catch((err) => console.log(err.message))
                .finally(() => setIsLoading(false));
        }
    }

    const haldleFailureGoogle = (response) => {
        console.log(response);
        alert(response);
    }

    return (
        !isLoggedIn ? (
            <form className="container mt-5" onSubmit={handleSubmit} style={{ width: "350px" }}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input type="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-block mb-4">
                    SIGN IN
                </button>
                <br></br>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={haldleSuccessGoogle}
                    onFailure={haldleFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                {/* <!-- Register buttons --> */}
                {/* <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                </button>
            </div> */}
            </form>
        )
            : (<Navigate to={'/'} />
            )
    );
}

export default Login;

