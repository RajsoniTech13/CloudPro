import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="text-sm text-gray-500 mt-2">Welcome back to CloudPro</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 font-medium">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-gfg-green focus:border-transparent outline-none transition"
              value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-gfg-green focus:border-transparent outline-none transition"
              value={password} onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="mt-4 w-full bg-gfg-green text-white font-bold py-2.5 rounded-md hover:bg-green-700 transition shadow-sm"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-gfg-green font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
