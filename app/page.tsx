/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ChatContainer from "@/components/ChatContainer";
import SideBar from "@/components/SideBar";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { currentUser }:any = useAuthContext();

  const ProtectedRoute = ({ children }:any) => {
    if (!currentUser) {
      return router.push("/login");
    }
    return children;
  };
  return (
    <ProtectedRoute>
      <main className="h-screen flex justify-center items-center ">
        <div className="flex w-[60vw] h-[80vh] rounded-md overflow-hidden ">
          <SideBar />
          <ChatContainer />
        </div>
      </main>
    </ProtectedRoute>
  );
}
