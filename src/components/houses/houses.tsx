import { FC, Fragment, useEffect, useState } from "react";
import GlobalLayout from "../../layouts/global/global";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { GiSwordsEmblem } from "react-icons/gi";
import HouseType from "../../utils/types/house";
import { useApiGet } from "../../hooks/useApiHook";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Header = () => {
  return (
    <Fragment>
      <div className='flex flex-col md:flex-row items-center justify-center mt-7'>
        <div className='relative w-full md:w-[400px] h-[200px]'>
          <Image
            src='/images/logo-lg.png'
            objectFit='contain'
            layout='fill'
            alt='Logo banner'
          />
        </div>
        <div className='text-lg text-blue-200 font-light my-3 w-full md:w-[600px] m-auto mb-12'>
          <div className='mb-4 text-white text-2xl font-[Cinzel]'>
            Houses of Game of Thrones
          </div>
          <div className='text-sm bg-black md:p-5 rounded-lg leading-6 '>
            Explore the largest collection of Game of Thrones houses, Lorem
            ipsum may be used as a placeholder before final copy is available.
            Lorem.Lorem ipsum may be used as a placeholder before final copy is
            available.
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const House: FC = () => {
  const { data } = useApiGet("/houses");

  const [searchData, setSearchData] = useState<HouseType[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (data) setSearchData(data);
  }, [data]);

  return (
    <GlobalLayout data={data} setSearchData={setSearchData}>
      <div className='text-white'>
        <Header />
        <div className='border-b-[0.1px] pb-4 mb-10'></div>
        <motion.div
          transition={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 1,
              },
            },
          }}
          className='flex flex-wrap w-full gap-3.5 pb-10'
        >
          {data &&
            searchData.map((item: HouseType, index: number) => {
              return (
                <motion.div
                  key={index}
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  initial='hidden'
                  animate='show'
                  className='w-full md:w-[24%] h-[350px] rounded-lg relative bg-black hover:scale-110 transition-all duration-300 cursor-pointer border-[0.1px] border-gray-900'
                  onClick={() => router.push(`/houses/${index + 1}`)}
                >
                  <Image
                    src={`/images/houses/${index + 1}.jpeg`}
                    objectFit='cover'
                    layout='fill'
                    alt='house'
                    className='rounded-lg'
                  />
                  <div className='absolute top-0 h-full w-full hover:bg-transparent faded-background transition-all duration-500 rounded-lg flex items-end'>
                    <div className='p-5 text-sm flex flex-col gap-1  w-full'>
                      <div className='text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
                        {item.name}
                      </div>
                      <div className='flex items-center gap-2'>
                        <GoLocation />
                        <span className='text-xs text-blue-100 font-light'>
                          {item.region}
                        </span>
                      </div>

                      <div className='flex items-center gap-2'>
                        <GiSwordsEmblem />
                        <span className='text-xs text-blue-100 font-light'>
                          {item.swornMembers.length} Sworn members
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </GlobalLayout>
  );
};

export default House;
