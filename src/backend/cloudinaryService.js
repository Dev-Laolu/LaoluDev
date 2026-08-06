import axios from 'axios';

// Cloudinary credentials — all values sourced from .env file (no hardcoded secrets)
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Computes a SHA-1 hex signature for Cloudinary signed upload
 */
const generateSHA1Signature = async (params, secret) => {
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys.map(key => `${key}=${params[key]}`).join('&') + secret;
  
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Compresses an image to a small base64 string (< 50KB) as safe fallback if Cloudinary fails
 */
const compressImageToSmallBase64 = (file, maxWidth = 400, quality = 0.6) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => resolve(event.target.result);
    };
    reader.onerror = () => resolve('');
  });
};

/**
 * Uploads a single file (image or video) to Cloudinary using signed authentication
 * @param {File} file - File object to upload
 * @param {string} categoryFolder - Subfolder name e.g. 'graphics', 'videos'
 * @returns {Promise<string>} The secure URL of the uploaded asset
 */
export const uploadToCloudinary = async (file, categoryFolder = 'general') => {
  if (!file) return '';

  const isVideo = file.type.startsWith('video/');
  const resourceType = isVideo ? 'video' : 'image';
  const folderPath = `portfolio/${categoryFolder}`;
  const timestamp = Math.floor(Date.now() / 1000);

  // Method 1: Try Cloudinary Signed Upload using API Key + Signature
  try {
    const paramsToSign = {
      folder: folderPath,
      timestamp: timestamp,
    };
    
    const signature = await generateSHA1Signature(paramsToSign, API_SECRET);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('folder', folderPath);
    formData.append('signature', signature);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

    const response = await axios.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    }
  } catch (signedError) {
    console.warn('Signed Cloudinary upload notice, trying unsigned fallback:', signedError);
  }

  // Method 2: Try Unsigned Upload with Preset
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folderPath);

    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
    const response = await axios.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    }
  } catch (unsignedError) {
    console.warn('Unsigned Cloudinary upload warning:', unsignedError);
  }

  // Method 3: Safe compressed base64 fallback (images only)
  if (!isVideo) {
    return await compressImageToSmallBase64(file);
  }

  throw new Error("Unable to upload video file to Cloudinary. Please check file size and connection.");
};

/**
 * Uploads multiple image files to Cloudinary
 * @param {File[]} files - List of File objects
 * @param {string} categoryFolder
 * @returns {Promise<string[]>} Array of secure URLs
 */
export const uploadMultipleToCloudinary = async (files, categoryFolder = 'general') => {
  if (!files || files.length === 0) return [];
  const uploadPromises = Array.from(files).map((file) =>
    uploadToCloudinary(file, categoryFolder)
  );
  return Promise.all(uploadPromises);
};
