import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const Wrap = styled.div`
  border-radius: 5px;
  border: solid 1px lightgray;
  padding: 2px;
  width: auto;
  height: auto;
`;

const ProfileIcon = () => {
  const [imagePath, setImagePath] = useState("/zikannai.png");

  return (
    <Wrap>
      <Image
        src={imagePath}
        alt="picture of profile"
        width={140}
        height={140}
      />
    </Wrap>
  );
};

export default ProfileIcon;
