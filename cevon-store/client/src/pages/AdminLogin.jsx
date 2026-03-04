import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const { token } = response.data;

      // Store token
      localStorage.setItem('adminToken', token);

      onLogin(true);
      navigate('/admin');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Connection to server failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md animate-fade-in border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-signature text-[#D4AF37] mb-2">Cevon</h1>
          <h2 className="text-2xl font-serif text-[#0B2529]">Atelier Access</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-4 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-4 rounded-lg uppercase tracking-widest text-sm transition-colors shadow-md mt-4 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0B2529] hover:bg-[#D4AF37]'
            }`}
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">Restricted access. Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
