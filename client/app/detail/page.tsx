"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Detail() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "http://localhost:3000/detail/" + searchParams.get("id")
      );
      const json = await res.json();
      setData(json?.data);
    }
    fetchData();
  }, []);

  return (
    <>
      {data !== null && (
        <main className="flex min-h-screen flex-col items-center p-24">
            <img src={data.thumbnail} />
          <h2>{data.title}</h2>
          <h2>{data.description}</h2>
          <h2>USD {data.price}</h2>
        </main>
      )}
    </>
  );
}
