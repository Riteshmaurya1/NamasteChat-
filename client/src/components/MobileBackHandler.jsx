import { useEffect } from "react";
import useConversation from "../statemanage/useConversation";

const MobileBackHandler = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    const handlePopState = () => {
      if (selectedConversation) {
        setSelectedConversation(null);
      }
    };

    if (selectedConversation) {
      // Push a fake history entry
      window.history.pushState({ chatOpen: true }, "");
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedConversation, setSelectedConversation]);

  return null;
};

export default MobileBackHandler;
