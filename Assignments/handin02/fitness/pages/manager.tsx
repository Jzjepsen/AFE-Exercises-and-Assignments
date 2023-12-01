import React, { useState, useEffect, FormEvent } from 'react';
import Router from 'next/router';

const CreateUser = () => {
    const [user, setUser] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        AccountType: '',
        Password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false); // New state for success message  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Start loading      

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token'); // get the token from local storage      

            try {
                const response = await fetch('https://afefitness2023.azurewebsites.net/api/Users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // include the token in the Authorization header      
                    },
                    body: JSON.stringify(user),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setSuccess(true); // Display success message    
                setUser({ // Clear the form    
                    Email: '',
                    FirstName: '',
                    LastName: '',
                    AccountType: '',
                    Password: '',
                });
                setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds    
            } catch (error) {
                // Handle errors, show error message to the user      
                console.error('There was an error creating the user:', error);
            } finally {
                setIsLoading(false); // End loading      
            }
        }
    };


    return (
        <div className="formContainer">
            <header>Create new Personal Trainer</header>

            <form onSubmit={handleSubmit}>
                <table className="tableForm">
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="Email">Email</label>
                            </td>
                            <td>
                                <input
                                    type="email"
                                    id="Email"
                                    name="Email"
                                    value={user.Email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                    className="inputField"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="FirstName">First Name</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="FirstName"
                                    name="FirstName"
                                    value={user.FirstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    required
                                    className="inputField"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="LastName">Last Name</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="LastName"
                                    name="LastName"
                                    value={user.LastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    required
                                    className="inputField"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="AccountType">Account Type</label>
                            </td>
                            <td>
                                <select
                                    id="AccountType"
                                    name="AccountType"
                                    value={user.AccountType}
                                    onChange={handleChange}
                                    required
                                    className="selectField"
                                >
                                    <option value="">Select Account Type</option>
                                    <option value="PersonalTrainer">Personal Trainer</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="Password">Password</label>
                            </td>
                            <td>
                                <input
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    value={user.Password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                    className="inputField"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <button type="submit" disabled={isLoading} className="submitButton">
                                    {isLoading ? 'Creating...' : 'Create User'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {success && <p>User successfully created!</p>}
        </div>
    );

};

export default CreateUser;
