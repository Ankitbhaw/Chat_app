/* eslint-disable @next/next/no-img-element */
"use Client";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { useState } from "react";

export default function Search() {
  const { currentUser }: any = useAuthContext();
  const [userName, setUserName] = useState("");
  const [user, setUser]: any = useState(null);
  const [err, setErr] = useState(false);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };
  const handleKey = (e: any) => {
    e.code = "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user?.uid
        ? currentUser.uid + user?.uid
        : user?.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null)
    setUserName("");
  };
  return (
    <section className="border-b-2 border-cyan-700">
      <div className="p-3">
        <input
          type="text"
          className="bg-transparent outline-none"
          placeholder="Search User"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && (
        <div
          className="p-3 flex items-center gap-3 text-white cursor-pointer hover:bg-gray-800"
          onClick={handleSelect}
        >
          <img
            src={user?.photoURL}
            alt=""
            height={50}
            width={50}
            className="rounded-[50%] w-[50px] h-[50px] object-cover"
          />
          <div>
            <span className="text-xl font-semibold">{user?.displayName}</span>
          </div>
        </div>
      )}
    </section>
  );
}
