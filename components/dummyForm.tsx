import React, { useEffect, useRef, useState } from "react";
import { animated } from "@react-spring/web";
type Props = {
  stateProps: {
    setState: any;
    state:string[]
  },
springProps:{
    style:any
  }
};

import { Fragment } from "react";

const DummyFor = ({stateProps,springProps}:Props) => {

  const [uno,dos,tres] = stateProps.state
  const [one,setOne] = useState(uno)
  const [two,setTwo] = useState(dos)
  const [three,setThree] = useState(tres)

  const send = ()=>{
    if(one.length > 0 && two.length > 0 && three.length > 0){
    stateProps.setState([one,two,three])
    }
  }
  return (
    <animated.form className="border-b border-gray-900/10 pb-2" style={springProps.style} onSubmit={(e)=>{
      console.log(e)
      e.preventDefault()
    }}>
      <div className="sm:col-span-4">
        <label
          htmlFor="text"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Resolución de creación de EP/P
        </label>
        <div className="mt-2">
          <input
            type="text"
            defaultValue={one}
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
            onChange={(e)=>setOne(e.target.value)}
          />
        </div>
      </div>
      <div className="sm:col-span-4">
        <label
          htmlFor="text"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Res. aprobación del Plan Curricular vigente
        </label>
        <div className="mt-2">
          <input
            type="text"
            defaultValue={two}
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
            onChange={(e)=>setTwo(e.target.value)}
          />
        </div>
      </div>
      <div className="sm:col-span-4">
        <label
          htmlFor="text"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Resolución de conformación del CIEC
        </label>
        <div className="mt-2">
          <input
            type="text"
            defaultValue={three}
            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
            onChange={(e)=>setThree(e.target.value)}
          />
        </div>
      </div>
        <button  onClick={()=>send()} className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 hover:text-black sm:ml-0 sm:mt-2 sm:w-auto" 
      >Enviar</button>
    </animated.form>
  );
};
export default DummyFor;
