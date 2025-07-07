import { useEffect, useContext } from "react";
import { createContext, useState } from "react";
import io from "socket.io-client"
const socketContext = createContext();
import { AppContext } from "./AppContext";

export const useSocketContext = () => {
    return useContext(socketContext);
}


export const SocketProvider = ({ children }) => {
    // const { userInfo } = useContext(AppContext)
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // const authToken = userInfo.token;
    const authToken = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    // console.log(userInfo);

    console.log("This is inside the socketContext := ", authToken);

    useEffect(() => {
        if (authToken) {
            const socket = io('http://localhost:3000', {
                query: {
                    userId: id,
                }
            });
            setSocket(socket);
            socket.on("getonline", (users) => {
                setOnlineUsers(users)
                console.log("users online", users);
            });
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null)
            }
        }
    }, [authToken]);
    return (
        <socketContext.Provider value={{ socket, onlineUsers }} >
            {children}
        </socketContext.Provider>
    );
}