/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useRef } from "react";

export default function Message({ message }: any) {
  const { currentUser }: any = useAuthContext();
  const { data }: any = useChatContext();
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);
 
  return (
    <section
      ref={ref}
      className={`flex gap-5 mb-5 ${
        message.senderId === currentUser.uid ? "flex-row-reverse":""
      }`}
    >
      <div className="flex flex-col text-gray-200 gap-2">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          height={50}
          width={50}
          className="rounded-[50%] w-[40px] h-[40px] object-cover"
        />
        <span className="text-sm">Just Now</span>
      </div>
      <div
        className={`max-w-[80%] flex flex-col gap-3  ${
          message.senderId === currentUser.uid && "items-end"
        }`}
      >
        <p
          className={` py-3 px-5 max-w-max ${
            message.senderId === currentUser.uid
              ? "bg-cyan-500 text-white rounded-l-xl rounded-ee-xl"
              : "bg-white text-black  rounded-r-xl rounded-es-xl"
          }`}
        >
          {message.text}
        </p>
        {message.img && (
          <img
            src={message.img}
            alt=""
            height={50}
            width={50}
            className="w-[50%]"
          />
        )}
      </div>
    </section>
  );
}
