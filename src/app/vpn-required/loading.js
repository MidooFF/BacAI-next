import React from "react";
import { Atom } from "react-loading-indicators";

const loading = () => {
  return (
    <div className="w-[100vw] h-[50vh] relative">
      <div className="absolute left-[50%] translate-x-[-50%] bottom-[-60%] max-w-[100%] max-h-[100%]">
        <Atom color="#ff00e9" size="medium" text="" textColor="" />
      </div>
    </div>
  );
};

export default loading;
