import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "src/context/socket";

const Header = () => {
  const socket = useContext(SocketContext);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  useEffect(() => {
    console.log(`activeUsers are ${activeUsers}`);
  }, [activeUsers]);

  socket.on("ACTIVE_USERS", (users) => {
    setActiveUsers(users);
  });
  return (
    <div>
      <nav>{activeUsers}</nav>
    </div>
  );
};

export default Header;
