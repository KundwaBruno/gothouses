import React, { FC, Fragment, useRef, useState } from "react";
import { GiMountedKnight, GiQueenCrown } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";
import { useApiGet } from "../../hooks/useApiHook";
import Character from "../../utils/types/character";
import useOnClickOutside from "../../hooks/useOutsideClick";
import { NoText } from "./houseDetails";

interface MemberDetailsProps {
  id: number;
  isking: boolean;
}

const Details: FC<{
  data: Character;
  loading: Boolean;
  popupRef: React.RefObject<HTMLDivElement>;
}> = ({ data, loading, popupRef }) => {
  return (
    <div
      ref={popupRef}
      className='absolute bg-slate-800 bottom-0 left-16 w-[300px] rounded p-5 shadow-sm z-50'
    >
      {loading ? (
        <div className='flex justify-center'>
          <VscLoading className='text-white animate-spin duration-75' />
        </div>
      ) : (
        <>
          <span className='text-blue-100 font-light text-xs'>Name</span>
          <div className='text-white text-sm mb-5'>
            {data.name || <NoText message='Name is currently not available' />}
          </div>
          <span className='text-blue-100 font-light text-xs'>Born</span>
          <div className='text-white mb-5 text-sm'>
            {data.born || <NoText message='Born time not found' />}
          </div>
          <span className='text-blue-100 font-light text-xs'>Gender</span>
          <div className='text-white mb-5 text-sm'>{data.gender}</div>
          <span className='text-blue-100 font-light text-xs'>Titles</span>
          <div className='text-white flex flex-wrap gap-3 mt-3'>
            {data.titles.map((item, index) => {
              return (
                <div
                  key={index}
                  className='text-xs font-light border p-1 rounded-full px-4'
                >
                  {item}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Member: FC<MemberDetailsProps> = ({ id, isking }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const { data, loading } = useApiGet(`/characters/${id}`);

  const popupRef = useRef(null);

  useOnClickOutside(popupRef, () => setShowDetails(false));

  return (
    <div className='relative w-min'>
      <div
        onClick={() => setShowDetails(!showDetails)}
        className='w-[50px] h-[50px] border-[0.3px] border-blue-200 rounded-full transparent bg-black flex items-center justify-center cursor-pointer'
      >
        {showDetails ? (
          <AiOutlineClose className='text-red-300' />
        ) : (
          <Fragment>
            {isking ? (
              <GiQueenCrown className='text-lg text-red-500' />
            ) : (
              <GiMountedKnight className='text-blue-200 text-lg ' />
            )}
          </Fragment>
        )}
      </div>
      {showDetails && (
        <Details data={data} loading={loading} popupRef={popupRef} />
      )}
    </div>
  );
};

export default Member;
