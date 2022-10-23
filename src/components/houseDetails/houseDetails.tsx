import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";
import { GiSwordsEmblem, GiCastle } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import GlobalLayout from "../../layouts/global/global";
import { getIdFromUrl, isArrayEmpty } from "../../utils/functions";
import House from "../../utils/types/house";
import Member from "./member";

export const NoText: FC<{ message: string }> = ({ message }) => {
  return (
    <span className='text-xs text-gray-400 italic font-normal'>{message}</span>
  );
};

const HouseDetails: FC<{ data: House }> = ({ data }) => {
  const router = useRouter();

  const { id } = router.query;

  const Navigation = () => {
    return (
      <div className='my-10 text-blue-200 font-light text-xs'>
        <Link href='/'>Home</Link>
        <HiOutlineArrowLongRight className='inline mx-3' />
        <Link href='/houses'>Houses</Link>
        <HiOutlineArrowLongRight className='inline mx-3' /> {data?.name}
      </div>
    );
  };

  const Header = () => {
    return (
      <div className='w-full flex justify-center'>
        <div className='bg-slate-900 p-5 rounded-lg w-full md:w-min'>
          <div className='w-full md:w-[200px] h-[200px] m-auto relative rounded-lg'>
            <Image
              src={`/images/houses/${id}.jpeg`}
              alt='House profile'
              objectFit='cover'
              layout='fill'
            />
          </div>
        </div>
      </div>
    );
  };

  const HouseDetails = () => {
    return (
      <div>
        <div className='text-white text-center mt-5 text-2xl font-light uppercase'>
          {data.name}
        </div>
        <div className='text-blue-100 text-center mt-2'>{data.coatOfArms}</div>
        <div className='p-5 text-sm flex gap-9 justify-center  text-blue-100  w-full'>
          <div className='flex items-center gap-2'>
            <GoLocation />
            <span className='text-xs font-light'>{data.region}</span>
          </div>

          <div className='flex items-center gap-2'>
            <GiSwordsEmblem />
            <span className='text-xs  font-light'>
              {data.swornMembers.length} Sworn members
            </span>
          </div>
        </div>
      </div>
    );
  };

  const Titles = () => {
    return (
      <div className='w-full md:w-[50%] m-auto my-10'>
        <div className='text-white mb-4 text-sm'>HOUSE TITLES</div>
        <div className='text-white flex flex-wrap gap-3'>
          {isArrayEmpty(data.titles) ? (
            <NoText message='No sworn titles at the moment' />
          ) : (
            data.titles.map((item, index) => {
              return (
                <div
                  key={index}
                  className='text-xs font-light border p-1 rounded-full px-4'
                >
                  {item}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const Lord = () => {
    return (
      <div className='w-full md:w-[50%] m-auto my-10'>
        <div className='text-white mb-4 text-sm'>LORD</div>
        <Member id={1} isking />
      </div>
    );
  };

  const Seats = () => {
    return (
      <div className='w-full md:w-[50%] m-auto my-10'>
        <div className='text-white mb-4 text-sm'>HOUSE SEATS</div>
        <div className='text-white flex flex-wrap gap-3'>
          {isArrayEmpty(data.seats) ? (
            <NoText message='This house has no sworn seats' />
          ) : (
            data.titles.map((item, index) => {
              return (
                <div
                  key={index}
                  className='text-xs font-light border p-1 rounded-full px-4'
                >
                  {item}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const BRANCHES = () => {
    return (
      <div className='w-full md:w-[50%] m-auto my-10'>
        <div className='text-white mb-4 text-sm'>CADET HOUSES</div>
        <div className='text-white flex flex-wrap gap-3'>
          {isArrayEmpty(data.cadetBranches) ? (
            <NoText message='This house has no cadet branches' />
          ) : (
            data.cadetBranches.map((item, index) => {
              return (
                <div
                  key={index}
                  className='text-xs font-light border-[0.5px] border-blue-300 p-1 rounded-full px-4 hover:bg-white hover:text-black cursor-pointer transition-all duration-300'
                  onClick={() => router.push(`/houses/${getIdFromUrl(item)}`)}
                >
                  <GiCastle />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const Founded = () => {
    return (
      <div className='w-full md:w-[50%] m-auto my-10'>
        <div className='text-white mb-4 text-sm'>FOUNDED</div>
        <div className='text-white font-light text-sm'>
          {data.founded || <NoText message='We do not know yet' />}
        </div>
      </div>
    );
  };

  const Members = () => {
    const members = data.swornMembers;
    return (
      <div className='w-full md:w-[50%] m-auto my-10'>
        <div className='text-white mb-4 text-sm'>
          SWORN MEMBERS ({members.length})
        </div>
        <div className='text-white flex flex-wrap gap-3'>
          {isArrayEmpty(members) ? (
            <NoText message='This house has no sworn members' />
          ) : (
            members.map((item, index) => {
              return <Member key={index} id={index + 1} isking={false} />;
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <GlobalLayout data={[]} setSearchData={() => null}>
      <Fragment>
        <Navigation />
        <Header />
        <HouseDetails />
        <Lord />
        <Founded />
        <Titles />
        <Seats />
        <BRANCHES />
        <Members />
      </Fragment>
    </GlobalLayout>
  );
};

export default HouseDetails;
