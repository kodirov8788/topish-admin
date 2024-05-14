import { toast } from "react-toastify";
import Axios from "../../../api/api";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, useLocation } from "react-router-dom";
// import axios from "axios"
function Createproduct() {
  const { setIsLoading, sensor, setSensor } = useContext(AuthContext);
  const { user } = useAuthContext();
  let location = useLocation().pathname;

  const [getCategories, setGetCategories] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(getCategories);
  console.log(products);
  const [switcher, setSwitcher] = useState("text");
  const [productText, setProductText] = useState("");
  const [productCategory, setProductCaterory] = useState("");
  const [productImages, setProductImages] = useState(null);
  const [productOptions, setProductOptions] = useState(["", "", ""]);
  const [productAnswer, setProductAnswer] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        await Axios.get("product/getall")
          .then((res) => {
            setProducts(res.data);
          })
          .catch((error) => console.log(error));
        await Axios.get("category/getall")
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

  useEffect(() => {
    if (productText) {
      setProductImages(null);
    } else if (productImages) {
      setProductText("");
    }
  }, [switcher]);

  const addproduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (productImages) {
      setProductText("");
    }
    const formData = new FormData();
    formData.append("productText", productText);
    formData.append("productAnswer", productAnswer);
    formData.append("option1", productOptions[0]);
    formData.append("option2", productOptions[1]);
    formData.append("option3", productOptions[2]);
    formData.append("productCategory", productCategory);

    if (productImages) {
      for (let i = 0; i < productImages.length; i++) {
        formData.append("productImages", productImages[i]);
      }
    }

    // console.log(productImages)
    try {
      const res = await Axios.post("/product/create", formData);
      toast.success(res.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      setProductText("");
      setProductCaterory("");
      setProductImages(null);
      setProductOptions(["", "", ""]);
      setProductAnswer("");
      setSensor(true);
      setTimeout(() => {
        setSensor(false);
      }, 500);
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };
  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      await Axios.post(`product/delete/${id}`)
        .then(() => {
          toast.success("Muvaffaqqiyatli categoriyani o'chirdingiz!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsLoading(false);
          setSensor(true);
          setTimeout(() => {
            setSensor(false);
          }, 500);
        })
        .catch((error) => {
          toast.error("Failed to delete category", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(error);
          setSensor(true);
          setIsLoading(false);
          setTimeout(() => {
            setSensor(false);
          }, 500);
        });
    } catch (error) {
      toast.error(("Failed to delete category", error), {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:ml-64 bg-gray-400">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
        <form class="max-w-sm mx-auto " onSubmit={addproduct}>
          <h1 className="text-2xl text-gray-800 dark:text-gray-200 mb-3">
            Saytga tashriflar soni:{" "}
            <span className="text-green-700 ml-2 mr-1 dark:text-green-400">
              1
            </span>
            ta
          </h1>
          <select
            id="countries"
            onChange={(e) => setSwitcher(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Rasm yoki Test tanglang!</option>
            <option value="image">Rasm</option>
            <option value="text">Text</option>
          </select>
          <div class="mb-5 mt-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {switcher === "image" ? "Rasm kiriting" : "Text kiriting!"}
            </label>
            {switcher === "image" ? (
              <input
                required={switcher === "image" ? true : false}
                onChange={(e) => setProductImages(e.target.files)}
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              />
            ) : (
              <textarea
                required={switcher === "text" ? true : false}
                value={productText}
                onChange={(e) => setProductText(e.target.value)}
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            )}
          </div>
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              To'g'ri javob
            </label>
            <div className="">
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
                  placeholder={`Option ${index + 1}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
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
            <input
              required
              value={productAnswer}
              onChange={(e) => setProductAnswer(e.target.value)}
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>

          <div class="mb-5">
            <select
              required
              value={productCategory}
              onChange={(e) => setProductCaterory(e.target.value)}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Kategoriyani tanlang!</option>

              {getCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center justify-center rounded bg-gray-50  dark:bg-gray-800 p-5"
          >
            <h1 className="text-2xl   text-gray-800 dark:text-gray-200">
              {product.productAnswer}
            </h1>
            {product.productImages ? (
              <img className="w-[100px]" src={product.productImages[0]?.url} />
            ) : (
              <p className="text-lg   text-gray-800 dark:text-gray-200 flex items-center justify-center border text-center p-3 mt-3 rounded">
                {product.productText}
              </p>
            )}

            <div className="text-lg h-20 text-gray-800 dark:text-gray-200 flex items-center justify-center ">
              {product.productOptions.map((answer) => (
                <span key={answer._id} className="mx-2 border p-3 rounded">
                  {answer}
                </span>
              ))}
            </div>
            <Link
              to={`${location}/${product._id}`}
              state={product}
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              edit
            </Link>
            <button
              onClick={() => deleteProduct(product._id)}
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Createproduct;
