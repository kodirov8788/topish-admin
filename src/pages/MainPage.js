import axios from "../api/api";
import { Link } from "react-router-dom";
import Contact from "../components/Contact";

function MainPage() {
    const getApi = async () => {
        await axios.post("/visitors/addmaincount")
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }
    window.addEventListener("load", (event) => {
        getApi()
    });

    return (
        <div className="flags w-full h-screen bg-center bg-cover relative">
            <div className="absolute bg-black/40 w-full h-full top-0 left-0 "></div>
            <div className="text-white z-100 absolute w-full h-full">
                {/* <Contact /> */}
                <div className="w-[300px]   min-[350px]:w-[350px]  mx-auto mt-[150px] text-center text-2xl font-bold leading-10">
                    <h1 className="text-2xl min-[350px]:text-3xl text-white ">Assalomu alaykum</h1>
                    <h1 className="mt-[40px]">Bayroqlar va Qonunlarni <br />yaxshi bilasizmi?</h1>
                    <h1>Yaxshi unda</h1>
                    <h1>O'zingizni sinab ko'ring: </h1>
                    <Link to={"/tests"} className="mt-[100px] w-3/5 m-auto block border focus:outline-nonefont-medium rounded-lg text-lg px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 animate-bounce">Testga o'tish</Link>
                </div>

            </div>


        </div >
    );
}

export default MainPage;
