"use client";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { setMaxListeners } from "stream";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "usehooks-ts";
import { motion } from "framer-motion";

const Filter = ({ categories }) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const mobile = useMediaQuery("(max-width: 1024px)");
  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const [min, setMin] = useState(searchParams.get("min"));
  const [max, setMax] = useState(searchParams.get("max"));

  const router = useRouter();
  const pathname = usePathname();

  const removeQueryParam = (paramName) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(paramName);
    window.history.replaceState({}, "", url.toString());
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      if (name === "category") {
        params.delete("min");
        params.delete("max");
      }
      params.set(name, value);
      params.delete("page");
      params.delete("q");
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setMin(searchParams.get("min") || "");
    setMax(searchParams.get("max") || "");
  }, [searchParams, searchParams.get("min"), searchParams.get("max")]);

  const updateQuery = (field, value) => {
    router.push(pathname + "?" + createQueryString(field, value));
  };

  const removeQuery = () => {
    window.history.replaceState(null, null, window.location.pathname);
    window.location.reload();
  };
  const open = !mobile ? true : isOpen;
  return (
    <div className="lg:w-[25%]">
      <div className="border rounded border-[#bbb] p-5">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h1 className="py-2 font-semibold">Price($)</h1>
            <a
              className="py-2 text-xs hover:underline cursor-pointer"
              onClick={removeQuery}
            >
              Reset
            </a>
          </div>
          <div className="flex gap-3 w-full">
            <input
              type="text"
              placeholder="min"
              className="border border-silver rounded p-2 flex-1 w-full text-sm"
              value={min}
              onChange={(e) => {
                setMin(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="max"
              className="border border-silver rounded p-2 flex-1 w-full text-sm"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
            <button
              className="bg-buttonhover text-white border-silver rounded p-2 px-3 flex-1 w-full opacity-80 hover:opacity-100"
              onClick={() => {
                min && updateQuery("min", min);
                max && updateQuery("max", max);
              }}
            >
              Go
            </button>
          </div>
        </div>
        <div className="w-full mt-4">
          <div
            className="flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1 className="py-2 font-semibold">Category</h1>
            {mobile && (
              <FontAwesomeIcon
                icon={isOpen ? faAngleUp : faAngleDown}
                className="cursor-pointer"
              />
            )}
          </div>
          <div className="flex gap-1 flex-col w-full">
            {open &&
              categories &&
              categories.map((item) => (
                <label
                  className="capitalize cursor-pointer"
                  style={{ fontSize: "0.9rem" }}
                  onClick={() => {
                    updateQuery("page", 1);
                    updateQuery("category", item.name);
                    console.log("click1");
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    className="mr-2 cursor-pointer"
                    value={item.name}
                    checked={category === item.name}
                  />
                  {item.name.replace("-", " ")}
                </label>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
