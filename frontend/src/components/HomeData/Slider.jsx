import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import baseUrl from "../../envarment";


export default function () {
  const [slides, setSlides] =useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(baseUrl+"/api/v1/listproduct");
      const data = await res.json();
      if (data.data.length > 0) {
        const arrayLength = data.data.length;
        if (arrayLength <= 7) {
          setSlides(data.data);
        } else {
          const startIndex = Math.floor(Math.random() * (arrayLength - 7 + 1));
          const subset = data.data.slice(startIndex, startIndex + 7);
          setSlides(subset);
        }
      }
    };
    getData();
  }, []);
  
  console.log(slides)
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
    return (
      <div className="overflow-hidden relative">
        <div
          className={`flex transition ease-out duration-40 h-96 w-full `}
          style={{
            transform: `translateX(-${current * 20}%)`,
          }}
        >
          {slides.map((s) => {
            return <img src={s?.imageUrls} className="object-cover " />;
          })}
        </div>
  
        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
          <button onClick={previousSlide}>
          <FaArrowAltCircleLeft />
          </button>
          <button onClick={nextSlide}>
          <FaArrowAltCircleRight />
          </button>
        </div>
  
        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrent(i);
                }}
                key={"circle" + i}
                className={`rounded-full w-5 h-5 cursor-pointer  ${
                  i == current ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
  );
}
