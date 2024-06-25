import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdBathroom } from "react-icons/md";
import { BsFillSignNoParkingFill } from "react-icons/bs";



export default function ProductList() {
  const [listUser, setListUser] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/v1//productlist/${id}`);
      const data = await res.json();
      if (data.success === true) {
        setListUser(data.data);
      }
    };
    getData();
  }, []);
  console.log(listUser);
  return (
    <div>
      <div>
        <img
          className="w-full h-96 object-cover"
          src={listUser?.imageUrls}
          alt=""
        />
      </div>
      <div className="p-2 md:max-w-3xl mx-auto my-4 dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            {listUser?.name}
          </h1>
        </div>
        <div className="py-2">
          <h3>{listUser?.address}</h3>
        </div>
        <div className="flex items-center mt-2 gap-5">
          <Button className="px-20 py-1.5 rounded bg-red-600 text-white">
            {listUser?.type == "sale" ? "Sale" : "Rent"}
          </Button>
          <Button className="px-20 py-1.5 rounded text-white" color="success">
            {listUser?.regularPrice}
          </Button>
        </div>
        <p className="mt-4">
          <b>Description:</b> {listUser?.description}
        </p>
        <div className="flex items-center gap-5 mt-2">
          <div>Beds: {listUser?.bedrooms}</div>
          <div>Bathroom: {listUser?.bathrooms}</div>
          <div>Parking: {listUser?.parking ==true ? "Parking is available" :  "No Parking available"}</div>
          <div>{listUser?.furnished ==true ? "Furnished" :  "Not Furnished"}</div>
        </div>
        <Button className="w-full mt-5" color="success">
          Contect Deller
        </Button>
      </div>
    </div> 
  );
}

 