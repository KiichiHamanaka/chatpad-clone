import React, { useState } from "react";
import Image from "next/image";

const ProfileIcon = () => {
  const [imagePath, setImagePath] = useState("/zikannai.png");

  return (
    <Image src={imagePath} alt="picture of profile" width={156} height={156} />
  );
};

export default ProfileIcon;
