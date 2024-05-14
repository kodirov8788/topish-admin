import axios from '../api/api'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Contact({ switcher }) {
    const { setIsLoading } = useContext(AuthContext)
    let navigate = useNavigate()

    const formFunction = async (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let number = e.target[1].value

        if (number.length < 9 || 9 < number.length) {
            toast.warning("(95 999 0000) shu tarzda kiriting!", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            setIsLoading(true)

            await axios.post("/telegram/message", { username, number })
                .then(res => {
                    toast.success("Muvaffaqqiyatli  Ma'lumotingizni jo'natdingiz!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    console.log(res.data)
                    setIsLoading(false)
                    navigate("/")
                }
                )
                .catch(error => {
                    toast.error("xatolik bor", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    console.log(error)
                    setIsLoading(false)
                })
        }




    }

    return (
        switcher ? <form onSubmit={formFunction} class="w-[300px] h-[200px] flex flex-col  mx-auto    mt-20 ">
            <div className="">
                <h1 className='text-center text-2xl text-white'>
                    Siz dasturlashni o'rganmoqchimisiz?
                    <br />
                    Yaxshi, unda telefon<br />raqamingizni qoldiring!
                </h1>


            </div>
            <div class="grid-cols-2 mt-5 md:gap-6">
                <div class="relative z-0 w-full my-5 group">
                    <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ismingizni kiriting</label>
                </div>
                <div class="relative z-0 w-full my-5 group">
                    <input type="number" pattern="" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-100 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefon raqam (93-000-0000)</label>
                </div>
            </div>
            <button type="submit" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Jo'natish</button>
        </form> : <></>


    )
}

export default Contact