import React, { useState } from "react";
import { FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import baseUrl from "../../envarment";

export default function Cards() {
  const [data, setData] = useState([]);
  const [currentPage, setCurentPage]= useState(1)
  const itemsPerPage = 6;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);
  useState(() => {
    const getData = async () => {
      const res = await fetch(baseUrl+"/api/v1/listproduct");
      const data = await res.json();
      setData(data?.data);
    };
    getData();
  }, []);
  return (
    <div className="mx-2 md:px-10 mt-10">
      <div>
        <h1 className="text-2xl font-bold">Recent offers</h1>
        <Link className="cursor-pointer text-blue-600 hover:underline">
          Show more offers
        </Link>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6 p-2 md:p-1">
          {data && currentItems.map((e, i) => {
            return (
              <Link key={i} to={`/list-product/${e._id}`} >
               <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <img
                  src={e.imageUrls}
                  alt="Cozy Cabin in the Woods"
                  width={500}
                  height={400}
                  className="object-cover w-full h-64"
                />
                <div className="bg-white p-4 dark:bg-gray-950">
                  <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">{e?.name}</h3>
                  <h3 className="text-red-500 font-bold capitalize">{`for-${e?.type}`}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{e?.address}</p>
                  <p className="text-sm/relaxed">
                    {e?.description.substring(0, 78)}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="font-semibold text-lg capitalize">
                      ₹{" "}
                      {e?.type === "rent"
                        ? `${e?.regularPrice} /month`
                        : `${e?.regularPrice}`}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaBed className="w-4 h-4" />
                      <span>{e?.bedrooms}</span>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
}
