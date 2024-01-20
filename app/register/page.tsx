/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth, db, storage } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter()
  const [err, setErr] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log(error);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            router.push('/')
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-slate-600 py-5 px-14 gap-3 items-center rounded">
        <span className="text-2xl text-cyan-400 font-bold">OurChat</span>
        <span className="text-lg text-cyan-400 font-semibold ">Register</span>
        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="p-2 border-b-2  border-cyan-300 text-cyan-300 outline-none bg-gray-500 rounded placeholder:text-cyan-100"
            placeholder="Dispaly Name"
          />
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
          <label
            className="flex text-sm gap-1 cursor-pointer text-cyan-300 items-center"
            htmlFor="file"
          >
            <Image src={"/uplaodImg.jpg"} alt="logo" width={25} height={25} />
            Add an Avtar
          </label>
          <input type="file" id="file" className="hidden" />
          <button className="bg-cyan-400 text-black px-2 py-1 rounded-md">
            SignUp
          </button>
          {err && <span>Something went Wrong!</span>}
        </form>
        <p className="text-sm text-cyan-200 ">
          Already have an account?{" "}
          <Link className="underline mx-1 font-semibold" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
