import Image from "next/image";
import Messages from "./Messages";
import Input from "./Input";
import { useChatContext } from "@/context/ChatContext";

export default function ChatContainer() {
  const { data }: any = useChatContext();
  return ( data.user.displayName &&
    <section className="basis-2/3">
      <div className="h-14 bg-gray-700 flex items-center justify-between p-3 text-white">
        <span className="font-semibold text-xl">
          {data.user?.displayName}
        </span>
        <div className="flex items-center gap-2">
          <Image src={"/camera.png"} alt="" height={40} width={40} className="mix-blend-darken" />
          <Image src={"/add.png"} alt="" height={30} width={30} className=""/>
          <Image src={"/more.png"} alt="" height={30} width={30} className="mix-blend-darken" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </section>
  );
}
