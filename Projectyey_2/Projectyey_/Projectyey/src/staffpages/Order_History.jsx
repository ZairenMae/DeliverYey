import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Nav/>
      <div className="flex">
        {/* Sidebar */}
        <div className={`bg-orange-500 h-screen w-60 flex flex-col items-center justify-center transition-transform ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* HTML buttons with inline styling and onClick event */}
          <button 
            className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4 custom-button"
            onClick={() => {toggleSidebar(); navigate("/orders");}}
          >
            Orders
          </button>
          <button 
            className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4 custom-button"
            onClick={() => {toggleSidebar(); navigate("/menu");}}
          >
            Menu
          </button>
          <button 
            className="px-14 pt-4 pb-2.5 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4 custom-button"
            onClick={() => {toggleSidebar(); navigate("/order_history");}}
          >
            Order History
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center py-11 bg-amber-100 shadow-sm flex-grow">
       
          <div className="text-2xl font-bold text-center text-black mb-5">Purchase History</div>
          <div className="flex gap-3 mb-5">
        {/* Toggle Side Bar */}  
          <button className="absolute left-1 top-20 bg-orange-100 rounded-md px-3 py-1 text-black border border-orange-600" onClick={toggleSidebar}>
             Menus
      </button>

      <button
              className="px-4 py-3 rounded-lg border-2 border-orange-600 bg-orange-600 text-white"
              onClick={() => navigate("/order_details")}
            >
              Orders
            </button>
          </div>
          <div className="flex items-center justify-end w-full px-16 py-2.5 text-lg font-bold text-center text-orange-600 bg-orange-200 rounded border border-orange-700 max-w-[984px] mb-8">
            <div className="flex gap-12">
              <div>Order Date</div>
              <div>Order Type</div>
              <div>Unit Price</div>
              <div>Quantity</div>
              <div>Order Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
