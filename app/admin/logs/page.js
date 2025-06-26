import React from "react";
import { headers } from "next/headers";
import AdminLogs from "../../components/admin/logs";

const getLogs = async () => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  const res = await fetch(`${process.env.API_URL}/api/admin/logs`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  return res.json();
};

const Logs = async () => {
  const data = await getLogs();

  return <AdminLogs data={data} />;
};

export default Logs;
