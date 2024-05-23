import React, { useState } from 'react';

function CustomButton({ onClick, navigate, children }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick && onClick();
    navigate && navigate(); 
  };

  const buttonStyle = {
    backgroundColor: isClicked ? 'orange' : 'initial',
    color: isClicked ? 'white' : 'initial',
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      {children}
    </button>
  );
}

export default CustomButton;
