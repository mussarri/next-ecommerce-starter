"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Pagination from "../../pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductContext from "../../../../context/ProductContext";

const Products = ({ data }) => {
  const { deleteProduct } = useContext(ProductContext);

  const handleDelete = async (id) => {
    console.log(id);
    if (confirm("Are you sure?")) {
      deleteProduct(id);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.productsCount} Products
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr className="bg-white">
              <td className="px-6 py-2">{product?.title}</td>
              <td className="px-6 py-2">{product?.stock}</td>
              <td className="px-6 py-2">${product?.price}</td>
              <td className="px-6 py-2">
                <div>
                  {/* <Link
                    href={`/admin/products/upload_images`}
                    className="px-2 py-2 inline-block text-[#16a34a] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faImage} />
                  </Link> */}

                  <Link
                    href={`/admin/productupdate/` + product._id}
                    className="px-2 py-2 inline-block text-[#facc15] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-[#dc2626] bg-white shadow-sm border border-[#ccc] rounded-md hover:bg-lightgray cursor-pointer"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <Pagination
          resPerPage={data?.resPerPage}
          productsCount={data?.productsCount}
        />
      </div>
    </div>
  );
};

export default Products;
