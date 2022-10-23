import React, { Dispatch, SetStateAction } from "react";
import House from "../../utils/types/house";

interface GlobalLayoutProps {
  children: React.ReactNode;
  data: House[];
  setSearchData: Dispatch<SetStateAction<House[]>>;
}

export default GlobalLayoutProps;
