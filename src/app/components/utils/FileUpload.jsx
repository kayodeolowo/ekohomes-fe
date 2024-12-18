import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FileUpload = ({ onFileUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name); // Set the file name

      const formData = new FormData();
      formData.append('file', file);

      try {
        setIsUploading(true);
        const response = await axios.post(
          "https://ekohomes.onrender.com/api/v1/upload",  // Update with your actual API URL
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200 && response.data.success) {
          const fileUrl = response.data.imageUrl;
          toast.success('Image uploaded successfully.');
          onFileUpload(fileUrl); // Pass the URL to the parent component
        } else {
          toast.error('Failed to upload image.');
        }
      } catch (error) {
       
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="flex flex-col rounded-lg border-[#2E3448] border items-center">
      <Toaster position="top-right" />

      {/* Custom file upload button */}
      <button
        type="button"
        onClick={triggerFileInput}
        disabled={isUploading}
        className="text-purple text-sm font-semibold text-center mt-4 mb-10 disabled:opacity-50"
      >
        {isUploading ? (
          <span className="flex items-center text-green-500 text-sm font-semibold">
            <AiOutlineLoading3Quarters className="animate-spin mr-2" /> Uploading...
          </span>
        ) : (
          'Upload Photo'
        )}
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isUploading}
      />
      
      {fileName && (
        <p className="text-sm text-gray-500 mt-2">File selected: {fileName}</p>
      )}
    </div>
  );
};

export default FileUpload;
