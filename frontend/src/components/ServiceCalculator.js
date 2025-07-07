import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Database, Shield, Zap, Users, Clock, DollarSign, CheckCircle } from 'lucide-react';

const ServiceCalculator = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    databaseSize: '',
    complexity: '',
    timeline: '',
    support: '',
    teamSize: '',
    industry: '',
  });

  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const projectTypes = [
    { id: 'consulting', name: 'Database Consulting', icon: Database, basePrice: 5000 },
    { id: 'performance', name: 'Performance Tuning', icon: Zap, basePrice: 3000 },
    { id: 'migration', name: 'Database Migration', icon: Database, basePrice: 7500 },
    { id: 'devops', name: 'DevOps Automation', icon: Users, basePrice: 6000 },
    { id: 'security', name: 'Security Audit', icon: Shield, basePrice: 8000 },
    { id: 'training', name: 'Team Training', icon: Users, basePrice: 2000 },
  ];

  const databaseSizes = [
    { id: 'small', name: 'Small (< 100GB)', multiplier: 1 },
    { id: 'medium', name: 'Medium (100GB - 1TB)', multiplier: 1.5 },
    { id: 'large', name: 'Large (1TB - 10TB)', multiplier: 2 },
    { id: 'enterprise', name: 'Enterprise (> 10TB)', multiplier: 3 },
  ];

  const complexities = [
    { id: 'simple', name: 'Simple', multiplier: 1 },
    { id: 'moderate', name: 'Moderate', multiplier: 1.3 },
    { id: 'complex', name: 'Complex', multiplier: 1.7 },
    { id: 'enterprise', name: 'Enterprise-grade', multiplier: 2.2 },
  ];

  const timelines = [
    { id: 'standard', name: 'Standard (6-12 weeks)', multiplier: 1 },
    { id: 'accelerated', name: 'Accelerated (3-6 weeks)', multiplier: 1.4 },
    { id: 'urgent', name: 'Urgent (< 3 weeks)', multiplier: 1.8 },
  ];

  const supportLevels = [
    { id: 'none', name: 'No Ongoing Support', price: 0 },
    { id: 'standard', name: 'Standard Support', price: 2500 },
    { id: 'professional', name: 'Professional Support', price: 5000 },
    { id: 'enterprise', name: 'Enterprise Support', price: 10000 },
  ];

  const teamSizes = [
    { id: 'small', name: '1-5 people', multiplier: 1 },
    { id: 'medium', name: '6-20 people', multiplier: 1.2 },
    { id: 'large', name: '21-50 people', multiplier: 1.5 },
    { id: 'enterprise', name: '50+ people', multiplier: 2 },
  ];

  const industries = [
    { id: 'tech', name: 'Technology', multiplier: 1 },
    { id: 'finance', name: 'Financial Services', multiplier: 1.3 },
    { id: 'healthcare', name: 'Healthcare', multiplier: 1.4 },
    { id: 'government', name: 'Government', multiplier: 1.2 },
    { id: 'ecommerce', name: 'E-commerce', multiplier: 1.1 },
    { id: 'other', name: 'Other', multiplier: 1 },
  ];

  const calculateEstimate = () => {
    const projectType = projectTypes.find(p => p.id === formData.projectType);
    const databaseSize = databaseSizes.find(d => d.id === formData.databaseSize);
    const complexity = complexities.find(c => c.id === formData.complexity);
    const timeline = timelines.find(t => t.id === formData.timeline);
    const support = supportLevels.find(s => s.id === formData.support);
    const teamSize = teamSizes.find(ts => ts.id === formData.teamSize);
    const industry = industries.find(i => i.id === formData.industry);

    if (!projectType || !databaseSize || !complexity || !timeline || !support || !teamSize || !industry) {
      return;
    }

    const basePrice = projectType.basePrice;
    const projectMultiplier = databaseSize.multiplier * complexity.multiplier * timeline.multiplier * teamSize.multiplier * industry.multiplier;
    const projectPrice = Math.round(basePrice * projectMultiplier);
    const monthlySupport = support.price;
    const totalFirstYear = projectPrice + (monthlySupport * 12);

    setResult({
      projectPrice,
      monthlySupport,
      totalFirstYear,
      projectType: projectType.name,
      timeline: timeline.name.split('(')[0].trim(),
      support: support.name,
    });
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateEstimate();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetCalculator = () => {
    setFormData({
      projectType: '',
      databaseSize: '',
      complexity: '',
      timeline: '',
      support: '',
      teamSize: '',
      industry: '',
    });
    setResult(null);
    setCurrentStep(1);
  };

  const steps = [
    { title: 'Project Type', field: 'projectType', options: projectTypes },
    { title: 'Database Size', field: 'databaseSize', options: databaseSizes },
    { title: 'Complexity', field: 'complexity', options: complexities },
    { title: 'Timeline', field: 'timeline', options: timelines },
    { title: 'Team Size', field: 'teamSize', options: teamSizes },
    { title: 'Industry', field: 'industry', options: industries },
    { title: 'Support Level', field: 'support', options: supportLevels },
  ];

  const currentStepData = steps[currentStep - 1];

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto transition-colors duration-300"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Your Custom Estimate</h3>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Based on your project requirements</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-azellar-teal/10 to-azellar-cyan/10 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Project Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold ml-2">{result.projectType}</span>
              </div>
              <div>
                <span className="text-gray-600">Timeline:</span>
                <span className="font-semibold ml-2">{result.timeline}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-900">Project Cost:</span>
              <span className="text-2xl font-bold gradient-text">${result.projectPrice.toLocaleString()}</span>
            </div>
            
            {result.monthlySupport > 0 && (
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">Monthly Support:</span>
                <span className="text-xl font-bold text-azellar-teal">${result.monthlySupport.toLocaleString()}/month</span>
              </div>
            )}
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-azellar-navy to-azellar-blue text-white rounded-lg">
              <span className="font-semibold">Total First Year:</span>
              <span className="text-2xl font-bold">${result.totalFirstYear.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is an estimate based on typical project parameters. 
              Final pricing may vary based on specific requirements and scope.
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 btn-outline"
            >
              Calculate Again
            </button>
            <button className="flex-1 btn-primary">
              Get Detailed Quote
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto transition-colors duration-300">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Service Calculator</h3>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Get an instant estimate for your project</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep} of {steps.length}</span>
          <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-azellar-teal to-azellar-cyan h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">{currentStepData.title}</h4>
        
        <div className="space-y-3">
          {currentStepData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setFormData({ ...formData, [currentStepData.field]: option.id })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                formData[currentStepData.field] === option.id
                  ? 'border-azellar-teal bg-azellar-teal/10 text-azellar-navy'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-azellar-teal/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {option.icon && <option.icon className="w-5 h-5" />}
                  <span className="font-medium">{option.name}</span>
                </div>
                {option.basePrice && (
                  <span className="text-sm text-gray-500">
                    Starting at ${option.basePrice.toLocaleString()}
                  </span>
                )}
                {option.price !== undefined && (
                  <span className="text-sm text-gray-500">
                    {option.price === 0 ? 'Free' : `$${option.price.toLocaleString()}/month`}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex-1 btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={!formData[currentStepData.field]}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === steps.length ? 'Calculate' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ServiceCalculator;