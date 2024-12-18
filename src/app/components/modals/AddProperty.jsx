import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Loader from '../layouts/Loader';
import { InputComponent } from '../layouts/InputComponent';
import FileUpload from '../utils/FileUpload';
import { useFetchPropertiesQuery } from '../../redux/services/propertiesService';
import toast from 'react-hot-toast';

const AddProperty = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // Store the uploaded image URL
  const [isFormValid, setIsFormValid] = useState(false); // Track form validation state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const { data, error, isLoading, refetch } = useFetchPropertiesQuery({ page: currentPage, search: debouncedSearch });

  // Watch form values
  const property_name = watch('property_name');
  const address = watch('address');
  const price = watch('price');
  const property_type = watch('property_type');

  // Update form validation state
  useEffect(() => {
    if (property_name && address && price && property_type && imageUrl) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [property_name, address, price, property_type, imageUrl]);

  const onSubmit = async (data) => {
    setIsSaving(true);

    try {
      const response = await axios.post('https://ekohomes.onrender.com/api/v1/createProperty', {
        property_name: data.property_name,
        address: data.address,
        price: data.price,
        property_type: data.property_type,
        image: imageUrl,
      });

      toast.success('Property Added successfully');
      refetch();

      // Reset form and image
      reset({
        property_name: '',
        address: '',
        price: '',
        property_type: '',
      });
      setImageUrl(null);
      onClose();
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (imageUrl) => {
    setImageUrl(imageUrl); // Set the image URL when file upload is successful
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-y-auto">
          <div className="bg-dark text-white p-8 rounded-md shadow-md w-[90%] max-h-[40rem] lg:w-[35rem] mt-6 overflow-y-auto">
            <button onClick={onClose} className="text-white mb-4 mr-auto text-xl">
              X
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="property_name" className="block">
                  Property Name
                </label>
                <InputComponent
                  id="property_name"
                  type="text"
                  {...register('property_name', { required: 'Property name is required' })}
                />
                {errors.property_name && <p className="text-red-500">{errors.property_name.message}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block">
                  Address
                </label>
                <InputComponent
                  id="address"
                  type="text"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block">
                  Price
                </label>
                <InputComponent
                  id="price"
                  type="number"
                  {...register('price', { required: 'Price is required' })}
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
              </div>

              <div>
                <label htmlFor="property_type" className="block">
                  Property Type
                </label>
                <select
                  id="property_type"
                  {...register('property_type', { required: 'Property type is required' })}
                  className="w-full border p-2 border-[#2E3448] mt-3 text-white bg-[#0B1739] outline-none rounded-lg"
                >
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                </select>
                {errors.property_type && <p className="text-red-500">{errors.property_type.message}</p>}
              </div>

              <div className="mt-4">
                <FileUpload onFileUpload={handleFileUpload} />
                {imageUrl && (
                  <img src={imageUrl} alt="Uploaded" className="mt-6 mx-auto h-[15rem]" />
                )}
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>

              <button
                type="submit"
                className={`mt-5 p-2 rounded w-full ${
                    isSaving || isSubmitting || !isFormValid
                      ? 'bg-gray-800 text-gray-700 cursor-not-allowed' // Darker background and cursor change when disabled
                      : 'bg-purple text-white cursor-pointer' // Normal background when enabled
                  }`}
                disabled={isSaving || isSubmitting || !isFormValid}
              >
                {isSaving ? 'Saving...' : 'Add Property'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProperty;
