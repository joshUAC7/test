import React, { useState } from "react";
import { animated } from "@react-spring/web";
type Props = {
  data: {
    type: string;
    name: string;
  }[];
  stateProps: {
    state: string;
    setState: any;
  },
springProps:{
    style:any
  }
};

const Programa1 = ({ data, stateProps,springProps }: Props) => {
  console.log(stateProps);
  const change = (name: string) => {
    stateProps.setState(name);
  };
  console.log(stateProps.state);
  return (
    <animated.div className="flex flex-row pb-10" style={springProps.style}>
      {data.map((ele) => (
        <div
          key={ele.name}
          onClick={() => change(ele.name)}
          className="bg-white shadow-lg rounded-lg p-6 sm:w-1/3 mx-5 sm:h-44 cursor-pointer"
        >
          <h2 className="text-lg font-semibold mb-2">{ele.name}</h2>
          <p className="text-gray-600">Contenido de {ele.name}</p>
        </div>
      ))}
    </animated.div>
  );
};

export default Programa1;
