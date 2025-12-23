import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../store/authSlice';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email is required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const result = await dispatch(signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    }));

    if (result.payload) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glassmorphism p-8 rounded-lg border border-neon-purple shadow-neon-purple">
        <h2 className="text-3xl font-serif font-bold text-white mb-6 text-center">Create Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-neon-purple/10 text-neon-purple text-sm rounded border border-neon-purple">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-white mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-dark-main border rounded text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                  validationErrors.firstName ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="John"
              />
              {validationErrors.firstName && <p className="text-neon-purple text-xs mt-1">{validationErrors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-dark-main border rounded text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                  validationErrors.lastName ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="Doe"
              />
              {validationErrors.lastName && <p className="text-neon-purple text-xs mt-1">{validationErrors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-dark-main border rounded text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                validationErrors.email ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
              placeholder="your@email.com"
            />
            {validationErrors.email && <p className="text-neon-purple text-xs mt-1">{validationErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-dark-main border rounded text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                validationErrors.password ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
              placeholder="••••••••"
            />
            {validationErrors.password && <p className="text-neon-purple text-xs mt-1">{validationErrors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-dark-main border rounded text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                validationErrors.confirmPassword ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
              }`}
              placeholder="••••••••"
            />
            {validationErrors.confirmPassword && <p className="text-neon-purple text-xs mt-1">{validationErrors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-transparent border border-neon-purple text-neon-purple rounded font-semibold hover:bg-neon-purple hover:text-white transition-all duration-300 disabled:opacity-50 shadow-neon-purple-sm hover:shadow-neon-purple"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-text-secondary">
          Already have an account? <a href="/login" className="text-neon-cyan hover:text-white transition-colors">Sign in</a>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-text-muted hover:text-neon-purple transition-colors">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
