import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.payload) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glassmorphism p-8 rounded-lg border border-neon-cyan shadow-neon-cyan">
        <h2 className="text-3xl font-serif font-bold text-white mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-neon-purple/10 text-neon-purple text-sm rounded border border-neon-purple">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-transparent border border-neon-cyan text-neon-cyan rounded font-semibold hover:bg-neon-cyan hover:text-black transition-all duration-300 disabled:opacity-50 shadow-neon-cyan-sm hover:shadow-neon-cyan"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-text-secondary">
          Don't have an account? <a href="/signup" className="text-neon-purple hover:text-white transition-colors">Sign up</a>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-text-muted hover:text-neon-cyan transition-colors">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
