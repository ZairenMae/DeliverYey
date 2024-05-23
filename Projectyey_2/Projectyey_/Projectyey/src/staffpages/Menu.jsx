import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const handleButtonClick = (route) => {
    navigate(route);
  };

  const buttonStyles = {
    backgroundColor: '#f97316',
    color: '#ffffff',
    padding: '0.9rem 3rem',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.1s ease',
    margin: '0.5rem',
  };

  const buttonHoverStyles = {
    backgroundColor: '#ea580c',
  };

  const pageStyles = {
    backgroundColor: '#FFF4B8', 
    minHeight: '100vh',
  };

  return (
    <div>
      <Nav />
      <div className="flex" style={pageStyles}>
        <div className="flex flex-col items-center py-11 shadow-sm flex-grow">
          <div className="text-2xl font-bold text-center text-black mb-5">Categories</div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              style={buttonStyles}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
              onClick={() => handleButtonClick("/breakfast")}
            >
              Breakfast
            </button>
            <button
              style={buttonStyles}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
              onClick={() => handleButtonClick("/lunch")}
            >
              Lunch
            </button>
            <button
              style={buttonStyles}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
              onClick={() => handleButtonClick("/snacks")}
            >
              Snacks
            </button>
            <button
              style={buttonStyles}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
              onClick={() => handleButtonClick("/dinner")}
            >
              Dinner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
