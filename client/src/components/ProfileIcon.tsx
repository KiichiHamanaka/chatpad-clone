import React, { useState } from "react";
import Image from "next/image";

const ProfileIcon = () => {
  const [imagePath, setImagePath] = useState("/a.png");

  return (
    <Image src={imagePath} alt="picture of profile" width={50} height={50} />
  );
};

export default ProfileIcon;
