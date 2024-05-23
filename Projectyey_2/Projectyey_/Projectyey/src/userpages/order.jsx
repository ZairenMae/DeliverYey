import { Footer, Navbar } from "@/widgets/layout";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState, useEffect  } from "react";
import axios from 'axios';

const products = [
  {
    id: 1,
    name: 'Salad',
    href: '/order',
    imageSrc: 'src/image/salad.png',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '₱20',
    color: 'Order Now',
    category:'breakfast',
  },
  {
    id: 2,
    name: 'Pizza',
    href: '/order',
    imageSrc: 'src/image/pizza.png',
    price: '₱30',
    color: 'Order Now',
    category:'lunch',
  },
  {
    id: 3,
    name: 'Burger',
    href: '/order',
    imageSrc: 'src/image/burger.png',
    price: '₱25',
    color: 'Order Now',
    category:'snacks',
  },
  {
    id: 4,
    name: 'Drinks',
    href: '/order',
    imageSrc: 'src/image/drinks.png',
    price: '₱25',
    color: 'Order Now',
    category:'dinner',
  },
  // More products...
]

export function Order() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orderitem/getAllOrderItem');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
  
        // Extract numeric value from the price string
        const price = parseFloat(product.price.replace('₱', ''));
  
        axios.post('http://localhost:8080/menu/insertMenu', {
          name: product.name,
          price: price,  // Send numeric price value
          category: product.category,
          // Add other necessary data
        })
        .then((response) => {
          console.log('Item added successfully:', response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.error('Error adding item to cart:', error.response.data);
            alert(`Error: ${error.response.data.message || 'Failed to add item to cart'}`);
          } else {
            console.error('Error adding item to cart:', error.message);
            alert('Failed to add item to cart');
          }
        });
  
        return updatedItems;
      }
    });
  };
  
    

  const removeFromCart = (productId) => {
    if (!productId) {
      console.error('Invalid productId:', productId);
      return; // Exit the function early if productId is invalid
    }
  
    // Make HTTP request to delete order item
    axios.delete(`http://localhost:8080/orderitem/deleteOrderItem/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          // If request succeeds, update cart items
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
          );
        } else {
          throw new Error(`Failed to remove item from cart: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
        // If request fails, do not update cart items
      });
  };  
  
  const getTotal = () => {
    console.log("Cart Items:", cartItems); // Log the cartItems array
    return cartItems.reduce(
      (total, item) => {
        console.log("Item:", item);
        console.log("Price:", item.price);
        console.log("Quantity:", item.quantity);
        return total + (item.price ? parseFloat(item.price.slice(1)) * item.quantity : 0); // Check if item.price is defined before accessing it
      },
      0
    );
  };  
  
  
  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await axios.put('http://localhost:8080/orderitem/updateOrderItem', {
        id: productId,
        quantity: quantity,
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar />
      </div>

      <section className="relative block h-[11vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-[#F9E4C9] bg-cover bg-center" />
      </section>

      <section>
        <div className="container mx-auto">
          <div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <button
                  type="button"
                  className="rounded-md bg-[#F97108] px-4 py-2 text-white justify-right"
                  onClick={() => setOpen(true)}
                >
                  View Cart
                </button>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center">Menu</h1>
              
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-left">Breakfast</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-black">
                          <button onClick={() => addToCart(product)}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 text-left">Lunch</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-black">
                          <button onClick={() => addToCart(product)}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 text-left">Snacks</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-black">
                          <button onClick={() => addToCart(product)}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 text-left">Dinner</h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-black">
                          <button onClick={() => addToCart(product)}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </button>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.imageSrc}
                                      alt={item.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={item.href}>{item.name}</a>
                                        </h3>
                                        <p className="ml-4">{item.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty {item.quantity}</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-[#F97108] hover:text-[#F97108]"
                                          onClick={() => removeFromCart(item.id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₱{getTotal()}</p>
                        </div>
                        <div className="mt-6">

                          <a
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-[#F97108] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#F97108]"
                          >
                            Checkout
                          </a>

                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-[#F97108] hover:text-[#F97108]"
                              onClick={() => setOpen(false)}
                            >
                              Exit
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Order;