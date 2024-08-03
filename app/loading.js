"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "calc(100% - 80px)" }}
    >
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="#72aec8"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
