import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Microscope } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Alert from '../components/Alert';

const ResearcherLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    institution: '',
    name: '',
    isRegistering: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isRegistering) {
      setShowAlert(true);
      setTimeout(() => {
        setFormData({ ...formData, isRegistering: false });
        setShowAlert(false);
      }, 3000);
    } else {
      setUser({
        id: '2',
        name: formData.name || 'Dr. Johnson',
        role: 'researcher',
      });
      navigate('/researcher-dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 flex items-center justify-center px-4 py-12">
      {showAlert && (
        <Alert
          message="Registration successful! Please login with your credentials."
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="relative w-full max-w-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-xl blur"></div>
        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/50">
          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full shadow-inner">
              <Microscope className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {formData.isRegistering ? 'Researcher Registration' : 'Researcher Login'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.isRegistering && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              {formData.isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
              onClick={() => setFormData({ ...formData, isRegistering: !formData.isRegistering })}
            >
              {formData.isRegistering
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherLogin;