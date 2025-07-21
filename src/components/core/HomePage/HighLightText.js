import React from 'react';

const HighLightText = ({ text, className }) => {
  return (
    <span
      className={`font-bold ${className}`}
    >
      {" "}
      {text}
      {" "}
    </span>
  );
};

export default HighLightText;
