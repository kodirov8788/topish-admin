import axios from '../../../api/api'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
function Createcategory() {
    let location = useLocation().pathname
    const { setIsLoading } = useContext(AuthContext)
    const [categoryName, setCategoryName] = useState("")
    const [getCategories, setGetCategories] = useState([])

    const [files, setFiles] = useState(null);
    // const { user } = useAuthContext()
    const addCategory = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        try {
            await axios.post(`/category/create`, formData
                // {
                //     headers: {
                //         'Authorization': `Bearer ${user.token}`
                //     }
                // }
            )
                .then(res => {
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setIsLoading(false)
                    console.log(res)
                })
                .catch((error) => {
                    toast.error(error.response.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setIsLoading(false)
                    console.log(error)
                })
        } catch (error) {
            toast.error(('Error:', error.response.data), {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }

    useEffect(() => {
        const getData = async () => {
            try {
                await axios.get("category/getall").then(res => {
                    setGetCategories(res.data)
                }).catch(error => console.log(error))
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [getCategories])


    const deleteCategory = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/category/delete/${id}`);
            console.log(response)
            if (response.status === 200) {
                toast.success("Muvaffaqqiyatli categoriyani o'chirdingiz!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
            } else {
                toast.error("Failed to delete category", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
            }
        } catch (error) {
            toast.error(("Failed to delete category", error), {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsLoading(false)
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <h1 className="text-2xl text-gray-800 dark:text-gray-200">
                            Categoriya yaratish
                        </h1>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800 p-5">
                        <form class="max-w-lg mx-auto" onSubmit={addCategory}>
                            <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                            <input onChange={(e) => setCategoryName(e.target.value)} type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" />
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                            <input multiple onChange={(e) => setFiles(e.target.files)} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            <button class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Jo'natish</button>
                        </form>
                    </div>
                </div>
                <div className="grid  md:grid-cols-2 gap-4 mb-4">
                    {
                        getCategories.map(category => (
                            <div key={category._id} className="flex flex-col items-center justify-center rounded bg-gray-50  dark:bg-gray-800 p-5">
                                <img class="w-3/4 rounded-lg h-1/2 object-cover " src={category.images[0].url} alt="image description" />

                                <h1 className="text-2xl   text-gray-800 dark:text-gray-200">
                                    {category.categoryName}
                                </h1>

                                <Link to={`${location}/${category._id}`} state={category} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">edit</Link>
                                <button onClick={() => deleteCategory(category._id)} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
                            </div>
                        ))
                    }



                </div>
            </div>



        </div>
    )
}

export default Createcategory