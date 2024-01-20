"use client";
import { useChatContext } from "@/context/ChatContext";
import Message from "./Message";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data }: any = useChatContext();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc: any) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <section className="bg-gray-500 p-3 h-[85%] overflow-scroll">
      {messages.map((m:any) => (
        <Message  key={m.id} message={m}/>
      ))}
    </section>
  );
}
