import { useState } from 'react';
import axios from 'axios';

const Manager = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [personalTrainerId, setPersonalTrainerId] = useState(0);
    const [accountType, setAccountType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://afefitness2023.azurewebsites.net/api/Users', {
                userId: 0,
                firstName,
                lastName,
                email,
                password,
                personalTrainerId,
                accountType,
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" style={{ marginBottom: '10px' }} />
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" style={{ marginBottom: '10px' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ marginBottom: '10px' }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ marginBottom: '10px' }} />
                <input type="number" value={personalTrainerId} onChange={e => setPersonalTrainerId(parseInt(e.target.value))} placeholder="Personal Trainer ID" style={{ marginBottom: '10px' }} />
                <input type="text" value={accountType} onChange={e => setAccountType(e.target.value)} placeholder="Account Type" style={{ marginBottom: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Create User</button>
            </form>
        </div>
    );
};

export default Manager;  
