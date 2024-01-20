"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { db, storage } from "@/firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser }: any = useAuthContext();
  const { data }: any = useChatContext();
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastmessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <section className="bg-white p-3 flex items-center justify-between">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type a message"
        className="w-[100%] outline-none text-black"
        value={text}
      />
      <div className="flex items-center gap-2">
        <Image
          src={"/attach.jpeg"}
          alt=""
          height={30}
          width={30}
          className="cursor-pointer"
        />
        <label className="text-sm cursor-pointer" htmlFor="file">
          <Image src={"/uplaodImg.jpg"} alt="logo" width={70} height={70} />
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button
          className="bg-gray-400 text-black px-3 py-1 rounded-md"
          onClick={handleSend}
        >
          send
        </button>
      </div>
    </section>
  );
}
