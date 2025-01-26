import { Patient, MedicalCondition, Treatment } from '../types/medical';

// Generate random age between min and max
const randomAge = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate random value between 0 and 1
const random = () => Math.random();

// Generate random blood pressure
const randomBP = () => ({
  systolic: Math.floor(random() * (180 - 90) + 90),
  diastolic: Math.floor(random() * (110 - 60) + 60),
});

const conditions: MedicalCondition[] = [
  { id: 1, name: 'Hypertension', severity: 'moderate' },
  { id: 2, name: 'Type 2 Diabetes', severity: 'severe' },
  { id: 3, name: 'Coronary Artery Disease', severity: 'severe' },
  { id: 4, name: 'COPD', severity: 'moderate' },
  { id: 5, name: 'Asthma', severity: 'mild' },
  { id: 6, name: 'Rheumatoid Arthritis', severity: 'moderate' },
];

const treatments: Treatment[] = [
  { id: 1, name: 'ACE Inhibitors', type: 'medication' },
  { id: 2, name: 'Metformin', type: 'medication' },
  { id: 3, name: 'Statins', type: 'medication' },
  { id: 4, name: 'Bronchodilators', type: 'medication' },
  { id: 5, name: 'Physical Therapy', type: 'therapy' },
  { id: 6, name: 'Dietary Modification', type: 'lifestyle' },
];

// Generate a random set of conditions
const getRandomConditions = () => {
  const numConditions = Math.floor(random() * 3) + 1;
  return [...conditions]
    .sort(() => 0.5 - random())
    .slice(0, numConditions);
};

// Generate a random set of treatments
const getRandomTreatments = () => {
  const numTreatments = Math.floor(random() * 4) + 1;
  return [...treatments]
    .sort(() => 0.5 - random())
    .slice(0, numTreatments);
};

// Generate mock vital signs
const generateVitalSigns = (age: number) => ({
  bloodPressure: randomBP(),
  heartRate: Math.floor(random() * (100 - 60) + 60),
  temperature: (random() * (0.8) + 36.5).toFixed(1),
  respiratoryRate: Math.floor(random() * (20 - 12) + 12),
  oxygenSaturation: Math.floor(random() * (100 - 95) + 95),
});

// Generate mock lab results
const generateLabResults = () => ({
  glucose: (random() * (180 - 70) + 70).toFixed(1),
  cholesterol: Math.floor(random() * (240 - 150) + 150),
  creatinine: (random() * (1.2 - 0.6) + 0.6).toFixed(2),
  potassium: (random() * (5.0 - 3.5) + 3.5).toFixed(1),
  sodium: Math.floor(random() * (145 - 135) + 135),
});

// Generate a single mock patient
const generatePatient = (id: number): Patient => {
  const age = randomAge(25, 85);
  const conditions = getRandomConditions();
  const treatments = getRandomTreatments();
  
  return {
    id,
    age,
    gender: random() > 0.5 ? 'male' : 'female',
    conditions,
    treatments,
    vitalSigns: generateVitalSigns(age),
    labResults: generateLabResults(),
    lastVisit: new Date(Date.now() - Math.floor(random() * 30 * 24 * 60 * 60 * 1000)),
  };
};

// Generate mock patient dataset
export const generatePatientDataset = (count: number): Patient[] => {
  return Array.from({ length: count }, (_, i) => generatePatient(i + 1));
};

// Export a fixed dataset for consistency
export const mockPatients = generatePatientDataset(1000);