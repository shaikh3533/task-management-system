import React, { useState } from 'react';
import { authenticateUser } from '../auth';
import '../styles/LoginForm.css';

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const authenticatedUser = authenticateUser(email, password);
        if (authenticatedUser !== null) {
            onLogin(authenticatedUser.groupId, authenticatedUser.isAdmin ? 'admin' : 'user');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const handleUser1ButtonClick = () => {
        setEmail('user1@example.com');
        setPassword('password1');
    };

    const handleUser2ButtonClick = () => {
        setEmail('user2@example.com');
        setPassword('password2');
    };

    const handleAdminLogin = () => {
        setEmail('admin@example.com');
        setPassword('adminpassword');
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Task Management System</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="button-container">
                    <button type="button" onClick={handleUser1ButtonClick}>
                        Use User 1
                    </button>
                    <button type="button" onClick={handleUser2ButtonClick}>
                        Use User 2
                    </button>
                    <button type="button" onClick={handleAdminLogin}>
                        Login as Admin
                    </button>
                </div>
                <button type="submit" className="login-submit-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
