import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Upload, AlertCircle, Loader } from 'lucide-react';

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Model name is required')
    .min(1, 'Model name cannot be empty'),
  file: yup
    .mixed()
    .required('GLB file is required')
    .test('fileType', 'Only .glb files are allowed', (value) => {
      return value && value.name.endsWith('.glb');
    })
    .test('fileSize', 'File size must be less than 100MB', (value) => {
      return value && value.size <= MAX_FILE_SIZE;
    }),
});

const UploadForm = ({ onUpload, loading, error }) => {
  const [isDragging, setIsDragging] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', file: null },
  });

  const onSubmit = (data) => {
    onUpload(data);
    reset(); // clear form after submission
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setValue('file', droppedFile, { shouldValidate: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-6 border border-purple-500/10 shadow-inner backdrop-blur-md space-y-6"
    >
      <h2 className="text-xl font-semibold text-purple-200">Upload New Model</h2>

      <div className="p-4 sm:p-6 md:p-8">
        <label className="block text-sm font-medium text-purple-300 mb-2">Model Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter model name..."
              className={`w-full px-4 py-3 rounded-lg bg-black/30 border text-white placeholder-purple-400 focus:outline-none focus:ring-2 transition ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-purple-500/20 focus:ring-purple-500'
              }`}
            />
          )}
        />
        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">GLB File</label>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <div
              className={`relative border-2 border-dashed rounded-lg px-6 py-12 text-center transition-all duration-200 cursor-pointer ${
                isDragging
                  ? 'border-purple-400 bg-purple-800/20'
                  : 'border-purple-500/20 hover:border-purple-400 hover:bg-purple-800/10'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                handleDrop(e);
              }}
            >
              <Upload className="mx-auto mb-4 text-purple-400" size={40} />
              <p className="text-purple-300">
                {field.value ? field.value.name : 'Drop your GLB file here or click to browse'}
              </p>
              <input
                type="file"
                accept=".glb"
                onChange={(e) => field.onChange(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        />
        {errors.file && <p className="text-sm text-red-400 mt-1">{errors.file.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-[1.01] active:scale-[0.98]"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader size={18} className="animate-spin" />
            Uploading...
          </span>
        ) : (
          'Upload Model'
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} className="text-red-400" />
          <p className="text-red-300">{error}</p>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
