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
  };
  springProps: {
    style: any;
  };
};

const Programa1 = ({ data, stateProps, springProps }: Props) => {
  console.log(stateProps);
  const change = (name: string) => {
    stateProps.setState(name);
  };
  console.log(stateProps.state);
  const mySvg = [
    <svg  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
      <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z" />
    </svg>,
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" />
    </svg>
  ];
  return (
    <animated.div className="flex flex-row pb-10" style={springProps.style}>
      {data.map((ele, idx) => (
        <div
          key={ele.name}
          onClick={() => change(ele.name)}
          className="bg-white shadow-lg rounded-lg p-6 sm:w-1/3 mx-5 sm:h-44 cursor-pointer text-center flex flex-col"
        >
          {mySvg[idx]}
          <h2 className="text-lg font-semibold mb-2">{ele.name}</h2>
          <p className="text-gray-600">Contenido de {ele.name}</p>
        </div>
      ))}
    </animated.div>
  );
};

export default Programa1;
