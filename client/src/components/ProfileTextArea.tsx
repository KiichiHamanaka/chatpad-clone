import React, { useState } from "react";
import styled from "styled-components";
import ProfileIcon from "./ProfileIcon";

type ProfileProps = {
  body?: string;
  URL?: string;
  state?: "ME" | "ENEMY";
};

const Profile = styled.textarea`
  width: 140px;
  height: 300px;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  border: 1px solid lightgray;
`;

const URL = styled.textarea`
  width: 140px;
  height: 100px;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  border: 1px solid lightgray;
`;

const ProfileTextArea = (props: ProfileProps) => {
  const [profile, setProfile] = useState<null | string>(props.body);
  const [url, setUrl] = useState<null | string>(props.URL);

  //onBlurでsocketを発行する

  const handleChangeProfile = (event) => {
    setProfile(event.target.value);
  };
  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <div>
        <Profile value={profile} onChange={handleChangeProfile} />
      </div>
      <div>
        <URL value={url} onChange={handleChangeUrl} />
      </div>
      <div>
        <ProfileIcon />
      </div>
    </div>
  );
};

export default ProfileTextArea;
