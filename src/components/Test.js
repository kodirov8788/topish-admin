import axios from '../api/api'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Test({ setRight, right, data, ans, setAns, setCount, count, setWrong, wrong, setSwicher }) {
    const navigate = useNavigate()
    const [option, setOption] = useState([])
    const [selectedOption, setSelectedOption] = useState(null) // To keep track of the selected option
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    const { setIsLoading } = useContext(AuthContext)

    // console.log(data)
    const Count = async () => {
        await axios.post("/visitors/testcount")
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    const resetState = () => {
        setSelectedOption(null);
        setShowCorrectAnswer(false);
        setButtonsDisabled(false);
    };

    useEffect(() => {
        resetState();
    }, [data]);
    const FormFunction = (e) => {
        e.preventDefault()
        if (ans === "") {
            alert("joylarni to'ldiring")
        } else {
            console.log(ans == data.productAnswer)
            if (ans != data.productAnswer) {
                setWrong(wrong + 1)
            } else {
                setRight(right + 1)
            }
            // setCount(count + 1)
        }
        setAns("")
        setSelectedOption(ans)
        setShowCorrectAnswer(true)
        setButtonsDisabled(true)
    }
    useEffect(() => {
        let timeoutId;

        const checkNavigation = () => {
            navigate(-1);
        };

        if (wrong === 3 || count > 9) {
            Count();
            setSwicher(true)
            // timeoutId = setTimeout(checkNavigation, 5000);
        }

        return () => clearTimeout(timeoutId);
    }, [wrong, count, navigate]);


    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            function generateDifferentPositions() {
                function shuffle(array) {
                    for (let i = array?.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }
                setOption(shuffle([data?.productOptions][0]))
            }
            generateDifferentPositions();
            setIsLoading(false)
            console.log("ishladi")
        }, 1000);
    }, [data])

    return (
        <div className='w-[300px] min-[370px]:w-[370px] mx-auto sm:w-[450px] p-5 pt-[30px]'>
            {count > 9 || wrong > 2 ? <>{wrong > 2 ?

                <h1 className='text-gray-200 text-center text-2xl'>Afsus, siz yutqazdingiz, qayta harakat qilib ko'ring</h1> : <h1 className='text-gray-200 text-center text-2xl'>Siz g'olib bo'ldingiz, Tabriklayman</h1>}</> :
                <form onSubmit={FormFunction} className="card">
                    {data?.productImages[0] ? (
                        <img className='w-full h-[180px] object-cover object-center rounded-lg mx-auto' src={data.productImages[0]?.url} alt="" />
                    ) : (
                        <div className="border max-h-[300px] overflow-y-auto relative bg-black/40 rounded">
                            <p className='text-lg  text-white    text-center p-3 mt-3  '>
                                {data?.productText}
                            </p>
                        </div>

                    )}
                    <h1 className='mt-5 text-center mx-auto text-2xl text-gray-200 '> Javoblardan birini tanglang!</h1>
                    <div className="flex mt-5">
                        {option?.map((el, inx) => (
                            <button
                                key={inx}
                                onClick={e => setAns(el)}
                                disabled={buttonsDisabled}
                                className={`w-full m-auto block border focus:outline-none font-medium rounded-lg text-lg py-2.5 ${(selectedOption === el && el !== data.productAnswer && showCorrectAnswer)
                                    ? 'bg-red-500 text-gray-200'
                                    : (el === data.productAnswer && showCorrectAnswer)
                                        ? 'bg-green-500 text-gray-200'
                                        : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700'
                                    }`}
                            >
                                {el}
                            </button>
                        ))}
                    </div>

                    <button onClick={() => setCount(count + 1)} type='button'
                        className={'w-full m-auto mt-5 block border focus:outline-none font-medium rounded-lg text-lg py-2.5 bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700'}>
                        Keyingisi
                    </button>
                </form>
            }
        </div>
    )
}

export default Test