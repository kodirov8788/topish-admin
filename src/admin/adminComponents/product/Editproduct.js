import axios from "../../../api/api";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
// import { useAuthContext } from '../../../hooks/useAuthContext'
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
function Editproduct() {
  const { setIsLoading, setSensor, sensor } = useContext(AuthContext);
  let Product = useLocation().state;
  let navigation = useNavigate();
  const [getCategories, setGetCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // console.log(getCategories)
  // console.log(products)
  const [productText, setProductText] = useState("");
  const [productCategory, setProductCaterory] = useState("");
  // const [productImages, setProductImages] = useState(null);
  const [productOptions, setProductOptions] = useState(["", "", ""]);
  const [productAnswer, setProductAnswer] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get("product/getall")
          .then((res) => {
            setProducts(res.data);
          })
          .catch((error) => console.log(error));
        await axios
          .get("category/getall")
          .then((res) => {
            setGetCategories(res.data);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [sensor]);
  // const deleteImage = async (id) => {
  //     setIsLoading(true)
  //     try {
  //         if (Product.images.length == 1) {
  //             console.log("you can not delete this image")
  //         } else {
  //             const response = await axios.post(`/product/deleteimage`, {
  //                 public_id: id,
  //                 productId: Product._id

  //             });

  //             if (response.status === 200) {
  //                 console.log(`Category with ID ${id} deleted`);
  //                 setIsLoading(false)
  //             } else {
  //                 console.log('Failed to delete category');
  //                 setIsLoading(false)
  //             }
  //         }
  //     } catch (error) {
  //         console.error('Error deleting category:', error);
  //         setIsLoading(false)
  //     }
  // };

  const EditProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (productImages) {
    //     setProductText("")
    // }
    const formData = new FormData();
    formData.append("productText", productText);
    formData.append("productAnswer", productAnswer);
    formData.append("option1", productOptions[0]);
    formData.append("option2", productOptions[1]);
    formData.append("option3", productOptions[2]);
    formData.append("productCategory", productCategory);
    // console.log(productImages)
    try {
      const res = await axios.post(`product/update/${Product._id}`, formData);
      toast.success(res.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      setProductText("");
      setProductCaterory("");
      setProductOptions(["", "", ""]);
      setProductAnswer("");
      navigation(-1);
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };
  let NameCategory = getCategories.find(
    (el) => el._id === Product?.productCategory
  );
  return (
    <div className="p-4 sm:ml-64 bg-gray-400">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <h1 className="text-2xl text-gray-800 dark:text-gray-200">
              {Product.productAnswer}
            </h1>
          </div>
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
            <form class="max-w-sm mx-auto " onSubmit={EditProduct}>
              <div class="mb-5 mt-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Text kiriting!
                </label>
                <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                  {Product.productText}
                </p>
                <textarea
                  placeholder="yangi textni kiriting..."
                  value={productText}
                  onChange={(e) => setProductText(e.target.value)}
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              </div>
              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Variantlar
                </label>
                <div className="flex flex-col">
                  {Product.productOptions.map((option) => (
                    <span className=" border py-2 px-3 rounded-lg mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {option}
                    </span>
                  ))}

                  {productOptions.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...productOptions];
                        updatedOptions[index] = e.target.value;
                        setProductOptions(updatedOptions);
                      }}
                      placeholder={`yangi option ${index + 1}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  ))}
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  To'g'ri javob
                </label>
                <p className="border py-2 px-3 rounded-lg mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {Product.productAnswer}
                </p>
                <input
                  value={productAnswer}
                  onChange={(e) => setProductAnswer(e.target.value)}
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="yangi javobni kiriting..."
                />
              </div>

              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kategoriya
                </label>
                <p className="border py-2 px-3 rounded-lg mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {NameCategory?.categoryName}
                </p>
                <select
                  onChange={(e) => setProductCaterory(e.target.value)}
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Yangi kategoriyani tanlang!</option>

                  {getCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                O`zgartirish
              </button>
            </form>
          </div>
        </div>
        {/* <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center rounded bg-gray-50  dark:bg-gray-800 p-5">
                        <button onClick={() => EditProduct()} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
                    </div>



                </div> */}
      </div>
    </div>
  );
}

export default Editproduct;
