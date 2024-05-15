import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" bg-gray-200 ">
      <div className="container flex-col md:flex-row  flex justify-between items-center py-5">
        <p className="text-black/60 text-lg mb-3">
          <span className="md:hidden">Copyright</span> ©{" "}
          {new Date().getFullYear()} Topish AI
        </p>

        <ul className="flex w-full md:w-1/2 justify-center md:justify-around mb-3">
          <li>
            <Link to={"/"}>Term pf Service</Link>
          </li>
          <span className="block md:hidden mx-2">&</span>
          <li>
            <Link to={"/"}>Privacy Policy</Link>
          </li>
          <li className="hidden md:block">
            <Link to={"/"}>Language </Link>
          </li>
        </ul>
        {/* write select for language */}
        <div className="flex relative items-center">
          <img src="assets/global.svg" alt="" className="absolute left-0 " />
          <select
            name=""
            id=""
            className="w-[150px] indent-10 bg-transparent outline-none"
          >
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Footer;
