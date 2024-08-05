"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import CartContext from "../../../context/CartContext";
import Image from "next/image";
import axios from "axios";

const Shipping = ({ addresses }) => {
  const { cart } = useContext(CartContext);

  const [shippingInfo, setShippinInfo] = useState("");

  const setShippingAddress = (address) => {
    setShippinInfo(address._id);
  };

  const checkoutHandler = async () => {
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }
    // move to stripe checkoutpage
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout_session`,
        {
          items: cart?.cartItems,
          shippingInfo,
        }
      );

      window.location.href = data.url;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="h-full">
      <section className="py-10 bg-lightgray h-full">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-[#aaa] bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 class="text-xl font-semibold mb-5">Shipping information</h2>

                <div class="grid sm:grid-cols-2 gap-4 mb-6">
                  {addresses?.map((address) => (
                    <label
                      class="flex p-3 border border-[#aaa] rounded-md bg-gray-[#ddd] hover:border-blue-500 hover:bg-blue-100 cursor-pointer"
                      onClick={() => setShippingAddress(address)}
                    >
                      <span>
                        <input
                          name="shipping"
                          type="radio"
                          class="h-4 w-4 mt-1"
                        />
                      </span>
                      <p class="ml-2">
                        <span>{address.street}</span>
                        <small class="block text-sm text-[#444]">
                          {address.city}, {address.state}, {address.zipCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNo}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>

                <Link
                  href="/profile/newAddress"
                  className="px-4 py-2 inline-block text-blue-500 border border-[#aaa] rounded-md hover:bg-[#ddd] hover:border-blue-500"
                >
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-[#222] bg-white shadow-sm border border-[#333] rounded-md hover:bg-[#aaa] hover:text-blue-500"
                  >
                    Back
                  </Link>
                  <a
                    className="px-5 py-2 inline-block text-white bg-green border border-transparent rounded-md hover:opacity-80 cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </a>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Amount:</span>
                    <span>${cart?.checkoutInfo?.amount}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Est TAX:</span>
                    <span>${cart?.checkoutInfo?.tax}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className="text-[#222] font-bold">
                      ${cart?.checkoutInfo?.totalAmount}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 class="text-lg font-semibold mb-3">Items in cart</h2>

                {cart?.cartItems?.map((item) => (
                  <figure class="flex items-center mb-4 leading-5">
                    <div>
                      <div class="block relative w-20 h-20 rounded p-1 border border-[#666]">
                        <Image
                          fill
                          objectFit="contain"
                          src={item.image.url}
                          alt="Title"
                        />
                        <span class="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-[#bbb] rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <figcaption class="ml-3">
                      <p className="text-[#000]">
                        {" "}
                        {item.title.substring(0, 50)}
                      </p>
                      <p class="mt-1 text-[#222]">
                        Total: ${item.quantity * item.price}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
