"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (data?.user) {
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addAddress = async ({
    street,
    city,
    state,
    phoneNo,
    zipCode,
    country,
  }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/address`,
        {
          street,
          city,
          state,
          phoneNo,
          zipCode,
          country,
        }
      );

      if (data?.address) {
        router.push("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateAddress = async (
    id,
    { street, city, state, phoneNo, zipCode, country }
  ) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}api/address/` + id,
        {
          street,
          city,
          state,
          phoneNo,
          zipCode,
          country,
        }
      );

      if (data?.address) {
        setUpdated(true);
        router.push("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}api/address/` + id
      );

      if (data?.address) {
        router.push("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        registerUser,
        clearErrors,
        addAddress,
        updateAddress,
        deleteAddress,
        updated,
        setUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
