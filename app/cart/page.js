"use client";
import React from "react";
import { useContext } from "react";

import CartContext from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const { cart, addItemToCart, deleteItemFromCart, saveOnCheckout } =
    useContext(CartContext);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    addItemToCart(item);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2);

  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  const checkoutHandler = () => {
    const data = {
      amount: amountWithoutTax,
      tax: taxAmount,
      totalAmount,
    };

    saveOnCheckout(data);
  };

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className=" max-width px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>

      {cart?.cartItems?.length > 0 && (
        <section className="py-10">
          <div className=" max-width px-4">
            <div className="flex gap-4 flex-col items-end lg:flex-row lg:items-start">
              <main className="w-full lg:w-3/4">
                <article className="border border-[#aaa] shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem) => (
                    <div>
                      <div className="flex cart-product gap-5 items-center mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex items-center leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-[#aaa] overflow-hidden relative">
                                <Image
                                  fill
                                  style={{ objectFit: "contain" }}
                                  src={cartItem.image.url}
                                  alt={cartItem.name}
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href="#" className="hover:text-blue-600">
                                  {cartItem.title}
                                </a>
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-blue-100  hover:text-[#000] hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="outline-none focus:outline-none text-center w-full bg-blue-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-blue-100 text-metal hover:text-[#000] hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              ${cartItem.price * cartItem.quantity.toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              ${cartItem.price} / per item{" "}
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-error shadow-sm border border-error rounded-md  hover:opacity-80 cursor-pointer"
                              onClick={() =>
                                deleteItemFromCart(cartItem?.product)
                              }
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" style={{ color: "#aaa" }} />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="w-full md:w-1/2 lg:w-1/4 ">
                <article className="border border-[#aaa] shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-[#333]  mb-1">
                      <span>Amount before Tax:</span>
                      <span>${amountWithoutTax}</span>
                    </li>
                    <li className="flex justify-between text-[#333]  mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </li>
                    <li className="flex justify-between text-[#333]  mb-1">
                      <span>TAX:</span>
                      <span>${taxAmount}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>${totalAmount}</span>
                    </li>
                  </ul>

                  <a
                    onClick={checkoutHandler}
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green border border-transparent rounded-md hover:opacity-80 cursor-pointer"
                  >
                    Continue
                  </a>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green shadow-sm border border-metal rounded-md"
                  >
                    Back to shop
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
