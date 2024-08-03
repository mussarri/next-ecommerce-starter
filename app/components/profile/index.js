"use client";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ address = [] }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 py-5">
        <div className="w-12 h-12 bg-metal rounded-full text-white flex justify-center items-center capitalize">
          {user && user?.name?.slice(0, 1)}
        </div>
        <div>
          <p className="font-semibold capitalize">{user && user.name}</p>
          <div className="flex gap-3">
            <p className="font-semibold">Email:</p>
            <p>{user && user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {address &&
          address.map((item) => (
            <Link href={"/profile/updateaddress/" + item._id}>
              <div className="flex bg-lightgray py-5 px-3 rounded gap-3">
                <div className="bg-buttonhover text-white rounded-full w-12 h-12 flex justify-center items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="text-sm">
                  <p>
                    {item.street + " " + item.zipCode + " " + item.city}{" "}
                    <span className="font-semibold uppercase">
                      {item.state}/{item.country}
                    </span>{" "}
                  </p>

                  <p>Tel: {item.phoneNo}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="flex gap-3 border-t border-lightgray py-5">
        <Link
          href={"/profile/newAddress"}
          className="bg-white text-blue-500 border text-sm border-blue-100 hover:bg-blue-100 p-2 px-3 rounded "
        >
          <FontAwesomeIcon icon={faPlus} /> Add New Address
        </Link>
      </div>
    </div>
  );
};

export default Profile;
