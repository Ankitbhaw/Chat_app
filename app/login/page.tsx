/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
   
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth,email,password);
      router.push("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-slate-600 py-5 px-14 gap-3 items-center rounded">
        <span className="text-2xl text-cyan-400 font-bold">OurChat</span>
        <span className="text-lg text-cyan-400 font-semibold ">Login</span>
        <form className="flex items-center flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="p-2 border-b-2 border-cyan-300 text-cyan-300 outline-none bg-gray-500 rounded placeholder:text-cyan-100"
            placeholder="Email"
          />
          <input
            type="password"
            className="p-2 border-b-2 border-cyan-300 text-cyan-300 outline-none bg-gray-500 rounded placeholder:text-cyan-100"
            placeholder="Password"
          />

          <button className="bg-cyan-400 text-black px-2 py-1 rounded-md">
            LogIn
          </button>
          {err && <span>Something went Wrong!</span>}
        </form>
        <p className="text-sm text-cyan-200 ">
          Don&lsquo;t have an account?
          <Link className="underline font-semibold mx-1" href={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
