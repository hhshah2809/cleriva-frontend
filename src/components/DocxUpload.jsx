import React, { useRef, useState } from 'react';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';
import { uploadService } from '../services/uploadService';

export default function DocxUpload({ onUploaded }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePick = () => fileRef.current && fileRef.current.click();

  const handleChange = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.docx')) {
      toast.error('Only .docx files are supported');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      const res = await uploadService.uploadFile(f, (p) => setProgress(p));
      toast.success('Uploaded');
      if (onUploaded) onUploaded(res);
    } catch (err) {
      console.error('Upload error', err);
      toast.error(err?.response?.data || err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileRef.current) fileRef.current.value = null;
    }
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary-300">
      <input
        ref={fileRef}
        type="file"
        accept=".docx"
        className="hidden"
        onChange={handleChange}
      />
      <div className="text-sm text-surface-600">Drag & drop or</div>
      <Button type="button" className="mt-3" onClick={handlePick} disabled={uploading}>
        {uploading ? `Uploading ${progress}%` : 'Upload .docx'}
      </Button>
    </div>
  );
}
