import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";
import useConversation from "../../statemanage/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Aside = () => {
  const { users = [], loadingUsers,isOnline,setIsOnline } = useContext(AppContext);
  const { selectedConversation, setSelectedConversation } = useConversation();
  // For the All Online Users.
  const { socket, onlineUsers } = useSocketContext();
  // const onlineuserid = localStorage.getItem('userId');

  // const isOnline = onlineUsers.includes(onlineuserid);

  if (loadingUsers || !users) {
    return <Loading />;
  }
  // console.log("loadingUsers:", loadingUsers);
  // console.table("users:", users);


  return (
    <div className="space-y-2 p-2 text-black">
      {users.map((user) => {
        const isSelected = selectedConversation?._id === user._id;
        const isOnline = onlineUsers.includes(user._id); // ⬅️ check each user
        return (
          <div
            key={user._id}
            onClick={() => setSelectedConversation(user)}
            className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition
              ${isSelected ? "bg-gray-200" : "hover:bg-gray-100"}
            `}
          >
            <div className={`avatar`}>
              {
                user.img ? (
                  <div className="w-10 rounded-full overflow-hidden">
                    <img src={user.img} alt={user.name} />
                  </div>
                ) : (
                  <div className="relative w-10 h-10">
                    <div className="w-10 h-10 p-2 flex items-center justify-center bg-black rounded-full text-white font-semibold uppercase">
                      {user.name ? user.name.slice(0, 2) : "NA"}
                    </div>
                    {isOnline && (
                      <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>
                )
              }
            </div>
            <span className="font-medium">{user.name}</span>

          </div>
        );
      })}
    </div>
  );
};

export default Aside;
