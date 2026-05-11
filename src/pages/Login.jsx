import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const data = await authService.login(formData.email, formData.password);
      login(data.user, data.token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-200/50 blur-3xl filter" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-200/50 blur-3xl filter" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-primary-600 p-2 rounded-xl shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-surface-900 tracking-tight">
              Clariva<span className="text-primary-600">.ai</span>
            </span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-surface-900">Welcome back</h2>
          <p className="text-surface-500 mt-2">Log in to continue your coaching sessions</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-card border border-white/60">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-surface-400" />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                className="pl-11"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-surface-400" />
              </div>
              <Input
                type="password"
                placeholder="Password"
                className="pl-11"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-surface-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
