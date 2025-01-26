import React, { useState } from 'react';
import { mockPatients } from '../data/mockPatientData';
import { Database, Filter, SortAsc, SortDesc } from 'lucide-react';

const PatientDataViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'id' | 'age' | 'gender'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const patientsPerPage = 10;

  // Filter and sort patients
  const filteredPatients = mockPatients
    .filter(patient => 
      patient.id.toString().includes(searchTerm) ||
      patient.age.toString().includes(searchTerm) ||
      patient.gender.includes(searchTerm.toLowerCase()) ||
      patient.conditions.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1)
        : (aValue < bValue ? 1 : -1);
    });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const displayedPatients = filteredPatients.slice(startIndex, startIndex + patientsPerPage);

  const handleSort = (field: 'id' | 'age' | 'gender') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mock Patient Dataset</h1>
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-blue-500" />
          <span className="text-gray-600">Total Patients: {mockPatients.length}</span>
        </div>
        
        {/* Search and Filter */}
        <div className="relative mb-6">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, age, gender, or condition..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Patient Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left cursor-pointer group"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </span>
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 text-gray-400" /> :
                        <SortDesc className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer group"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </span>
                    {sortField === 'age' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 text-gray-400" /> :
                        <SortDesc className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer group"
                  onClick={() => handleSort('gender')}
                >
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </span>
                    {sortField === 'gender' && (
                      sortDirection === 'asc' ? 
                        <SortAsc className="h-4 w-4 text-gray-400" /> :
                        <SortDesc className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conditions
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vital Signs
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lab Results
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition) => (
                        <span
                          key={condition.id}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${condition.severity === 'severe' ? 'bg-red-100 text-red-800' :
                              condition.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'}`}
                        >
                          {condition.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="space-y-1">
                      <p>BP: {patient.vitalSigns.bloodPressure.systolic}/{patient.vitalSigns.bloodPressure.diastolic}</p>
                      <p>HR: {patient.vitalSigns.heartRate}</p>
                      <p>Temp: {patient.vitalSigns.temperature}°C</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="space-y-1">
                      <p>Glucose: {patient.labResults.glucose}</p>
                      <p>Chol: {patient.labResults.cholesterol}</p>
                      <p>Creat: {patient.labResults.creatinine}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + patientsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDataViewer;