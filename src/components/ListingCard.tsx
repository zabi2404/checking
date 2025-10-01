import React from 'react'
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

type ListingCardProps = {
  listing:any,
  image:string,
}

export default function ListingCard({listing,image}:ListingCardProps) {
  console.log(listing.imageUrls)

    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
          <Link to={`/listing/${listing._id}`}>
            <img
                src={image == null || undefined ? '../../public/images/9024-Main-Image_1600x.webp' : image}

              className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
            />
            <div className='p-3 flex flex-col gap-2 w-full'>
              <p className='truncate text-lg font-semibold text-slate-700'>
                {listing.name}
              </p>
              <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700' />
                <p className='text-sm text-gray-600 truncate w-full'>
                  {listing.address}
                </p>
              </div>
              <p className='text-sm text-gray-600 line-clamp-2'>
                {listing.description}
              </p>
              <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountedPrice
              : listing.regularPrice}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedroom > 1
                ? `${listing.bedroom} beds `
                : `${listing.bedroom} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathroom > 1
                ? `${listing.bathroom} baths `
                : `${listing.bathroom} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
