import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserAuth, Logo, HeaderOptions, MobileHeaderOptions} from "./index.js";
import SearchBox from "./SearchBox.jsx";


function Header() {
  const [inMobileNav, setInMobileNav] = useState(false);

  return (
    <>
      <nav className="h-15 md:h-18 bg-[#333] px-3 md:px-5 flex items-center justify-between gap-5">
        <div className="light:text-dark dark:text-white text-xl md:text-2xl flex items-center">

        {inMobileNav == false ? (
          <div
            className="block lg-2:hidden cursor-pointer text-white mr-5 w-10 "
            onClick={() => setInMobileNav(!inMobileNav)}
          >
            <CiMenuFries className="text-2xl" />
          </div>
        ) : (
          <div
            className="block lg-2:hidden cursor-pointer text-white mr-5 w-10 "
            onClick={() => setInMobileNav(!inMobileNav)}
          >
            <IoMdClose className="text-2xl" />
          </div>
        )}

          <Link to={`/`} className="font-bold">
            <Logo />
          </Link>
        </div>
        <div className="sm:w-3/4 md:w-2/4">
          <SearchBox />
        </div>
          <HeaderOptions />
        <div>
          <UserAuth />
        </div>



      </nav>
      {inMobileNav && <MobileHeaderOptions />}
    </>
  );
}

export default Header;
