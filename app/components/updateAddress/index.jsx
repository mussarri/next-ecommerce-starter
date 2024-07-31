"use client";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { countries } from "countries-list";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRotateBack } from "@fortawesome/free-solid-svg-icons";

const Page = ({ address }) => {
  const [street, setStreet] = useState(address.street);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [phoneNo, setPhone] = useState(address.phoneNo);
  const [zipCode, setZipCode] = useState(address.zipCode);
  const [country, setCountry] = useState(address.country);

  const {
    setUpdated,
    clearErrors,
    updated,
    error,
    updateAddress,
    deleteAddress,
  } = useContext(AuthContext);

  const countriesList = Object.values(countries);
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (updated) {
      toast.success("Updated successfully");
      setUpdated(false);
    }
  }, [updated, error]);

  const handleSubmit = async () => {
    if (!street || !city || !state || !phoneNo || !zipCode || !country) {
      toast.error("All fields requiered.");
      return false;
    }
    await updateAddress(id, {
      street,
      city,
      state,
      phoneNo,
      zipCode,
      country,
    });
  };

  const handleDelete = async () => {
    if (confirm("Are you sure")) {
      await deleteAddress(id);
    }
  };

  return (
    <div className="flex gap-3 py-5">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <Link href="/profile">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="font-semibold">Add Address</h1>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="">
            <label className="block mb-1"> Street </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              className="border rounded p-2 text-sm shadow w-full"
            />
          </div>
          <div className="">
            <label className="block mb-1"> City </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border rounded p-2 text-sm shadow w-full"
            />{" "}
          </div>
          <div className="">
            <label className="block mb-1"> State </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="border rounded p-2 text-sm shadow w-full"
            />{" "}
          </div>
          <div className="">
            <label className="block mb-1"> Phone No </label>
            <input
              type="text"
              value={phoneNo}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone No"
              className="border rounded p-2 text-sm shadow w-full"
            />{" "}
          </div>

          <div className="">
            <label className="block mb-1"> Zip Code </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zip Code"
              className="border rounded p-2 text-sm shadow w-full"
            />{" "}
          </div>
          <div className="">
            <label className="block mb-1"> Country </label>
            <select
              className="appearance-none border border-[#aaa] bg-[#ddd] rounded-md py-2 px-3 hover:border-[#333] focus:outline-none focus:border-[#444] w-full"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countriesList &&
                countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="text-right">
          <button
            className="border border-error text-error  p-2 px-3 mr-2 rounded hover:bg-error hover:text-white"
            onClick={handleDelete}
          >
            Delete{" "}
          </button>
          <button
            className="bg-buttonhover p-2 px-3 rounded text-white hover:opacity-80"
            onClick={handleSubmit}
          >
            Update{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
