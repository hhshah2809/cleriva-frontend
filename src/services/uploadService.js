import api from './api';

export const uploadService = {
  async uploadFile(file, onProgress) {
    const formData = new FormData();

    // VERY IMPORTANT
    formData.append('file', file);

    console.log('[uploadService] Uploading:', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    const response = await api.post(
      '/rag/upload',
      formData,
      {
        // DO NOT manually set Content-Type
        // Browser automatically adds multipart boundary

        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) /
            progressEvent.total
          );

          if (onProgress) {
            onProgress(percent);
          }
        },
      }
    );

    return response.data;
  },
};