import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  MessageSquare, 
  Calendar,
  DollarSign,
  Users,
  Database,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdvancedContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Validation schemas for each step
  const step1Schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number'),
    company: yup.string().required('Company name is required'),
    jobTitle: yup.string().required('Job title is required'),
  });

  const step2Schema = yup.object({
    projectType: yup.string().required('Please select a project type'),
    budget: yup.string().required('Please select a budget range'),
    timeline: yup.string().required('Please select a timeline'),
    teamSize: yup.string().required('Please select team size'),
  });

  const step3Schema = yup.object({
    currentChallenges: yup.string().required('Please describe your current challenges'),
    goals: yup.string().required('Please describe your goals'),
    additionalInfo: yup.string(),
    preferredContact: yup.string().required('Please select preferred contact method'),
  });

  const schemas = [step1Schema, step2Schema, step3Schema];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getValues,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schemas[currentStep - 1]),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const steps = [
    {
      title: 'Personal Information',
      description: 'Tell us about yourself and your company',
      icon: User,
    },
    {
      title: 'Project Details',
      description: 'Help us understand your project requirements',
      icon: Database,
    },
    {
      title: 'Requirements & Goals',
      description: 'Share your challenges and objectives',
      icon: MessageSquare,
    },
  ];

  const projectTypes = [
    { id: 'consulting', name: 'Database Consulting', icon: Database },
    { id: 'performance', name: 'Performance Tuning', icon: ArrowRight },
    { id: 'migration', name: 'Database Migration', icon: ArrowRight },
    { id: 'devops', name: 'DevOps Automation', icon: Users },
    { id: 'security', name: 'Security Audit', icon: CheckCircle },
    { id: 'training', name: 'Team Training', icon: Users },
  ];

  const budgetRanges = [
    { id: 'small', name: '$5K - $15K', description: 'Small project' },
    { id: 'medium', name: '$15K - $50K', description: 'Medium project' },
    { id: 'large', name: '$50K - $100K', description: 'Large project' },
    { id: 'enterprise', name: '$100K+', description: 'Enterprise project' },
  ];

  const timelines = [
    { id: 'urgent', name: 'ASAP (< 2 weeks)', urgent: true },
    { id: 'fast', name: '2-4 weeks' },
    { id: 'standard', name: '1-3 months' },
    { id: 'flexible', name: '3+ months' },
  ];

  const teamSizes = [
    { id: 'small', name: '1-5 people' },
    { id: 'medium', name: '6-20 people' },
    { id: 'large', name: '21-50 people' },
    { id: 'enterprise', name: '50+ people' },
  ];

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setFormData(prev => ({ ...prev, ...getValues() }));
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    console.log('Form submitted:', finalData);
    
    // Simulate API call
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        loading: 'Submitting your request...',
        success: 'Thank you! We\'ll be in touch within 24 hours.',
        error: 'Something went wrong. Please try again.',
      }
    );
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              {...register('firstName')}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...register('lastName')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            {...register('email')}
            type="email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@company.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              {...register('phone')}
              type="tel"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            {...register('jobTitle')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
              errors.jobTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="CTO, Lead Developer, etc."
          />
          {errors.jobTitle && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.jobTitle.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            {...register('company')}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your Company Inc."
          />
        </div>
        {errors.company && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.company.message}
          </p>
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Project Type *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projectTypes.map((type) => (
            <label
              key={type.id}
              className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                watchedValues.projectType === type.id
                  ? 'border-azellar-teal bg-azellar-teal/5'
                  : 'border-gray-300 hover:border-azellar-teal/50'
              }`}
            >
              <input
                {...register('projectType')}
                type="radio"
                value={type.id}
                className="sr-only"
              />
              <type.icon className="w-5 h-5 text-azellar-teal mr-3" />
              <span className="font-medium">{type.name}</span>
              {watchedValues.projectType === type.id && (
                <CheckCircle className="w-5 h-5 text-azellar-teal ml-auto" />
              )}
            </label>
          ))}
        </div>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.projectType.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Budget Range *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {budgetRanges.map((budget) => (
            <label
              key={budget.id}
              className={`relative flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                watchedValues.budget === budget.id
                  ? 'border-azellar-teal bg-azellar-teal/5'
                  : 'border-gray-300 hover:border-azellar-teal/50'
              }`}
            >
              <input
                {...register('budget')}
                type="radio"
                value={budget.id}
                className="sr-only"
              />
              <div>
                <div className="font-medium">{budget.name}</div>
                <div className="text-sm text-gray-500">{budget.description}</div>
              </div>
              {watchedValues.budget === budget.id && (
                <CheckCircle className="w-5 h-5 text-azellar-teal" />
              )}
            </label>
          ))}
        </div>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.budget.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Timeline *
          </label>
          <div className="space-y-2">
            {timelines.map((timeline) => (
              <label
                key={timeline.id}
                className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  watchedValues.timeline === timeline.id
                    ? 'border-azellar-teal bg-azellar-teal/5'
                    : 'border-gray-300 hover:border-azellar-teal/50'
                }`}
              >
                <input
                  {...register('timeline')}
                  type="radio"
                  value={timeline.id}
                  className="sr-only"
                />
                <span className={`font-medium ${timeline.urgent ? 'text-red-600' : ''}`}>
                  {timeline.name}
                </span>
                {watchedValues.timeline === timeline.id && (
                  <CheckCircle className="w-5 h-5 text-azellar-teal ml-auto" />
                )}
              </label>
            ))}
          </div>
          {errors.timeline && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.timeline.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Team Size *
          </label>
          <div className="space-y-2">
            {teamSizes.map((size) => (
              <label
                key={size.id}
                className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  watchedValues.teamSize === size.id
                    ? 'border-azellar-teal bg-azellar-teal/5'
                    : 'border-gray-300 hover:border-azellar-teal/50'
                }`}
              >
                <input
                  {...register('teamSize')}
                  type="radio"
                  value={size.id}
                  className="sr-only"
                />
                <span className="font-medium">{size.name}</span>
                {watchedValues.teamSize === size.id && (
                  <CheckCircle className="w-5 h-5 text-azellar-teal ml-auto" />
                )}
              </label>
            ))}
          </div>
          {errors.teamSize && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.teamSize.message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Challenges *
        </label>
        <textarea
          {...register('currentChallenges')}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
            errors.currentChallenges ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe the main challenges you're facing with your current database setup..."
        />
        {errors.currentChallenges && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.currentChallenges.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Goals & Objectives *
        </label>
        <textarea
          {...register('goals')}
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent ${
            errors.goals ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="What do you hope to achieve with this project? What does success look like?"
        />
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.goals.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Information
        </label>
        <textarea
          {...register('additionalInfo')}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azellar-teal focus:border-transparent"
          placeholder="Any additional details you'd like to share..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Preferred Contact Method *
        </label>
        <div className="space-y-2">
          {[
            { value: 'email', label: 'Email', icon: Mail },
            { value: 'phone', label: 'Phone Call', icon: Phone },
            { value: 'video', label: 'Video Conference', icon: Calendar },
          ].map((method) => (
            <label
              key={method.value}
              className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                watchedValues.preferredContact === method.value
                  ? 'border-azellar-teal bg-azellar-teal/5'
                  : 'border-gray-300 hover:border-azellar-teal/50'
              }`}
            >
              <input
                {...register('preferredContact')}
                type="radio"
                value={method.value}
                className="sr-only"
              />
              <method.icon className="w-5 h-5 text-azellar-teal mr-3" />
              <span className="font-medium">{method.label}</span>
              {watchedValues.preferredContact === method.value && (
                <CheckCircle className="w-5 h-5 text-azellar-teal ml-auto" />
              )}
            </label>
          ))}
        </div>
        {errors.preferredContact && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.preferredContact.message}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-azellar-navy to-azellar-blue text-white p-8">
        <h2 className="text-3xl font-bold mb-2">Get Started with Azellar</h2>
        <p className="text-azellar-aqua">Tell us about your project and we'll provide a customized solution</p>
      </div>

      {/* Progress Bar */}
      <div className="px-8 py-6 bg-gray-50 border-b">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep > index + 1 
                  ? 'bg-azellar-teal border-azellar-teal text-white' 
                  : currentStep === index + 1
                  ? 'border-azellar-teal text-azellar-teal'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > index + 1 ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-1 mx-4 ${
                  currentStep > index + 1 ? 'bg-azellar-teal' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-2 btn-primary"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center space-x-2 btn-primary"
            >
              <span>Submit Request</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdvancedContactForm;