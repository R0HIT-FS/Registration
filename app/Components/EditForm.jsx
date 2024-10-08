"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



const EditForm = ({data}) => {
   const router = useRouter();
   
    const [formData, setFormData] = useState({
        newName: data.name,
        newAge: data.age,
        newNumber: data.phone,
        newGender:data.gender,
        newPaid:data.paid
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const phone = document.getElementById("phone").value;
            const age = document.getElementById("age").value;

            if(phone.length < 10 || age < 0){
                alert("Contact No. or Age Invalid!");
            } else {
                // Check if a user with the new name already exists, excluding the current user
                const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?name=${encodeURIComponent(formData.newName)}`);
                const existingUsers = await checkRes.json();

                const normalizeName = (name) => name.toLowerCase().replace(/[\s._]/g, '');

                // Filter the results to see if a normalized match exists, excluding the current user's name
                const exactMatch = existingUsers.some(user => 
                    user._id !== data._id && normalizeName(user.name) === normalizeName(formData.newName)
                );

                if (exactMatch) {
                    toast.warn("Another user with this exact name already exists!",{
                        closeOnClick: true,
                        draggable: true,
                        theme: "dark",
                        autoClose: 3000
                    });
                } else {
                    // Proceed with updating the user
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${data._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(formData)
                    });

                    if(res.ok){
                        router.push("/");
                        router.refresh();
                        document.getElementById("addBtn").setAttribute("disabled",true); 
                        document.getElementById("addBtn").classList.add("disabled");  
                        toast.info("Updated Member Successfully",{
                            closeOnClick: true,
                            draggable: true,
                            theme: "dark",
                            autoClose: 3000
                        });
                    } else {
                        throw new Error("Failed to update user!");
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className="p-10 h-screen ">
    <h1 className="text-lg md:text-2xl mb-5 md:mb-10 font-medium text-center">You are editing <b className='uppercase'>{data.name}'s</b> information</h1>   
    <div className="flex justify-center items-center">
        <form className="flex flex-col gap-2 items-start" action="" onSubmit={handleSubmit}>
            <small>Name:</small><input onChange={handleChange} name='newName' value={formData.newName} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="text" placeholder="Enter Name..." />
            <small>Contact:</small><input id='phone' onChange={handleChange} name='newNumber' value={formData.newNumber} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="number" placeholder="Enter Contact Number"/>
            <small>Age:</small><input id='age' onChange={handleChange} name='newAge' value={formData.newAge} className="px-4 py-2 rounded-md border-2 border-zinc-700" type="number" placeholder="Enter Age..." />
            <small>Gender:</small><select onChange={handleChange} name='newGender' value={formData.newGender} className="w-full px-4 py-2 rounded-md border-2 border-zinc-700"  id="">
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <small>Registration Fee Paid:</small><select onChange={handleChange} name='newPaid' value={formData.newPaid} className="w-full px-4 py-2 rounded-md border-2 border-zinc-700"  id="">
                <option value="Registration Fee Paid">Registration Fee Paid</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <button id="addBtn"  className="px-4 py-2 rounded-md text-white bg-green-500">Submit</button>
        </form>
    </div>
    </div>
  )
}

export default EditForm