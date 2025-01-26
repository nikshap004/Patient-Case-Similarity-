import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Users, Brain, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const clusterData = [
  {
    name: 'High Risk Cardiac',
    patients: 156,
    avgAge: 65,
    primaryCondition: 'Cardiovascular',
  },
  {
    name: 'Metabolic Syndrome',
    patients: 243,
    avgAge: 52,
    primaryCondition: 'Diabetes',
  },
  {
    name: 'Respiratory Cases',
    patients: 189,
    avgAge: 48,
    primaryCondition: 'COPD',
  },
];

const similarityTrend = [
  { month: 'Jan', score: 0.82 },
  { month: 'Feb', score: 0.85 },
  { month: 'Mar', score: 0.89 },
  { month: 'Apr', score: 0.92 },
  { month: 'May', score: 0.94 },
];

const patientData = [
  { id: '1234', age: 67, condition: 'Hypertension', similarity: 0.95 },
  { id: '1235', age: 64, condition: 'Diabetes', similarity: 0.88 },
  { id: '1236', age: 71, condition: 'CAD', similarity: 0.85 },
  { id: '1237', age: 62, condition: 'Arrhythmia', similarity: 0.82 },
];

const DoctorDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [selectedCluster, setSelectedCluster] = useState(clusterData[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name} ({user?.specialization})
        </h1>
        <p className="text-gray-600">Patient Clustering and Analysis Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {clusterData.map((cluster) => (
          <button
            key={cluster.name}
            onClick={() => setSelectedCluster(cluster)}
            className={`p-6 rounded-lg shadow-md transition-all ${
              selectedCluster.name === cluster.name
                ? 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500'
                : 'bg-gradient-to-br from-green-50/50 to-blue-50/50 hover:from-green-100/50 hover:to-blue-100/50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{cluster.name}</h3>
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">Patients: {cluster.patients}</p>
              <p className="text-sm text-gray-700">Avg. Age: {cluster.avgAge}</p>
              <p className="text-sm text-gray-700">Primary: {cluster.primaryCondition}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Similarity Trends</h2>
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          <LineChart width={500} height={300} data={similarityTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#059669" />
          </LineChart>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Similar Patients</h2>
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {patientData.map((patient) => (
              <div
                key={patient.id}
                className="p-4 bg-white/50 border border-blue-100 rounded-lg hover:bg-white/80 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Patient #{patient.id}</p>
                    <p className="text-sm text-gray-700">
                      Age: {patient.age} | Condition: {patient.condition}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Similarity Score</p>
                    <p className="font-semibold text-green-600">
                      {(patient.similarity * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;