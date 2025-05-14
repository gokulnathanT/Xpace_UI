import React from "react";
import '../Css/Card.css'
import { Link } from "react-router-dom";
const Cards = ({Data}) => {
  return (
    <>
      <div
        className="relative min-w-1/3 min-h-64 bg-cover bg-no-repeat rounded-lg p-7 pt-5 drop-shadow-sm flex flex-col gap-3"
        style={{
          backgroundImage: "url(/src/assets/images/bgcard3.jpg)",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.80)",
        }}
      >
        <div className="flex justify-between">
          <div className="w-fit bg-[#e0e7ff] px-3 py-1 rounded-md text-center">
            <h2 className="font-sans font-semibold text-[#3730a3] text-sm">
              {Data.status}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-sans font-semibold text-gray-500 text-xs">
              Hosur
            </div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-sans font-bold text-lg text-neutral-900">
            Journey {Data.id}
          </h1>
          <h2 className="font-mono text-gray-500 text-sm">{Data.truckNo}</h2>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-sans font-semibold text-neutral-900 text-base">
                {Data.startLocation}
              </h1>
              <h2 className="font-mono text-gray-500 text-sm">
                {Data.startDate}
              </h2>
            </div>
            <div>
              <h1 className="font-mono font-semibold text-[#3730a3] text-sm">
                -1D-
              </h1>
            </div>
            <div>
              <h1 className="font-sans font-semibold text-neutral-900 text-base">
                {Data.endLocation}
              </h1>
              <h2 className="font-mono text-gray-500 text-sm">
                {Data.endDate}
              </h2>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 w-full flex items-center justify-between p-4 pl-8 rounded-b-lg
    ${
      Data.availableCapacity < 300
        ? "bg-red-100"
        : Data.availableCapacity < 700
          ? "bg-yellow-100"
          : "bg-green-100"
    }`}
        >
          <h1 className="font-sans font-semibold text-neutral-900 text-base">
            Available Capacity:{" "}
            <span className="text-[#3730a3]">{Data.availableCapacity}</span>
          </h1>
          <Link to={`/details/${Data.id}`}>
            <button className="text-white cursor-pointer bg-[#3730a3] rounded-2xl w-[136px] h-8 flex items-center justify-center px-4">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cards;
