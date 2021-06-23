import React, { useContext } from "react";
import ProfileTextArea from "./ProfileTextArea";
import ProfileIcon from "./ProfileIcon";
import { userInfoContext } from "../context/userInfo";
import styled from "styled-components";

const Profile = styled.textarea``;
//マウスオーバー時はプロフィール登録の文字を表示

const ProfileArea = () => {
  const userInfo = useContext(userInfoContext);

  return (
    <div>
      <ProfileTextArea />
    </div>
  );
};

export default ProfileArea;
