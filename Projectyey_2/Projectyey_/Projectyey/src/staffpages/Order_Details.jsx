import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    { id: 1, name: 'Julianne Kristine Aban', contact: '09480247268', totalItems: '2x', totalPrice: '₱30.00', orderDate: '04/15/2024', status: 'Pending' },
    { id: 2, name: 'Jennifer Bendoy', contact: '09506860997', totalItems: '2x', totalPrice: '₱50.00', orderDate: '04/15/2024', status: 'Pending' },
    { id: 3, name: 'Ariel Bernal', contact: '09959355769', totalItems: '3x', totalPrice: '₱75.00', orderDate: '04/15/2024', status: 'Pending' },
    { id: 4, name: 'Luke Castro', contact: '09912718894', totalItems: '4x', totalPrice: '₱100.00', orderDate: '04/15/2024', status: 'Pending' },
    { id: 5, name: 'Davidlanz Masendo', contact: '09918718891', totalItems: '2x', totalPrice: '₱55.00', orderDate: '04/15/2024', status: 'Pending' },
    { id: 6, name: 'Jenelyn Mendoza', contact: '09918718891', totalItems: '2x', totalPrice: '₱25.00', orderDate: '04/15/2024', status: 'Pending' },
    { id: 7, name: 'Zairen Mae Ninoranco', contact: '09918718891', totalItems: '2x', totalPrice: '₱35.00', orderDate: '04/15/2024', status: 'Pending' },
  ]);

  const handleFinishOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Accepted' } : order
    );
    setOrders(updatedOrders);
    const finishedOrder = orders.find(order => order.id === orderId);
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    completedOrders.push({ ...finishedOrder, status: 'Accepted' });
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
  };

  const handleRejectOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Rejected' } : order
    );
    setOrders(updatedOrders);
    const rejectedOrder = orders.find(order => order.id === orderId);
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    completedOrders.push({ ...rejectedOrder, status: 'Rejected' });
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
  };

  return (
    <div>
      <Nav />
      <div className="flex">
        <div className="bg-orange-50 h-screen w-60 flex flex-col items-center justify-center">
          <button onClick={() => navigate("/orders")} className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Orders</button>
          <button onClick={() => navigate("/menu")} className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Menu</button>
          <button onClick={() => navigate("/order_history")} className="px-14 pt-4 pb-2.5 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Order History</button>
        </div>

        <div className="flex-grow py-11 shadow-sm">
          <div className="text-2xl font-bold text-center text-black mb-5">Orders</div>
          <div className="flex gap-3 mb-5 justify-center">
            <button onClick={() => navigate("/order_details")} className="px-4 py-3 rounded-lg border-2 border-orange-600 bg-orange-600 text-white">New Orders</button>
            <button onClick={() => navigate("/completed_order")} className="px-4 py-3 rounded-lg border-2 border-orange-600 bg-orange-600 text-white">Completed Orders</button>
          </div>
          <div className="max-w-[984px] mx-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-200 text-orange-600">
                  <th className="px-6 py-3 border border-orange-700">Name</th>
                  <th className="px-6 py-3 border border-orange-700">Contact</th>
                  <th className="px-6 py-3 border border-orange-700">Total Items</th>
                  <th className="px-6 py-3 border border-orange-700">Total Price</th>
                  <th className="px-6 py-3 border border-orange-700">Order Date</th>
                  <th className="px-6 py-3 border border-orange-700"></th>
                </tr>
              </thead>
              <tbody>
                {orders.filter(order => order.status === 'Pending').map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 border border-gray-200">{order.name}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.contact}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.totalItems}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.totalPrice}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.orderDate}</td>
                    <td className="px-6 py-4 border border-gray-200">
                      <button onClick={() => handleFinishOrder(order.id)} className="px-4 py-2 bg-green-500 text-white rounded">Accept</button>
                      <button onClick={() => handleRejectOrder(order.id)} className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
