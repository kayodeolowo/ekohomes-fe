// PropertyCard.js
import React from 'react';
import Image from 'next/image';

const PropertyCard = ({ property }) => {
  return (
    <div className='bg-[#0B1739] hover:cursor-pointer text-white border-[#2E3448] rounded-lg relative '>
      <Image 
        src={property.image} 
        width={300} 
        height={300} 
        alt={property.property_name} 
        className="object-cover w-full rounded-t-lg"
      />
      <div className='p-4'>
      <h1 className='text-xl font-semibold  line-clamp-1 mt-2'>{property.property_name}</h1>
     <div className='flex items-center justify-between  w-full'>
     <h1 className='text-2xl text-gray-300 font-bold mt-2'>${property.price.toLocaleString()}</h1>

     <p>{property.property_type}</p>
     </div>
      <p className='mt-2 line-clamp-1'>{property.address}</p>
     
      </div>
    </div>
  );
};

export default PropertyCard;
