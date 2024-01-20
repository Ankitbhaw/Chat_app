import Chats from "./Chats";
import Nav from "./Nav";
import Search from "./Search";

export default function SideBar() {
  return (
    <div className="basis-1/3 bg-gray-700 font-semibold">
      <Nav />
      <Search/>
      <Chats/>
    </div>
  );
}
