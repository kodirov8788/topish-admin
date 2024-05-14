import { useContext, useEffect, useState } from "react";
import axios from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import FlagImage from "../backgroundImages/uz-flag.jpg"
import './Change_scroll.css'



function StartTest() {
    const [getCategories, setGetCategories] = useState([])
    // console.log(getCategories)
    const { setIsLoading, sensor, setSensor } = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                await axios.get("category/getall").then(res => {
                    setGetCategories(res.data)
                    console.log(res.data)
                    setIsLoading(false)
                }).catch(error => {
                    setIsLoading(false)
                    console.log(error)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [sensor])

    return (
        <div className="flags bg-fixed top-0 w-full h-screen  bg-center bg-cover relative ">
            <div className="absolute bg-black/40 w-full  top-0 left-0 "></div>

            <div className="text-white z-100 absolute w-full h-full ">
                <Link to={-1} className='flex w-fit p-4 m-2 focus:outline-none font-medium rounded-lg text-lg  py-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700 items-center'>
                    <svg className="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg><p>ortga qaytish</p></Link>


                <div className="min-[300px]:w-[300px] min-[370px]:w-[350px] h-[500px] sm:h-[500px] lg:h-[500px]  mx-auto overflow-y-auto mt-[25px]  rounded-sm content-scroll ">
                    <div className="w-full  mx-auto  text-center text-2xl font-bold overflow-y-auto leading-10  bg-transparent">

                        {getCategories.map(category => (<>
                            <div class=" max-w-sm h-[180px] min-[370px]:h-[200px] overflow-hidden rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-[10px]  relative  ">
                                <Link to={`/tests/${category?._id}`} >
                                    <img class="rounded-lg h-full w-full object-cover" src={category?.images[0].url} alt="" />
                                </Link>

                                <div class="w-full py-5 flex flex-col items-center justify-around bg-black/60 h-full  absolute top-0 ">
                                    <h5 class=" text-2xl font-bold tracking-tight text-white ">{category.categoryName}</h5>

                                    <Link to={`/tests/${category?._id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#1F2937] rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Testga o'tish
                                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link>
                                </div>

                            </div>
                        </>

                        ))}
                        <div className="max-w-sm h-[200px] overflow-hidden rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 lg:hidden
                     "></div>


                    </div>
                </div>


            </div>


        </div >
    );
}

export default StartTest;
