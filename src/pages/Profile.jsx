import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Target,
  AlertCircle,
  Save,
  Briefcase,
  Users
} from 'lucide-react';

import toast from 'react-hot-toast';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import DocxUpload from '../components/DocxUpload';

import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import api from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    business_size: '',
    goals: '',
    challenges: '',
  });

  // RAG documents state
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchDocs = async () => {
    if (!user) return;
    try {
      const res = await api.get('/rag/documents');
      setDocs(res.data.documents || []);
    } catch (err) {
      console.error('Failed to fetch docs', err);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.name.endsWith('.docx')) {
      toast.error('Only .docx files are supported');
      return;
    }

    const form = new FormData();
    form.append('file', file, file.name);

    try {
      setUploading(true);
      setUploadProgress(0);

      const res = await api.post('/rag/upload', form, {
        // Do NOT set Content-Type header — let the browser set the correct
        // multipart/form-data boundary automatically.
        onUploadProgress: (e) => {
          if (e.total) setUploadProgress(Math.round((e.loaded / e.total) * 100));
        },
      });

      toast.success('Document uploaded');
      setUploadProgress(0);
      fetchDocs();
    } catch (err) {
      console.error('Upload failed', err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/rag/documents/${id}`);
      toast.success('Document deleted');
      fetchDocs();
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        business_name: user.business_name || '',
        industry: user.industry || '',
        business_size: user.business_size || '',
        goals: user.goals || '',
        challenges: user.challenges || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setIsLoading(true);

      const data = await authService.updateProfile(formData);
      updateUser(data.profile);

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-surface-50 flex flex-col">
      {/* SCROLLABLE CONTENT AREA */}
      <div
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E1 transparent',
          paddingBottom: '6rem'
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-surface-900">
              Business Profile
            </h1>
            <p className="text-surface-500 mt-1">
              Manage your business details to get better coaching
            </p>
          </motion.div>

          {/* FORM */}
          <form className="space-y-6">
            {/* BASIC INFO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 md:p-8 shadow-sm border bg-white"
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Business Name</label>
                  <Input
                    value={formData.business_name}
                    onChange={(e) =>
                      setFormData({ ...formData, business_name: e.target.value })
                    }
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <Input
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    placeholder="Enter industry"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Business Size</label>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                    {['1 (Solo)', '2-10', '11-50', '51-200', '201+'].map((size) => (
                      <div
                        key={size}
                        onClick={() =>
                          setFormData({ ...formData, business_size: size })
                        }
                        className={`p-3 rounded-xl border text-center cursor-pointer text-sm ${formData.business_size === size
                            ? 'bg-primary-50 border-primary-500 text-primary-700'
                            : 'hover:border-primary-300'
                          }`}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* GOALS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 md:p-8 shadow-sm border bg-white"
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-500" />
                Goals & Challenges
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">
                    Main Goal (Next 6 months)
                  </label>

                  <textarea
                    className="w-full min-h-28 mt-2 rounded-xl border px-4 py-3 text-sm resize-y"
                    value={formData.goals}
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                    placeholder="Describe your goals..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Biggest Challenge
                  </label>

                  <textarea
                    className="w-full min-h-28 mt-2 rounded-xl border px-4 py-3 text-sm resize-y"
                    value={formData.challenges}
                    onChange={(e) =>
                      setFormData({ ...formData, challenges: e.target.value })
                    }
                    placeholder="Describe your challenges..."
                    rows={4}
                  />
                </div>
              </div>
            </motion.div>

            {/* Extra spacing div to ensure bottom content is visible */}
            <div className="h-4"></div>
            {/* RAG Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 md:p-8 shadow-sm border bg-white"
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-500" />
                Waterwheel Modules
              </h2>

              <div className="space-y-4">
                <DocxUpload onUploaded={fetchDocs} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {docs.map((d) => (
                    <div key={d.id} className="p-4 rounded-xl border bg-gray-50 flex justify-between items-start">
                      <div>
                        <div className="font-medium">{d.filename}</div>
                        <div className="text-xs text-surface-500">{new Date(d.upload_date).toLocaleString()}</div>
                        <div className="text-xs text-surface-500">Chunks: {d.chunks_indexed || '—'}</div>
                      </div>
                      <div>
                        <Button variant="ghost" onClick={() => handleDelete(d.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </div>

      {/* FIXED SAVE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-20">
        <div className="max-w-3xl mx-auto flex justify-end">
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            className="w-full md:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;