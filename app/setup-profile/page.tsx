'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SetupProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    bio: '',
    age: '',
    profilePicture: '',
  });

  const [fadeIn, setFadeIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/auth/setup-profile', form);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Profile setup failed');
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
        <h1 style={styles.title}>Set Up Your Profile</h1>
        <p style={styles.subtitle}>Add details to personalize your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Puneet Shukla"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="A short description about you..."
              rows={3}
              style={{ ...styles.input, resize: 'none' }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Age</label>
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              type="number"
              placeholder="21"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Profile Picture (URL)</label>
            <input
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
              placeholder="https://example.com/me.png"
              style={styles.input}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Save & Go to Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eef2ff, #fff)',
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
    maxWidth: '500px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontSize: '1.9rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '0.3rem',
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
    fontSize: '0.9rem',
    marginBottom: '0.4rem',
    fontWeight: 500,
    color: '#444',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    outline: 'none',
  },
  button: {
    marginTop: '1rem',
    padding: '0.95rem',
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
  },
  error: {
    color: '#e11d48',
    fontSize: '0.9rem',
    textAlign: 'left' as const,
  },
} as const;
