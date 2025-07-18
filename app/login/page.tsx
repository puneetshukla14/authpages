'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);

      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main
      style={{
        ...styles.container,
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Log in to continue your conversations</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{' '}
          <a href="/signup" style={styles.link}>
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4ff, #fff8f1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: `'Inter', sans-serif`,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    color: '#222',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    marginBottom: '0.4rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#444',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#fafafa',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.9rem',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    transition: 'background 0.3s ease, transform 0.2s ease',
  },
  error: {
    color: '#e11d48',
    fontSize: '0.9rem',
    marginTop: '-0.8rem',
    textAlign: 'left' as const,
  },
  footerText: {
    marginTop: '2rem',
    fontSize: '0.95rem',
    textAlign: 'center' as const,
    color: '#555',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 500,
  },
} as const;
