import React from 'react';
import { ClipLoader } from 'react-spinners';
import './style.css';

const CoverLoader = () => {
  return (
    <div className="fullscreen-loader">
      <ClipLoader color="#ccc" size={60} />
    </div>
  );
};

export default CoverLoader;
