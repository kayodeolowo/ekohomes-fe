import React from 'react';
import { useFetchPropertiesIdQuery } from '../../redux/services/propertiesService';

const ViewProperty = ({ isOpen, onClose, id }) => {
  // Fetch property details based on the id passed to the modal
  const { data, error, isLoading } = useFetchPropertiesIdQuery(id);

  // Handle loading and error states more gracefully
  if (isLoading) return <div className="text-center">Loading property details...</div>;
  if (error) return <div className="text-center text-red-500">Error loading property details.</div>;

  // Check if property data is available
  const property = data?.data; // Access the actual property details

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-y-auto scrollbar-hide">
          <div className="bg-dark text-white p-8 rounded-md shadow-md w-[90%] max-h-[40rem] lg:w-[30rem] mt-6 scrollbar-hide overflow-y-auto">
            <button onClick={onClose} className="text-white mb-6 mr-auto text-xl">
              X
            </button>

            {/* Display property details */}
            {property ? (
              <div>
                {property.image && <img src={property.image} alt={property.property_name} className="w-full rounded-lg md:h-[20rem]" />}
                <h2 className="text-3xl  mt-8 font-bold">{property.property_name}</h2>
                <p>{property.address}</p>
                <p>{`Price: $${property.price.toLocaleString()}`}</p>
                <p>{`Type: ${property.property_type}`}</p>
                
                {/* Add any other property details here */}
              </div>
            ) : (
              <div className="text-center text-gray-500">No property details found.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProperty;
