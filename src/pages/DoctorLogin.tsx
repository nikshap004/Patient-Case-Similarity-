import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Alert from '../components/Alert';

const specializations = [
  'Cardiologist',
  'Neurologist',
  'Oncologist',
  'Pediatrician',
  'Psychiatrist',
  'General Practitioner',
];

const DoctorLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    specialization: '',
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
        id: '1',
        name: formData.name || 'Dr. Smith',
        role: 'doctor',
        specialization: formData.specialization,
      });
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center px-4 py-12">
      {showAlert && (
        <Alert
          message="Registration successful! Please login with your credentials."
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="relative w-full max-w-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-xl blur"></div>
        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/50">
          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full shadow-inner">
              <Stethoscope className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {formData.isRegistering ? 'Doctor Registration' : 'Doctor Login'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {formData.isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <select
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-white/50 shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              {formData.isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              className="text-green-600 hover:text-green-800 transition-colors"
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

export default DoctorLogin;