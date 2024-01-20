/* eslint-disable @next/next/no-img-element */
'use client';
import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default function Nav() {
  const { currentUser }:any = useAuthContext();
  return <section className="flex items-center h-14 p-4 justify-between bg-gray-900">
    <span className="text-xl font-bold text-cyan-400">
        OurChat
    </span>
    <div className="flex gap-2 items-center">
        <img src={currentUser.photoURL} alt="" className="rounded-[50%] w-[30px] h-[30px] object-cover"/>
        <span className="text-white">{currentUser.displayName}</span>
        <button className="text-sm bg-gray-600 cursor-pointer px-2 py-1 rounded-md" onClick={()=>signOut(auth)}>LogOut</button>
    </div>
  </section>;
}
