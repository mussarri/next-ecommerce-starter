import React from "react";
import Pagination from "../../pagination";

const Logs = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">{data?.logsCount} Logs</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              IP
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.logs?.map((log) => (
            <tr className="bg-white">
              <td className="px-6 py-2">{log?.ip}</td>
              <td className="px-6 py-2">{log?.createdAt}</td>
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

export default Logs;
