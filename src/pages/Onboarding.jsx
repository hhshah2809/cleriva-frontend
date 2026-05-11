import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Users,
  Target,
  AlertCircle,
  Building2
} from 'lucide-react';

import toast from 'react-hot-toast';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

const Onboarding = () => {
  const navigate = useNavigate();

  const updateUser = useAuthStore((state) => state.updateUser);

  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  // USING SNAKE_CASE EVERYWHERE
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    business_size: '',
    goals: '',
    challenges: ''
  });

  const totalSteps = 3;

  // NEXT STEP VALIDATION
  const handleNext = () => {
    if (
      step === 1 &&
      (!formData.business_name || !formData.industry)
    ) {
      toast.error('Please fill in required fields');
      return;
    }

    if (
      step === 2 &&
      !formData.business_size
    ) {
      toast.error('Please select business size');
      return;
    }

    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // FINAL SUBMIT
  const handleSubmit = async () => {
    if (
      !formData.goals ||
      !formData.challenges
    ) {
      toast.error('Please complete all fields');
      return;
    }

    try {
      setIsLoading(true);

      console.log('FINAL PAYLOAD:', formData);

      const data = await authService.updateProfile(formData);

      updateUser({
        ...data.profile,
        isOnboarded: true
      });

      toast.success('Profile created successfully!');

      navigate('/dashboard');

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
        'Failed to save profile'
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">

      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary-600 p-2 rounded-xl shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-display font-bold text-surface-900 mb-2">
            Let's set up your profile
          </h2>

          <p className="text-surface-500">
            Help Clariva understand your business for better coaching
          </p>

        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8">

          <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: '33%' }}
              animate={{
                width: `${(step / totalSteps) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-surface-500 font-medium">
            <span>Basics</span>
            <span>Scale</span>
            <span>Goals</span>
          </div>

        </div>

        {/* CARD */}
        <div className="glass-card rounded-2xl shadow-elevated border border-white/60 p-6 md:p-10 min-h-[400px] flex flex-col">

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-6"
              >

                <div className="space-y-4">

                  {/* BUSINESS NAME */}
                  <div>

                    <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Business Name
                    </label>

                    <Input
                      placeholder="e.g. Acme Corp"
                      value={formData.business_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          business_name: e.target.value
                        })
                      }
                    />

                  </div>

                  {/* INDUSTRY */}
                  <div>

                    <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-2">
                      <Building2 className="w-4 h-4" />
                      Industry
                    </label>

                    <Input
                      placeholder="e.g. SaaS, Retail, E-commerce"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          industry: e.target.value
                        })
                      }
                    />

                  </div>

                </div>

              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-6"
              >

                <div>

                  <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-4">
                    <Users className="w-4 h-4" />
                    Business Size (Employees)
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    {[
                      '1 (Solo)',
                      '2-10',
                      '11-50',
                      '51-200',
                      '201+'
                    ].map((size) => (

                      <div
                        key={size}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            business_size: size
                          })
                        }
                        className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                          formData.business_size === size
                            ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium ring-1 ring-primary-500'
                            : 'border-surface-200 bg-white text-surface-600 hover:border-primary-300'
                        }`}
                      >
                        {size}
                      </div>

                    ))}

                  </div>

                </div>

              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-6"
              >

                <div className="space-y-4">

                  {/* GOALS */}
                  <div>

                    <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-2">
                      <Target className="w-4 h-4" />
                      Main Goal for next 6 months
                    </label>

                    <textarea
                      className="w-full h-24 rounded-xl glass-input px-4 py-3 text-sm resize-none"
                      placeholder="e.g. Increase recurring revenue by 20%"
                      value={formData.goals}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          goals: e.target.value
                        })
                      }
                    />

                  </div>

                  {/* CHALLENGES */}
                  <div>

                    <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      Biggest Challenge
                    </label>

                    <textarea
                      className="w-full h-24 rounded-xl glass-input px-4 py-3 text-sm resize-none"
                      placeholder="e.g. Customer acquisition cost is too high"
                      value={formData.challenges}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          challenges: e.target.value
                        })
                      }
                    />

                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

          {/* FOOTER */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-surface-100">

            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || isLoading}
              className={
                step === 1
                  ? 'opacity-0 pointer-events-none'
                  : ''
              }
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {step < totalSteps ? (

              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

            ) : (

              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Complete Profile
                <Bot className="w-4 h-4 ml-2" />
              </Button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Onboarding;