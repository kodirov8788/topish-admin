import React, { useState } from 'react';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Phone Number:', phoneNumber, 'Code:', code);
  };

  const style = {
    page: 'min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 bg-red',
    container:
      'w-full max-w-md p-4 bg-white rounded-lg shadow-lg z-10 relative ',
    header: 'mb-4 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-md',
    title: 'text-white text-xl md:text-2xl font-bold text-center',
    form: 'space-y-6',
    label: 'block text-sm font-medium text-gray-700',
    input:
      'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500',
    button:
      'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    footerText: 'mt-4 text-sm text-center text-gray-600',
    effect:
      'absolute  top-0 left-0 w-full h-full   to-cyan-500 rounded-lg shadow-lg z-0',
  };

  return (
    <div className={style.page}>
      <div className={style.effect}>
        <div className="w-[398px] h-[398px] bg-[#E4DB7C] rounded-full absolute z-10 right-[-250px] top-[0]"></div>
        <div className="w-[700px] h-[700px] bg-[#5081af] rounded-full absolute z-10 left-[-180px] top-[-400px] flex items-end pb-[30px] pr-[130px]  text-black  justify-center">
          <h1 className="font-abel text-[46px] tracking-wide text-white">
            Xush <br />
            Kelibsiz
          </h1>
        </div>
        <div className="w-[398px] h-[398px] bg-[#CAE5FF] rounded-full absolute z-10 left-[-180px] top-[-280px]"></div>
      </div>
      <div className={style.container}>
        <form onSubmit={handleSignIn} className={style.form}>
          <div>
            <label htmlFor="phone-number" className={style.label}>
              Your Phone Number
            </label>
            <input
              type="tel"
              id="phone-number"
              className={style.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="code" className={style.label}>
              Confirm Code
            </label>
            <input
              type="text"
              id="code"
              className={style.input}
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={style.button}>
            Sign in
          </button>
        </form>
        <p className={style.footerText}>
          If you're new, please register first.
        </p>
      </div>
    </div>
  );
}

export default Login;
