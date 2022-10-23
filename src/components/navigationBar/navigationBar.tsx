import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import House from "../../utils/types/house";

const navLinks = [
  {
    label: "Home",
    url: "/",
  },

  {
    label: "About",
    url: "/about",
  },
  {
    label: "Explore Api",
    url: "https://anapioficeandfire.com/",
  },
];

const NavigationBar: FC<{
  data: House[];
  setSearchData: Dispatch<SetStateAction<House[]>>;
}> = ({ data, setSearchData }) => {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const searchOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchData(filteredData);
  };

  const path = router.pathname;

  return (
    <nav className='max-w-screen-2xl w-full px-2 md:px-0 md:w-[75%] m-auto flex items-center justify-between py-5 sticky top-0 z-50 bg-black'>
      <div className='w-[50px] h-[50px] relative'>
        <Image
          src='/images/logo.png'
          layout='fill'
          objectFit='contain'
          alt='GOT-logo'
          className='-rotate-20 cursor-pointer'
          onClick={() => router.push(navLinks[0].url)}
        />
      </div>
      <div className=' gap-10 items-center flex'>
        <div
          className={`gap-9 absolute md:static ${
            navOpen ? "left-0" : "-left-full"
          } left-0 top-0 w-[50vw] md:w-auto bg-white md:bg-transparent h-screen md:h-auto flex flex-col md:flex-row items-center  pt-10 md:pt-0 transition-all duration-150`}
        >
          {navLinks.map((item, index) => {
            return (
              <Link href={item.url} key={index}>
                <span className='font-light text-sm text-black md:text-blue-200 hover:underline underline-offset-8 cursor-pointer'>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {path === "/" && (
          <div className='ml-5 border-[0.5px] border-blue-200 rounded-lg w-[240px] px-3 py-2 flex gap-3 items-center'>
            <AiOutlineSearch className='text-blue-200 text-lg' />
            <input
              className=' bg-transparent font-light text-sm w-full  outline-none text-blue-200'
              placeholder='Search by house name'
              onChange={searchOnChange}
            />
          </div>
        )}
        <div className='md:hidden' onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? (
            <AiOutlineClose className='text-blue-300' />
          ) : (
            <GiHamburgerMenu className='text-blue-300' />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
