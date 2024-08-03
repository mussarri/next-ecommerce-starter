"use client";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { countries } from "countries-list";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data } = useSession();
  const [name, setName] = useState(data?.user?.name);
  const [email, setEmail] = useState(data?.user?.email);

  const { setUpdated, clearErrors, updated, error, updateProfile } =
    useContext(AuthContext);

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
    if (!name || !email) {
      toast.error("All fields requiered.");
      return false;
    }

    await updateProfile(data.user._id, {
      name,
      email,
    });
  };

  return (
    <div className="flex gap-3 py-5">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <Link href="/profile">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="font-semibold">Update Profile</h1>
        </div>
        <div className="flex flex-col  gap-3 w-full">
          <div className="w-[50%]">
            <label className="block mb-1"> Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              className="border rounded p-2 text-sm shadow w-full"
            />
          </div>
          <div className="w-[50%]">
            <label className="block mb-1"> Email </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded p-2 text-sm shadow w-full"
            />{" "}
          </div>
        </div>
        <div className="text-right">
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
