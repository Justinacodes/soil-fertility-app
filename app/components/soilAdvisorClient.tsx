"use client"
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Leaf, Beaker, CheckCircle, RotateCcw, Sprout, Droplets, Sun } from 'lucide-react';

// Define a type for formData for better type checking
interface FormData {
  crop: string;
  soilTexture: string;
  pH: number;
  nitrogen: 'Low' | 'Medium' | 'High';
  phosphorus: 'Low' | 'Medium' | 'High';
  potassium: 'Low' | 'Medium' | 'High';
}

interface Recommendation {
  fertilityStatus: string;
  recommendations: string[];
  bestPractices?: string[];
  severity: 'high' | 'medium' | 'optimal';
}

const runMockInference = (data: FormData): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  if (data.pH < 6.0) {
    recommendations.push({
      fertilityStatus: 'Soil Too Acidic',
      recommendations: ['Apply agricultural lime to raise pH', 'Consider dolomitic lime for magnesium boost'],
      bestPractices: ['Test pH monthly after treatment', 'Apply lime 2-3 months before planting'],
      severity: 'high'
    });
  } else if (data.pH > 7.5) {
    recommendations.push({
      fertilityStatus: 'Soil Too Alkaline',
      recommendations: ['Apply sulfur to lower pH', 'Use acidifying fertilizers'],
      bestPractices: ['Monitor pH closely during treatment', 'Consider organic matter addition'],
      severity: 'medium'
    });
  }

  if (data.nitrogen === 'Low') {
    recommendations.push({
      fertilityStatus: 'Nitrogen Deficiency',
      recommendations: ['Apply nitrogen-rich fertilizer (Urea or Ammonium sulfate)', 'Consider organic compost'],
      bestPractices: ['Split nitrogen applications', 'Apply before rainfall or irrigation'],
      severity: 'high'
    });
  }

  if (data.phosphorus === 'Low') {
    recommendations.push({
      fertilityStatus: 'Phosphorus Deficiency',
      recommendations: ['Apply DAP (Diammonium phosphate)', 'Use bone meal for organic approach'],
      bestPractices: ['Apply at planting time', 'Ensure good soil contact'],
      severity: 'medium'
    });
  }

  if (data.potassium === 'Low') {
    recommendations.push({
      fertilityStatus: 'Potassium Deficiency',
      recommendations: ['Apply potassium sulfate or muriate of potash', 'Use wood ash for organic option'],
      bestPractices: ['Apply before planting season', 'Water thoroughly after application'],
      severity: 'medium'
    });
  }

  return recommendations.length > 0 ? recommendations : [{
    fertilityStatus: 'Optimal Soil Health',
    recommendations: ['Your soil is well-balanced for the selected crop', 'Continue current management practices'],
    bestPractices: ['Regular soil testing', 'Maintain organic matter levels'],
    severity: 'optimal'
  }];
};

const Step1 = ({ formData, setData, nextStep }: { formData: FormData; setData: React.Dispatch<React.SetStateAction<FormData>>; nextStep: () => void; }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
        <Sprout className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
        Crop & Soil Details
      </h2>
      <p className="text-gray-600 text-lg">Let's analyze your growing conditions</p>
    </div>

    <div className="space-y-6">
      <div className="group">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Leaf className="w-4 h-4 mr-2 text-emerald-500" />
          What crop are you planning to grow?
        </label>
        <select
          value={formData.crop}
          onChange={(e) => setData((prev) => ({ ...prev, crop: e.target.value }))}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white text-gray-800 shadow-sm hover:shadow-md group-hover:border-emerald-300"
        >
          <option value="Maize">🌽 Maize (Corn)</option>
          <option value="Wheat">🌾 Wheat</option>
          <option value="Tomato">🍅 Tomato</option>
          <option value="Rice">🌾 Rice</option>
          <option value="Soybean">🫘 Soybean</option>
        </select>
      </div>

      <div className="group">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Droplets className="w-4 h-4 mr-2 text-blue-500" />
          What is your soil texture?
        </label>
        <select
          value={formData.soilTexture}
          onChange={(e) => setData((prev) => ({ ...prev, soilTexture: e.target.value }))} // Corrected type for setData
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white text-gray-800 shadow-sm hover:shadow-md group-hover:border-blue-300"
        >
          <option value="Sandy">🏖️ Sandy Soil</option>
          <option value="Loamy">🌱 Loamy Soil</option>
          <option value="Clay">🧱 Clay Soil</option>
          <option value="Silty">💧 Silty Soil</option>
        </select>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
            <span className="text-blue-600 font-bold text-sm">💡</span>
          </div>
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">Quick Soil Test</p>
            <p className="text-sm text-blue-700">
              Squeeze moist soil: Sandy crumbles, clay holds shape, loamy holds but breaks when poked.
            </p>
          </div>
        </div>
      </div>
    </div>

    <button
      onClick={nextStep}
      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Continue to Soil Testing
      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const Step2 = ({ formData, setData, prevStep, submit }: { formData: FormData; setData: React.Dispatch<React.SetStateAction<FormData>>; prevStep: () => void; submit: () => void; }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
        <Beaker className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
        Soil Test Results
      </h2>
      <p className="text-gray-600 text-lg">Enter your soil analysis data</p>
    </div>

    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 text-xs">pH</span>
          Soil pH Level
        </label>
        <input
          type="number"
          step="0.1"
          min="3.0"
          max="10.0"
          value={formData.pH}
          onChange={(e) => setData((prev) => ({ ...prev, pH: parseFloat(e.target.value) || 7.0 }))}
          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm"
          placeholder="e.g., 6.5"
        />
        <p className="text-xs text-gray-500 mt-2">Optimal range: 6.0 - 7.5 for most crops</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: 'nitrogen', label: 'Nitrogen (N)', color: 'green', emoji: '🌿' },
          { key: 'phosphorus', label: 'Phosphorus (P)', color: 'orange', emoji: '🌸' },
          { key: 'potassium', label: 'Potassium (K)', color: 'purple', emoji: '🍌' }
        ].map(({ key, label, color, emoji }) => (
          <div key={key} className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
            <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="mr-2">{emoji}</span>
              {label}
            </label>
            <select
              value={formData[key as keyof FormData]} // Assert key type to be compatible with FormData
              onChange={(e) => setData((prev) => ({ ...prev, [key]: e.target.value as 'Low' | 'Medium' | 'High' }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-sm"
            >
              <option value="Low">🔴 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🟢 High</option>
            </select>
          </div>
        ))}
      </div>
    </div>

    <div className="flex gap-4">
      <button
        onClick={prevStep}
        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105"
      >
        <ChevronLeft className="mr-2 w-5 h-5" />
        Back
      </button>
      <button
        onClick={submit}
        className="flex-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Get Recommendations
        <CheckCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  </div>
);

const ResultsStep = ({ results, restart, formData }: { results: Recommendation[]; restart: () => void; formData: FormData; }) => {
  const getSeverityColor = (severity: 'high' | 'medium' | 'optimal') => {
    switch (severity) {
      case 'high': return 'from-red-500 to-orange-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'optimal': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
          Soil Analysis Report
        </h2>
        <p className="text-gray-600 text-lg">
          Recommendations for <span className="font-semibold text-emerald-600">{formData.crop}</span> in <span className="font-semibold text-blue-600">{formData.soilTexture}</span> soil
        </p>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <Sun className="w-5 h-5 mr-2 text-yellow-500" />
          Soil Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'pH', value: formData.pH, color: 'bg-red-100 text-red-700' },
            { label: 'Nitrogen', value: formData.nitrogen, color: 'bg-green-100 text-green-700' },
            { label: 'Phosphorus', value: formData.phosphorus, color: 'bg-orange-100 text-orange-700' },
            { label: 'Potassium', value: formData.potassium, color: 'bg-purple-100 text-purple-700' }
          ].map(({ label, value, color }) => (
            <div key={label} className={`${color} px-3 py-2 rounded-lg text-center font-medium text-sm`}>
              <div className="text-xs opacity-75">{label}</div>
              <div className="font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`bg-gradient-to-r ${getSeverityColor(result.severity)} p-4`}>
              <h3 className="font-bold text-lg text-white flex items-center">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  {result.severity === 'optimal' ? '✓' : '!'}
                </div>
                {result.fertilityStatus}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mr-2 text-xs">📋</span>
                  Recommended Actions
                </h4>
                <div className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <div
                      key={i} // Added key prop here
                      className="flex items-start bg-gray-50 rounded-lg p-3"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
              {result.bestPractices && result.bestPractices.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    Best Practices
                  </h4>
                  <p className="text-blue-700 text-sm">{result.bestPractices.join(' • ')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={restart}
        className="w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <RotateCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        Analyze Another Sample
      </button>
    </div>
  );
};

export default function SoilAdvisorClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ // Explicitly typed useState
    crop: 'Maize',
    soilTexture: 'Loamy',
    pH: 7.0,
    nitrogen: 'Medium',
    phosphorus: 'Medium',
    potassium: 'Medium',
  });
  const [results, setResults] = useState<Recommendation[]>([]); // Explicitly typed useState

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const recommendations = runMockInference(formData);
    setResults(recommendations);
    nextStep();
  };

  const restart = () => {
    setResults([]);
    setStep(1);
    setFormData({
      crop: 'Maize',
      soilTexture: 'Loamy',
      pH: 7.0,
      nitrogen: 'Medium',
      phosphorus: 'Medium',
      potassium: 'Medium',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 py-8 px-4">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Soil Fertility Advisor
          </h1>
          <p className="text-xl text-gray-600">Professional soil analysis & fertilizer guidance</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= stepNum
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div key={`line-${stepNum}`} className={`w-16 h-2 mx-2 rounded-full transition-all duration-500 ${ // Added key here
                    step > stepNum ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-8 md:p-12">
            {step === 1 && <Step1 formData={formData} setData={setFormData} nextStep={nextStep} />}
            {step === 2 && <Step2 formData={formData} setData={setFormData} prevStep={prevStep} submit={handleSubmit} />}
            {step === 3 && <ResultsStep results={results} restart={restart} formData={formData} />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="flex items-center justify-center text-sm">
            <span className="mr-2">🌱</span>
            Professional agricultural consulting • Evidence-based recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
