import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import DeleteButton from "./DeleteButton";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MemberCard = async ({ user }) => {
  const colors = [
    "#EAE7E2",
    "#D7E2E8",
    "#B9CBD9",
    "#FCC9C5",
    "#FEDDD8",
    "#CFE3E2",
    "#fcc3a3",
    "#faedcd",
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    return randomColor;
  }
  const myRandomColor = getRandomColor();

  function getInitials(fullName) {
    const names = fullName.split(" ");
    let initials = "";
    names.forEach((name) => {
      if (name.trim() !== "") {
        initials += name[0].toUpperCase();
      }
    });
    return initials;
  }
  const initials = getInitials(user.name);

  return (
    // <div
    //   className="card w-[60vw] md:w-[15vw] rounded-lg p-2 flex flex-col justify-between items-center gap-1 grow-0 bg-[#f8f8f8] bg-gradient-to-t from-[#f8f8f8] to-gray-100 shadow-lg"
    // >
    //   <div className="w-full">
    //     <div className="membercircle flex justify-center items-center rounded-lg h-32 w-full overflow-hidden">
    //        <h1 className="h-16 w-16 flex items-center justify-center rounded-full font-semibold"
    //        style={{ backgroundColor: myRandomColor }}
    //        >{initials}</h1>
    //       </div>
    //   </div>
    //   <div className=" w-full flex justify-between items-start">
    //     <h4 className="font-semibold capitalize text-sm">{user.name} , <small>{user.age}</small></h4>
    //   </div>
    //   <div className="w-full">
    //     {user.paid.toLowerCase() === "yes"? <small className="px-2 bg-green-500 rounded-full text-white">Paid</small>:
    //     <small className="px-2 bg-red-500 rounded-full text-white">Not Paid</small>
    //   }
    //   </div>
    //   <div className="w-full flex justify-between items-center">
    //     <div>
    //       <Link href={`/${user._id}`}><small  className="text-gray-500 hover:text-blue-500">View Details.</small></Link>
    //     </div>
    //     <div className="flex items-center">
    //       <Link title="Edit" className="p-1 hover:bg-gray-300 rounded-full" href={`/edit/${user._id}`}><span><MdEdit/></span></Link>
    //       <DeleteButton id={user._id}/>
    //     </div>
    //   </div>
    // </div>

    <Card className="card w-full sm:w-[300px] bg-transparent border-2 border-[#27272A] relative">
      <CardHeader>
        <div className="flex justify-start">
          <Link href={`/${user._id}`}>
            <CardTitle className="text-white text-2xl hover:text-muted break-words cardBreak">
              {user.name}
            </CardTitle>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={`flex h-2 w-2 hover:h-[10px] hover:w-[10px] transition-all cursor-pointer translate-y-1 rounded-full absolute top-5 right-5 ${
                    user.paid.toLowerCase() === "yes"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } `}
                />
              </TooltipTrigger>
              <TooltipContent>
                {/* <p>Add to library</p> */}
                <p>
                  {" "}
                  Registration:{" "}
                  {user.paid.toLowerCase() === "yes" ? (
                    <span className="text-green-500 font-bold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-bold">Pending</span>
                  )}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          {user.age}, {user.gender}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-end sm:justify-end gap-2">
        <Link title="Edit" href={`/edit/${user._id}`}>
          <Button className="py-4 sm:py-2" variant="outline">
            <span className="p-1 py-2 rounded-full">Edit</span>
          </Button>
        </Link>
        
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="py-4 sm:py-2" variant="destructive">Del</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#09090B] backdrop-blur-3xl border-[1px] border-[#27272A] w-full">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="m-[15px] sm:m-[0px] md:m-[0px] py-5 bg-transparent text-white md:border-none">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent hover:bg-transparent py-5"><DeleteButton id={user._id} /></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
