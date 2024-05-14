import { Link, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./admin/Admin";
import Testpage from "./pages/Testpage";
import MainPage from "./pages/MainPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Createcategory from "./admin/adminComponents/category/Createcategory";
import Dashboard from "./admin/adminComponents/Dashboard";
import Createproduct from "./admin/adminComponents/product/Createproduct";
import Editcategory from "./admin/adminComponents/category/Editcategory";
import Editproduct from "./admin/adminComponents/product/Editproduct";
import StartTest from "./pages/StartTest";
import SignIn from './pages/Login';
import Authentication from "./provider/auth.provider";

function Routers() {
  const { user } = useAuthContext()
  return (
    <div className="">
      <Routes>

        <Route path='/' element={<MainPage />} />
        <Route path='/tests' element={<StartTest />} />
        <Route path='/tests/:id' element={<Testpage />} />


        <Route path='/countrytest' element={<Testpage />} />
        <Route path='/login' element={<SignIn />} />
        

        <Route element={<Authentication />}>
        <Route path="/admin" element={ <Admin />}>
          {/* Child Routes */}
          <Route path='' element={<Dashboard />} />
          <Route path='createcategory' element={<Createcategory />} />


          <Route path='createcategory/:id' element={<Editcategory />} />
          <Route path='createproduct' element={<Createproduct />} />
          <Route path='createproduct/:id' element={<Editproduct />} />
          {/* Add more child routes here as needed */}
        </Route>
          </Route>

      </Routes>
    </div>
  );
}

export default Routers;
