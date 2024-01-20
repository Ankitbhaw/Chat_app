/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Chats() {
  const { currentUser }: any = useAuthContext();
  const { dispatch }: any = useChatContext();
  const [chats, setChats]: any = useState();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect =(u:any)=>{
    dispatch({
      type: "CHANGE_USER",
      payload: u
    })
  }

  return (
    <section>
      {chats&& Object.entries(chats)?.sort((a:any,b:any)=>b[1].date-a[1].date).map((chat) => (
        <div
          key={chat[0]}
          className="p-3 flex items-center gap-3 text-white cursor-pointer hover:bg-gray-800"
          onClick={()=>handleSelect(chat[1]?.userInfo)}
        >
          <img
            src={chat[1]?.userInfo.photoURL}
            alt=""
            height={50}
            width={50}
            className="rounded-[50%] w-[50px] h-[50px] object-cover"
          />
          <div>
            <span className="font-semibold text-xl">
              {chat[1]?.userInfo.displayName}
            </span>
            <p className="text-sm text-gray-300">
              {chat[1]?.lastmessage?.text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
