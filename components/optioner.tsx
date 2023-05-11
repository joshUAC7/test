import React, { useEffect, useRef, useState } from "react";
import { animated } from "@react-spring/web";
import "../styles/myStyle.module.css"
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

import { Fragment } from "react";
import { Menu, MenuProps, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
function divMod(a:number, b:number) {
  return [Math.trunc(a / b), a % b];
}
function getOrderData(data:{type:string,name:string}[]){
  const finalData = []
  const [q,r] = divMod(data.length,5)
  let acum = 0
  for (const i of Array.from(Array(q).keys())) {
   finalData.push(data.slice(acum,acum+5))
    acum+=5
  }  
  if(r !== 0 ){
  finalData.push(data.slice(acum,acum+r))
  }
  return finalData
}

const Optioner = ({ data, stateProps ,springProps}: Props) => {
  // let ga = <Menu>haa</Menu>
  // console.log(ga)
  // const menuRef = useRef(null)

  // useEffect(()=>{
  //   console.log((menuRef.current!! as any).attributes[1].value)
  //   menuRef.current!!.attributes[1].value = "open"
  // },[])
  //

  const changeState = (name:string)=>{
    stateProps.setState(name)
    console.log(name)
  }
  console.log(data)
  const newData = getOrderData(data)
  return (
    <animated.div style={springProps.style} className="w-full">
    <Menu as="div" className="relative text-left w-full">
      {({ open }) => {
        return (
          <div className="">
            <Menu.Button className="inline-flex w-max ml-0 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {newData[0][0].type}
            </Menu.Button>
            <div className="flex justify-start">
              {/*
                Using the `static` prop, the `Menu.Items` are always
                rendered and the `open` state is ignored.
              */}
              {newData.map((tab)=>(
                <Menu.Items
                    as="div"
                  static
                  className="z-10 menuItems overflow-auto mt-2 mx-2 sw:w-max sw:h-3 divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    style={{height:"fit-content"}}
                >
                  {tab.map((ele) => (
                    <Menu.Item as="div" key={ele.name} onClick={()=>changeState(ele.name)}>
                      {({ active }) => (
                  <a
                  className={ele.name == stateProps.state?classNames(
                    'bg-gray-300 text-gray-900', active ? 'text-gray-700':'text-gray-100',
                    'block px-2 py-2 text-sm  cursor-pointer'
                  ):'bg-gray-100 text-gray-900 block px-2 py-2 text-sm cursor-pointer'}
                >
                          {ele.name}
                </a>
                      )
                      }
                    </Menu.Item>
                  ))}
                </Menu.Items>
              ))}
            </div>
          </div>
        );
      }}
    </Menu>
</animated.div>
  );
};
export default Optioner;
