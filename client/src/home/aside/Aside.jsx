import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";
import useConversation from "../../statemanage/useConversation";

const Aside = () => {
  const { users = [], loadingUsers } = useContext(AppContext);
  const { selectedConversation, setSelectedConversation } = useConversation();

  if (loadingUsers || !users) {
    return <Loading />;
  }
  console.log("loadingUsers:", loadingUsers);
  console.log("users:", users);

  return (
    <div className="space-y-2 p-2 text-black">
      {users.map((user) => {
        const isSelected = selectedConversation?._id === user._id;

        return (
          <div
            key={user._id}
            onClick={() => setSelectedConversation(user)}
            className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition
              ${isSelected ? "bg-gray-200" : "hover:bg-gray-100"}
            `}
          >
            <div className="avatar">
              {user.img ? (
                <div className="w-10 rounded-full overflow-hidden">
                  <img src={user.img} alt={user.name} />
                </div>
              ) : (
                <div className="w-10 h-10 p-2 flex items-center justify-center bg-black rounded-full text-white font-semibold uppercase">
                  {user.name ? user.name.slice(0, 2) : "NA"}
                </div>
              )}
            </div>
            <span className="font-medium">{user.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Aside;
