"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, productsCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  return (
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="relative inline-flex items-center  border-[#333] bg-white px-4 py-2 text-sm font-medium text-[#222] hover:bg-[#ddd] focus:z-20"
        activeLinkClassName="z-10 inline-flex items-center border border-metal bg-blue-100 text-sm font-medium text-blue-500 focus:z-20"
        activeClass="z-10 inline-flex items-center border border-blue-500 bg-blue-100 text-sm font-medium text-blue-500 focus:z-20"
      />
    </div>
  );
};

export default CustomPagination;
