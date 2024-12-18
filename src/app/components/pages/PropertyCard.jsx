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
        className="object-cover w-full h-[10rem] rounded-t-lg"
      />
      <div className='p-4'>
      <h1 className='text-lg font-semibold  line-clamp-1 mt-2'>{property.property_name}</h1>
     <div className='flex items-center justify-between  w-full'>
     <h1 className='text-xl text-gray-300 font-bold mt-2'>${property.price.toLocaleString()}</h1>

     <p className='bg-purple  px-2 py-1 font-semibold text-sm rounded-md'>{property.property_type}</p>
     </div>
      <p className='mt-2 line-clamp-1'>{property.address}</p>
     
      </div>
    </div>
  );
};

export default PropertyCard;
