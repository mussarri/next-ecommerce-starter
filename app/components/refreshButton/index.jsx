"use client";
import React from "react";

const RefreshButton = () => {
  const removeQuery = () => {
    window.history.replaceState(null, null, window.location.pathname);
    window.location.reload();
  };

  return (
    <a className="cursor-pointer" onClick={removeQuery}>
      Refresh
    </a>
  );
};

export default RefreshButton;
