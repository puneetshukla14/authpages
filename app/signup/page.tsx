'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/setup-profile');
      } else {
        setError('Signup failed. Try a different username.');
      }
    } catch {
      setError('Something went wrong. Please try again later.');
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
        <h1 style={styles.title}>Create Your Account</h1>
        <p style={styles.subtitle}>
          Join a clean, fast chat platform. Built for real conversations—no distractions.
        </p>

<form onSubmit={handleSubmit} style={styles.form}>
  <div style={styles.inputGroup}>
    <label style={styles.label}>Username</label>
    <input
      type="text"
      placeholder="Username"
      value={form.username}
      onChange={(e) => setForm({ ...form, username: e.target.value })}
      style={styles.input}
      required
    />
  </div>

  <div style={styles.inputGroup}>
    <label style={styles.label}>Email (optional)</label>
    <input
      type="email"
      placeholder="Email"
      value={form.email ?? ''}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      style={styles.input}
    />
  </div>

  <div style={styles.inputGroup}>
    <label style={styles.label}>Password</label>
    <input
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      style={styles.input}
      required
    />
  </div>

  <div style={styles.inputGroup}>
    <label style={styles.label}>Confirm Password</label>
    <input
      type="password"
      placeholder="Confirm Password"
      value={form.confirmPassword}
      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      style={styles.input}
      required
    />
  </div>

  {error && <p style={styles.error}>{error}</p>}

  <button type="submit" style={styles.button}>
    Sign Up
  </button>
</form>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>
            Log in here and pick up where you left off.
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
    transition: 'box-shadow 0.3s ease',
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
    color: '#555',
    textAlign: 'center' as const,
    marginBottom: '1.8rem',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.4rem',
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
