"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/all");
      const json = await res.json();
      setData(json?.data);
    }
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {data?.map((item) => (
          <>
            <Link
              href={{ pathname: "/detail", query: { id: item.id } }}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {item.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {item.description}
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                USD {item.price}
              </p>
            </Link>
          </>
        ))}
      </div>
    </main>
  );
}
