import React, { useState } from "react";
import axios from "axios";
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://afefitness2023.azurewebsites.net/api/Users/login",
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { jwt } = response.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', jwt);
      }

      console.log('jwt:', jwt);
      Cookies.set('token', jwt);

      const decodedToken = decode(jwt);
      let Role: any;
      let UserId: any;

      if (typeof decodedToken !== 'string' && decodedToken && 'Role' in decodedToken) {
        Role = decodedToken.Role;
        UserId = decodedToken.UserId;

        if (typeof window !== 'undefined') {
          localStorage.setItem('id', UserId);
        }
      } else {
        throw new Error('Invalid token');
      }

      switch (Role) {
        case 'Manager':
          router.push('/manager');
          break;
        case 'PersonalTrainer':
          router.push('/trainer');
          break;
        case 'Client':
          router.push('/client');
          break;
        default:
          throw new Error('Invalid role');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f2f2f2'
    }}>
      <h1 style={{ marginBottom: 50, fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>Fitness App</h1>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        padding: 20,
        borderRadius: 5,
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.2)',
        backgroundColor: 'black'
      }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ marginBottom: 10, padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ marginBottom: 20, padding: 10, borderRadius: 5, border: '1px solid #ddd' }}
        />

        <button type="submit" disabled={loading} style={{
          padding: 10,
          backgroundColor: '#007BFF',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: 5,
          border: 'none'
        }}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}
    </div>
  );
}    
