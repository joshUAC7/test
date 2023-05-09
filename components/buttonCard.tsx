import React, { useState } from "react";
import { animated } from "@react-spring/web";
type Props = {
  name:String,
  stateProps:{
    pos:number,
    state:number,
    setState:any
  },
  springProps:{
    style:any
  }
}

const ButtonCard = ({name,stateProps,springProps}:Props) => {

  const handleButtonSelect =(buttonNumber:number)=>{
    stateProps.setState(name,buttonNumber)
    console.log(stateProps)
  }

  let myColor = ""
  let myHoverColor = ""
  switch(name){
    case 'Pertinente':
      myColor = "bg-cyan-400"
      myHoverColor = "hover:bg-cyan-400"
      break
    case 'Congruencia':
      myColor = "bg-violet-400"
      myHoverColor = "hover:bg-violet-400"
      break
    case 'Suficiencia':
      myColor = "bg-amber-400"
      myHoverColor = "hover:bg-amber-400"
  }
  return (
    <animated.div className="flex flex-col text-xl mb-5" style={springProps.style}>
      <h4 className={"mt-2 inline-flex w-max gap-x-1.5 rounded-md bg-white px-3 py-2  font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:text-black border hover:bg-gray-100"}>{name}</h4>
    <div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
      {[1, 2, 3, 4, 5].map((buttonNumber) => (
        <button
          key={buttonNumber}
          className={`${
            stateProps.state == buttonNumber
              ? `${myColor} text-black`
              : ""
          } relative hidden items-center px-4 py-2  font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 md:inline-flex ${myHoverColor}`}
          onClick={() => handleButtonSelect(buttonNumber)}
        >
          {buttonNumber}
        </button>
      ))}
    </div>
    </animated.div>
  );
};

export default ButtonCard;
