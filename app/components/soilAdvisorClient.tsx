"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Leaf, Beaker, CheckCircle, RotateCcw, Sprout } from 'lucide-react';

// Mock inference engine and rules for demonstration

const runMockInference = (data: any) => {
  const recommendations = [];
  
  // pH recommendations
  if (data.pH < 6.0) {
    recommendations.push({
      fertilityStatus: 'Soil Too Acidic',
      recommendations: ['Apply agricultural lime to raise pH', 'Consider dolomitic lime for magnesium boost'],
      bestPractices: ['Test pH monthly after treatment', 'Apply lime 2-3 months before planting']
    });
  } else if (data.pH > 7.5) {
    recommendations.push({
      fertilityStatus: 'Soil Too Alkaline',
      recommendations: ['Apply sulfur to lower pH', 'Use acidifying fertilizers'],
      bestPractices: ['Monitor pH closely during treatment', 'Consider organic matter addition']
    });
  }

  // Nutrient recommendations
  if (data.nitrogen === 'Low') {
    recommendations.push({
      fertilityStatus: 'Nitrogen Deficiency',
      recommendations: ['Apply nitrogen-rich fertilizer (Urea or Ammonium sulfate)', 'Consider organic compost'],
      bestPractices: ['Split nitrogen applications', 'Apply before rainfall or irrigation']
    });
  }

  if (data.phosphorus === 'Low') {
    recommendations.push({
      fertilityStatus: 'Phosphorus Deficiency',
      recommendations: ['Apply DAP (Diammonium phosphate)', 'Use bone meal for organic approach'],
      bestPractices: ['Apply at planting time', 'Ensure good soil contact']
    });
  }

  if (data.potassium === 'Low') {
    recommendations.push({
      fertilityStatus: 'Potassium Deficiency',
      recommendations: ['Apply potassium sulfate or muriate of potash', 'Use wood ash for organic option'],
      bestPractices: ['Apply before planting season', 'Water thoroughly after application']
    });
  }

  return recommendations.length > 0 ? recommendations : [{
    fertilityStatus: 'Soil Conditions Optimal',
    recommendations: ['Your soil appears well-balanced for the selected crop', 'Continue current management practices'],
    bestPractices: ['Regular soil testing', 'Maintain organic matter levels']
  }];
};

const Step1 = ({ formData, setData, nextStep }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
        <Sprout className="w-8 h-8 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Crop & Soil Information</h2>
      <p className="text-gray-600">Tell us about your crop and soil type to get started</p>
    </div>

    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What crop are you planning to grow?
        </label>
        <select 
          value={formData.crop}
          onChange={(e) => setData((prev: any) => ({ ...prev, crop: e.target.value }))} 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-gray-800"
        >
          <option value="Maize">Maize (Corn)</option>
          <option value="Wheat">Wheat</option>
          <option value="Tomato">Tomato</option>
          <option value="Rice">Rice</option>
          <option value="Soybean">Soybean</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          What is your soil texture?
        </label>
        <select 
          value={formData.soilTexture}
          onChange={(e) => setData((prev: any) => ({ ...prev, soilTexture: e.target.value }))} 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-gray-800"
        >
          <option value="Sandy">Sandy Soil</option>
          <option value="Loamy">Loamy Soil</option>
          <option value="Clay">Clay Soil</option>
          <option value="Silty">Silty Soil</option>
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Not sure about your soil texture? Take a handful of moist soil and squeeze it. 
          Sandy soil crumbles, clay soil holds its shape, and loamy soil holds together but breaks when poked.
        </p>
      </div>
    </div>

    <div className="pt-6">
      <button 
        onClick={nextStep} 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
      >
        Continue to Soil Testing
        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const Step2 = ({ formData, setData, prevStep, submit }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <Beaker className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Soil Test Results</h2>
      <p className="text-gray-600">Enter your soil analysis measurements</p>
    </div>

    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Soil pH Level
        </label>
        <input 
          type="number" 
          step="0.1" 
          min="3.0" 
          max="10.0"
          value={formData.pH}
          onChange={(e) => setData((prev: any) => ({ ...prev, pH: parseFloat(e.target.value) || 7.0 }))} 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          placeholder="e.g., 6.5"
        />
        <p className="text-xs text-gray-500 mt-1">Range: 3.0 - 10.0 (Optimal: 6.0 - 7.5 for most crops)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nitrogen (N) Level
          </label>
          <select 
            value={formData.nitrogen}
            onChange={(e) => setData((prev: any) => ({ ...prev, nitrogen: e.target.value }))} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phosphorus (P) Level
          </label>
          <select 
            value={formData.phosphorus}
            onChange={(e) => setData((prev: any) => ({ ...prev, phosphorus: e.target.value }))} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Potassium (K) Level
          </label>
          <select 
            value={formData.potassium}
            onChange={(e) => setData((prev: any) => ({ ...prev, potassium: e.target.value }))} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> These levels are typically determined through professional soil testing. 
          If you haven't tested your soil, consider contacting your local agricultural extension office.
        </p>
      </div>
    </div>

    <div className="flex gap-4 pt-6">
      <button 
        onClick={prevStep} 
        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <ChevronLeft className="mr-2 w-5 h-5" />
        Back
      </button>
      <button 
        onClick={submit} 
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
      >
        Get Recommendations
        <CheckCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  </div>
);

const ResultsStep = ({ results, restart, formData }: any) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <Leaf className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Soil Analysis Report</h2>
      <p className="text-gray-600">Customized recommendations for <strong>{formData.crop}</strong> in <strong>{formData.soilTexture}</strong> soil</p>
    </div>

    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-gray-800 mb-2">Soil Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div><span className="text-gray-600">pH:</span> <span className="font-medium">{formData.pH}</span></div>
        <div><span className="text-gray-600">N:</span> <span className="font-medium">{formData.nitrogen}</span></div>
        <div><span className="text-gray-600">P:</span> <span className="font-medium">{formData.phosphorus}</span></div>
        <div><span className="text-gray-600">K:</span> <span className="font-medium">{formData.potassium}</span></div>
      </div>
    </div>

    {results.length > 0 ? (
      <div className="space-y-4">
        {results.map((result: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">{result.fertilityStatus}</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Recommended Actions:</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {result.bestPractices && result.bestPractices.length > 0 && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Best Practices:</h4>
                  <p className="text-blue-700 text-sm">{result.bestPractices.join(' • ')}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Excellent Soil Conditions!</h3>
        <p className="text-green-700">Your soil appears well-balanced for {formData.crop} cultivation.</p>
      </div>
    )}

    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="font-semibold text-gray-800 mb-2">Important Reminders:</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• Retest your soil every 6-12 months for optimal crop management</li>
        <li>• Follow local agricultural guidelines and regulations</li>
        <li>• Consider consulting with agricultural extension services for complex issues</li>
        <li>• Keep records of treatments applied for future reference</li>
      </ul>
    </div>

    <div className="pt-6">
      <button 
        onClick={restart} 
        className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
      >
        <RotateCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
        Analyze Another Soil Sample
      </button>
    </div>
  </div>
);

export function SoilAdvisorClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crop: 'Maize',
    soilTexture: 'Loamy',
    pH: 7.0,
    nitrogen: 'Medium',
    phosphorus: 'Medium',
    potassium: 'Medium',
  });
  const [results, setResults] = useState<any[]>([]);

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

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Soil Fertility Advisor</h1>
          <p className="text-lg text-gray-600">Professional soil analysis and fertilizer recommendations</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {step === 1 && <Step1 formData={formData} setData={setFormData} nextStep={nextStep} />}
                {step === 2 && <Step2 formData={formData} setData={setFormData} prevStep={prevStep} submit={handleSubmit} />}
                {step === 3 && <ResultsStep results={results} restart={restart} formData={formData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Professional agricultural consulting • Evidence-based recommendations</p>
        </div>
      </div>
    </div>
  );
}