"use client";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { countries } from "countries-list";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRotateBack } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheckk] = useState();

  const { user, setUpdated, clearErrors, updated, error, updatePassword } =
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
    if (!password || !passwordCheck) {
      toast.error("All fields requiered.");
      return false;
    }
    if (password !== passwordCheck) {
      toast.error("Passwords don't match.");
      return false;
    }
    await updatePassword(user._id, {
      password,
    });
  };

  return (
    <div className="flex gap-3 py-5">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <Link href="/profile">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="font-semibold">Update Password</h1>
        </div>
        <div className="flex flex-col  gap-3 w-full">
          <div className="w-[50%]">
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded p-2 text-sm shadow w-full"
            />
          </div>
          <div className="w-[50%]">
            <label className="block mb-1">New Password Check </label>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheckk(e.target.value)}
              placeholder="Password check"
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
