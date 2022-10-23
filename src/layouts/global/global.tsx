import { FC } from "react";
import Props from "./types";
import NavigationBar from "../../components/navigationBar/navigationBar";

const GlobalLayout: FC<Props> = ({ children, data, setSearchData }) => {
  return (
    <div className='bg-winter-coming w-screen h-screen overflow-auto bg-cover bg-center'>
      <NavigationBar data={data} setSearchData={setSearchData} />
      <div className='max-w-screen-2xl w-11/12 md:w-[75%] m-auto'>
        {children}
      </div>
    </div>
  );
};

export default GlobalLayout;
