'use client';

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, X, FileImage, ChevronDown } from 'lucide-react';

export default function ImageUploader({ onImageLoad, uploadedImage, onClear }) {
  const [dragOver, setDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setDragOver(false);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        onImageLoad({
          file,
          url,
          name: file.name,
          size: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          type: file.type,
        });
      };
      img.src = url;
    }
  }, [onImageLoad]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
    },
    multiple: false,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false),
  });

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!uploadedImage ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            {...getRootProps()}
            className={`relative cursor-pointer rounded-2xl p-12 text-center transition-all duration-300 ${isDragActive || dragOver ? 'dropzone-active' : ''}`}
            style={{
              border: `2px dashed ${isDragActive ? '#7c3aed' : 'var(--border-color)'}`,
              background: isDragActive
                ? 'rgba(124, 58, 237, 0.04)'
                : 'var(--bg-secondary)',
            }}
          >
            <input {...getInputProps()} />

            {/* Animated upload icon */}
            <motion.div
              animate={isDragActive ? { scale: 1.1, y: -8 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center mb-6"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: isDragActive
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.2))'
                    : 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: isDragActive ? '0 0 30px rgba(124,58,237,0.2)' : 'none',
                }}
              >
                <Upload
                  size={32}
                  style={{
                    color: isDragActive ? '#7c3aed' : 'var(--text-muted)',
                  }}
                />
              </div>
            </motion.div>

            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {isDragActive ? 'Drop it here!' : 'Drop your image here'}
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              or click to browse — JPG, PNG, WEBP, GIF, BMP supported
            </p>

            {/* Format badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {['JPG', 'PNG', 'WEBP', 'GIF', 'BMP'].map(fmt => (
                <span
                  key={fmt}
                  className="badge"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {fmt}
                </span>
              ))}
            </div>

            {/* Privacy note */}
            <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
              🔒 Images are processed locally. Never uploaded to any server.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
            }}
          >
            {/* Image preview */}
            <div
              className="relative flex items-center justify-center"
              style={{
                background: 'repeating-conic-gradient(var(--bg-secondary) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px',
                minHeight: '280px',
                maxHeight: '400px',
              }}
            >
              <img
                src={uploadedImage.url}
                alt="Preview"
                className="max-w-full object-contain"
                style={{ maxHeight: '380px' }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClear}
                className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* File info bar */}
            <div
              className="px-4 py-3 flex flex-wrap items-center gap-4 text-sm"
              style={{
                borderTop: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <div className="flex items-center gap-2">
                <FileImage size={14} />
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {uploadedImage.name.length > 30
                    ? uploadedImage.name.slice(0, 27) + '...'
                    : uploadedImage.name}
                </span>
              </div>
              <span>•</span>
              <span>{uploadedImage.width} × {uploadedImage.height} px</span>
              <span>•</span>
              <span>{formatBytes(uploadedImage.size)}</span>
              <span>•</span>
              <span>{uploadedImage.type.split('/')[1].toUpperCase()}</span>
              <button
                {...getRootProps()}
                className="ml-auto text-xs px-3 py-1.5 rounded-lg font-medium"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <input {...getInputProps()} />
                Change Image
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
