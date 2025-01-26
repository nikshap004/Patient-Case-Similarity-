import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { FileSearch, Users, TrendingUp } from 'lucide-react';

const studyData = [
  { month: 'Jan', cases: 45, controls: 40, accuracy: 0.82 },
  { month: 'Feb', cases: 52, controls: 48, accuracy: 0.85 },
  { month: 'Mar', cases: 58, controls: 55, accuracy: 0.89 },
  { month: 'Apr', cases: 62, controls: 60, accuracy: 0.92 },
];

const clusterDistribution = [
  { cluster: 'A', count: 120, accuracy: 0.88 },
  { cluster: 'B', count: 85, accuracy: 0.92 },
  { cluster: 'C', count: 95, accuracy: 0.85 },
];

const ResearcherDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [activeStudy, setActiveStudy] = useState('case-control');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Research Analytics Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setActiveStudy('case-control')}
          className={`p-6 rounded-lg shadow-md transition-all ${
            activeStudy === 'case-control'
              ? 'bg-indigo-50 border-2 border-indigo-500'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Case-Control Studies</h3>
            <FileSearch className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-sm text-gray-600">
            Analyze patient outcomes and treatment effectiveness
          </p>
        </button>

        <button
          onClick={() => setActiveStudy('clustering')}
          className={`p-6 rounded-lg shadow-md transition-all ${
            activeStudy === 'clustering'
              ? 'bg-indigo-50 border-2 border-indigo-500'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Patient Clustering</h3>
            <Users className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-sm text-gray-600">
            Explore patient groups and similarities
          </p>
        </button>

        <button
          onClick={() => setActiveStudy('prediction')}
          className={`p-6 rounded-lg shadow-md transition-all ${
            activeStudy === 'prediction'
              ? 'bg-indigo-50 border-2 border-indigo-500'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Predictive Analytics</h3>
            <TrendingUp className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-sm text-gray-600">
            ML-based outcome predictions
          </p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Study Progress</h2>
          <LineChart width={500} height={300} data={studyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="cases" stroke="#4F46E5" name="Cases" />
            <Line yAxisId="left" type="monotone" dataKey="controls" stroke="#818CF8" name="Controls" />
            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10B981" name="Accuracy" />
          </LineChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cluster Distribution</h2>
          <BarChart width={500} height={300} data={clusterDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cluster" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#4F46E5" name="Patient Count" />
            <Bar yAxisId="right" dataKey="accuracy" fill="#10B981" name="Cluster Accuracy" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;