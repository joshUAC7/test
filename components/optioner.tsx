import React, { useEffect, useRef, useState } from "react";
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

import { Fragment } from "react";
import { Menu, MenuProps, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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
  return (
    <animated.div style={springProps.style}>
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => {
        return (
          <div className="">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {data[0].type}
            </Menu.Button>
            <div>
              {/*
                Using the `static` prop, the `Menu.Items` are always
                rendered and the `open` state is ignored.
              */}
              { (
                <Menu.Items
                  static
                  className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {data.map((ele) => (
                    <Menu.Item as="div" key={ele.name} onClick={()=>changeState(ele.name)}>
                      {({ active }) => (
                  <a
                  className={ele.name == stateProps.state?classNames(
                    'bg-gray-400 text-gray-900', active ? 'text-gray-700':'text-gray-100',
                    'block px-4 py-2 text-sm'
                  ):'bg-gray-100 text-gray-900 block px-4 py-2 text-sm'}
                >
                          {ele.name}
                </a>
                      )
                      }
                    </Menu.Item>
                  ))}
                </Menu.Items>
              )}
            </div>
          </div>
        );
      }}
    </Menu>
</animated.div>
  );
};
export default Optioner;
