import React from "react";
import { UserType } from "../../../types";

export let userInfo: UserType = {
  id: null,
  name: null,
  icon: null,
  profile: null,
  url: null,
  isJoin: false,
  isEnter: false,
};

export const userInfoContext = React.createContext(null);
