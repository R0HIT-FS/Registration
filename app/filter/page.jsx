
import React from 'react';
import FilterAgeFrom from "../Components/FilterAgeFrom"
import Link from 'next/link';
import { IoMdArrowBack } from "react-icons/io";

const FilterByAge = async (minage, maxage) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter?minAge=${minage}&maxAge=${maxage}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch users!');
    }
    
    return res.json();
  } catch (error) {
    console.log(error);
    return []; // Return an empty array on error
  }
};

const Page = async ({ searchParams }) => {
  const min = searchParams.minAge || '';
  const max = searchParams.maxAge || '';
  const filteredUsers = await FilterByAge(min, max);

  return (
    <div className='p-5 min-h-screen'>
          <Link href={"/"} className='mb-10 inline-block'><p className='w-fit flex items-center gap-2  px-2 rounded-full hover:bg-slate-300'><IoMdArrowBack /><span>Back To Home</span></p></Link>
      <FilterAgeFrom />
      <p className='text-center font-medium mt-4 px-10'>
      ({filteredUsers.length}) Members found between the ages of {min} and {max} 
      </p> 
      <div className='px-10 py-5 flex flex-col md:flex-row flex-wrap gap-3'>
        {filteredUsers &&filteredUsers.length > 0 ? 
          filteredUsers.map((user) => (
            <p key={user._id} className='bg-[#E9C46A] text-center md:text-left text-sm md:text-lg capitalize whitespace-nowrap rounded-lg px-2 p-1'>
              {user.name} ({user.age})
            </p>
          )) : 
          <p className='text-center font-light text-lg text-gray-500 w-full'>
            Couldn't find members in the specified range!
          </p>
        }
      </div>
    </div>
  );
};

export default Page;