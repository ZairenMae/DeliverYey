import { useState } from 'react';
import axios from 'axios';
import { Footer, Navbar } from "@/widgets/layout";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Checkout() {
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [note, setNote] = useState('');
  const [studentId, setStudentId] = useState(''); // Assuming you have a way to get studentId

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/delivery/insertDelivery', {
        location,
        phoneNumber,
        paymentMethod,
        notes: note // Changed this line to use 'note'
      });
      console.log('Order submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar />
      </div>

      <section className="relative block h-[11vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-[#F9E4C9] bg-cover bg-center" />
      </section>

      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#F97108] sm:text-4xl">Checkout</h2>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="location" className="block text-sm font-semibold leading-6 text-black">
                Location
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-black">
                Phone Number
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="paymentMethod" className="block text-sm font-semibold leading-6 text-black">
                Payment Method
              </label>
              <div className="relative mt-2.5">
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full h-full rounded-md border border-gray-300 bg-white py-2 pl-4 pr-9 text-black focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                >
                  <option value="cash">Cash</option>
                  <option value="gcash">Gcash</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="note" className="block text-sm font-semibold leading-6 text-black">
                Note
              </label>
              <div className="mt-2.5">
                <textarea
                  name="note"
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-[#F97108] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#F97108] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97108]"
            >
              Pay
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
