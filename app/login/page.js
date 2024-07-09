import React from "react";

const Login = () => {
  return (
    <div className="w-full flex justify-center items-center  ">
      <div className="flex flex-col gap-3 border p-4 rounded w-[400px]">
        <h2 className="font-bold text-xl">Hosgeldiniz</h2>
        <div className="flex flex-col gap-1">
          <label>Kullanici Adi</label>
          <input type="text" className="border p-2 rounded" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Parola</label>
          <input type="password" className="border p-2 rounded" />
        </div>
        <div className="text-right">
          <button className="py-2 px-1 bg-indigo-600 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
