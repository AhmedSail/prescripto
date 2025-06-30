import React from "react";

const Title = ({ text1, text2, center, size }) => {
  return (
    <div className="mb-20">
      <div
        className={`flex ipad:justify-center ${
          center ? "justify-center" : "justify-start"
        } items-center gap-2 uppercase font-medium ${size} mt-16 max-sm:text-center  max-sm:mx-auto`}
      >
        <h1 className="text-gray-500">{text1}</h1>
        <h1>{text2}</h1>
        <span className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-500"></span>
      </div>
    </div>
  );
};

export default Title;
