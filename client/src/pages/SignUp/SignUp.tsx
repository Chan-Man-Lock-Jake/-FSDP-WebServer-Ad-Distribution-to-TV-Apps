import React, { useState } from 'react';
import './SignUp.css';
import illustrationImage from "../../assets/icons/undraw_digital-artwork_xlmm.svg";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const ErrorPopup = () => {
        setTimeout(() => {
            setMessage(null);
        }, 3000);

        return (
            <div className={message ? `error-message` : ''}>
                <span>{message}</span>
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Name: name,
                    Password: password,
                    Role: "Admin", // Auto-assigning the role as Admin
                }),
            });

            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                console.log(data); // Log success response
                setMessage("Sign up successful!");
            } else {
                const error = await response.json();
                console.error(error); // Log error response
                setMessage(error.message || "Sign up failed. Please try again.");
            }
        } catch (error) {
            console.error(error); // Log unexpected errors
            setMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <section className='signup-flow'>
            <ErrorPopup />
            <div className='left'>
                <form onSubmit={handleSubmit} id='signup-form'>
                    <h1>Sign up for an account</h1>
                    <span>Create your account by entering your details below.</span>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="Email" id="email" />
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" name="Name" id="name" />
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="Password" id="password" />
                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <a href='/login'>Log In</a></p>
                </form>
            </div>
            <div className='right'>
                <div>
                    <h1>Manage and distribute your advertisements with ease</h1>
                    <span>Everything you need for seamless ad distribution</span>
                    <img src={illustrationImage} alt="Advertisement Management" className="illustration-image" />
                </div>
            </div>
        </section>
    );
};

export default SignUp;

