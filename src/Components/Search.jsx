import React from "react";

const SearchInput = () => {
  return (
    <div>
    <input
      style={{
        padding: "10px",
        paddingLeft: "35px",
        background: "url('https://cdn-icons-png.flaticon.com/512/622/622669.png') no-repeat 10px center",
        backgroundSize: "16px",
        backgroundColor: "white",
        border: "1px solid #e0e7ff",
        textAlign:"left"
      }}
      className="mt-4 md:w-2/4 w-5/6 h-9 rounded-lg outline-1 px-3"
      placeholder="Search"
    />
  </div>
  
  );
};

export default SearchInput;
