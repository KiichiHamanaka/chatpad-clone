import React, { useContext } from "react";
import ProfileTextArea from "./ProfileTextArea";
import ProfileIcon from "./ProfileIcon";
import { userInfoContext } from "../context/userInfo";

const ProfileArea = () => {
  const userInfo = useContext(userInfoContext);

  return (
    <div>
      <ProfileTextArea />
      <ProfileIcon />
    </div>
  );
};

export default ProfileArea;
