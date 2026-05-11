import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, TrendingUp, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-xl">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl text-surface-900 tracking-tight">
                Clariva<span className="text-primary-600">.ai</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-surface-900 mb-6">
              Your AI-Powered <br/>
              <span className="text-gradient">Business Growth Coach</span>
            </h1>
            <p className="text-xl text-surface-600 mb-10 max-w-2xl mx-auto">
              Scale your SME with personalized, data-driven coaching. Clariva AI analyzes your business context to provide actionable strategies and continuous support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg group">
                  Start Coaching Now
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface-50 to-transparent z-10 h-full w-full bottom-0" style={{ top: '60%' }} />
            <div className="glass-card rounded-2xl p-4 md:p-8 shadow-elevated border border-white/60 mx-auto max-w-5xl">
              <div className="bg-surface-900 rounded-xl overflow-hidden shadow-2xl aspect-[16/9] relative flex items-center justify-center">
                 {/* Dashboard Preview Placeholder */}
                 <div className="text-center">
                   <Bot className="w-16 h-16 text-primary-400 mx-auto mb-4 opacity-50" />
                   <p className="text-surface-400 font-display text-xl">Dashboard Interface Preview</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4">Intelligent coaching for modern founders</h2>
            <p className="text-lg text-surface-600">Everything you need to navigate the complexities of growing a business.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-6 h-6 text-primary-600" />,
                title: "Growth Strategy",
                desc: "Get actionable steps to increase revenue and optimize operations based on proven business frameworks."
              },
              {
                icon: <Target className="w-6 h-6 text-primary-600" />,
                title: "Goal Tracking",
                desc: "Set and monitor key objectives. Your AI coach keeps you accountable and adjusts plans dynamically."
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-primary-600" />,
                title: "On-Demand Expertise",
                desc: "Access strategic advice 24/7. From marketing to finance, get answers when you need them most."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl glass-card bg-surface-50/50 hover:bg-white transition-all shadow-soft hover:shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">{feature.title}</h3>
                <p className="text-surface-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to scale your business?</h2>
          <p className="text-xl text-primary-100 mb-10">Join forward-thinking founders using Clariva to unlock their full potential.</p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary-900 hover:bg-surface-50 text-lg px-8">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-950 py-12 border-t border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Bot className="w-6 h-6 text-primary-500" />
            <span className="font-display font-bold text-xl text-white">
              Clariva<span className="text-primary-500">.ai</span>
            </span>
          </div>
          <p className="text-surface-400">© 2026 Clariva AI Business Coach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
