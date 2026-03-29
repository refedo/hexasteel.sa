import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  currentImage?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, currentImage, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative">
            <div className="relative h-48 w-full">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="space-y-2 py-8">
            <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto" />
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the image here</p>
              ) : (
                <p>Drag & drop an image here, or click to select</p>
              )}
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, or WEBP (max. 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
