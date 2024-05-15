import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  // add tailwindcss style
  let style = {
    title: 'text-2xl font-bold text-center text-blue-500',
    subTitle: 'text-xl font-bold text-center text-blue-500',
  };
  return (
    <div>
      <h1 className={style.title}>Hello this is About page</h1>
      <h2 className={style.subTitle}>Welcome to About Page</h2>
      <Link to={"/"}>Main Page</Link>
    </div>
  );
}

export default AboutPage;
