// Example usage in Navbar component
import React from 'react';
import { Link } from 'react-router-dom';
import { toggleOpenClose } from '../context/features/apiSlice';
import { useDispatch } from 'react-redux';
function Navbar() {
  const dispatch = useDispatch();
  const openCloseSidebar = () => {
    dispatch(toggleOpenClose());
  };
  return (
    <nav className=" h-[63px] container flex justify-between items-center">
      <Link to={'/'} className="flex items-center ">
        <img src="assets/logo.png" className="w-[40px] " alt="logo_image" />
        <h2 className="font-montserrat">Induna Holdings</h2>
      </Link>

      <ul className="w-2/4 justify-between font-montserrat hidden md:flex">
        <li>
          <Link to={'/'} className="">
            Asosiy
          </Link>
        </li>
        <li>
          {' '}
          <Link to={'/'} className="">
            Afzalliklar
          </Link>
        </li>
        <li>
          {' '}
          <Link to={'/'} className="">
            Biz haqimizda
          </Link>
        </li>
        <li>
          <Link to={'/'} className="">
            Mahsulotlarimiz
          </Link>
        </li>
        <li>
          <Link to={'/'} className="">
            Bog’lanish
          </Link>
        </li>
      </ul>
      <ul></ul>
      <button
        onClick={openCloseSidebar}
        className="hover:bg-gray-200 md:hidden p-3 rounded-lg"
      >
        <img src="assets/humburger.svg" alt="" />
      </button>
    </nav>
  );
}

export default Navbar;

// Example usage in Navbar component
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useCheckAuthQuery } from '../context/auth/AuthApi';
// import LogoutButton from './buttons/LogOutBtn';
// // import { AuthState } from '../context/auth/AuthState';
// import { useSelector } from 'react-redux';

// function Navbar() {
//   const { data: userData, isError, error } = useCheckAuthQuery();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   // console.log('isAuthenticated: ', isAuthenticated);
//   useEffect(() => {
//     if (isError && error.status === 401) {
//       console.log('User not authorized or session expired');
//     }
//   }, [isError, error]);

//   return (
//     <nav className="bg-gray-800 p-4">
//       <ul className="flex justify-between">
//         <li>
//           <Link to="/" className="text-white">
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/about" className="text-white">
//             About
//           </Link>
//         </li>
//         <li>
//           {isAuthenticated ? (
//             <LogoutButton />
//           ) : (
//             <Link
//               to="/login"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Login
//             </Link>
//           )}
//         </li>
//       </ul>
//       <h4 className="text-white">
//         {isAuthenticated ? `User ${userData?.data.phoneNumber}` : 'Guest'}
//       </h4>
//     </nav>
//   );
// }

// export default Navbar;
