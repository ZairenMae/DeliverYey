import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

function Orders() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState("");

  return (
    <div>
      <Nav />
      <div className="flex">
        <div className="bg-orange-50 h-screen w-60 flex flex-col items-center justify-center">
          <button onClick={() => navigate("/orders")} className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Orders</button>
          <button onClick={() => navigate("/menu")} className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Menu</button>
          <button onClick={() => navigate("/order_history")} className="px-14 pt-4 pb-2.5 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Order History</button>
        </div>

        <div className="flex-grow py-11 bg-amber-100 shadow-sm">
          <div className="text-2xl font-bold text-center text-black mb-5">Orders</div>
          <div className="flex gap-3 mb-5 justify-center">
            <button onClick={() => navigate("/order_details")} className="px-4 py-3 rounded-lg border-2 border-orange-600 bg-orange-600 text-white">New Orders</button>
            <button onClick={() => navigate("/completed_order")} className="px-4 py-3 rounded-lg border-2 border-orange-600 bg-orange-600 text-white">Completed Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
