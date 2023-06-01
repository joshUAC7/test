import React, { useEffect, useState, CSSProperties, ReactElement } from "react";
import Programa1 from "./programa1";
import { dataStore } from "@/types/store";
import ButtonCard from "./buttonCard";
import Optioner from "./optioner";
import DummyFor from "./dummyForm";
import {
  useTransition,
  config,
  animated,
  useSpringRef,
  AnimatedProps,
} from "@react-spring/web";

type Props = {
  componentName: string;
  componentData: dataStore | any;
  stateProps: {
    pos: number;
    state: number;
    setState: (index: number, bool: boolean) => void;
  };
  componentsStates: [string, string, string, string[]];
  funFinal: any;
};

const Modal = ({
  componentName,
  componentData,
  stateProps,
  componentsStates,
  funFinal,
}: Props) => {
  //  const [idx,setIdx] = useState(0)
  const add = () => {
    stateProps.state < myComponents.length - 1 &&
      stateProps.setState(stateProps.pos, true);
  };

  const min = () => {
    stateProps.state > 0 && stateProps.setState(stateProps.pos, false);
  };

  const gradePos = (name: string, newValue: number) => {
    funFinal[0](stateProps.pos - 1, name, newValue);
  };

  function getByLevels(
    data: any,
    components: [typeof Programa1, typeof Optioner, typeof Optioner]
  ) {
    const finalResults: ((
      props: AnimatedProps<{ style: CSSProperties }>
    ) => ReactElement)[] = [];
    const First = components[0];
    const Two = components[1];
    const Three = components[2];
    finalResults.push(({ style }) => (
      <First
        data={data}
        springProps={{ style: style }}
        stateProps={{ state: componentsStates[0], setState: funFinal[0] }}
      ></First>
    ));
    const lvl2 = data
      .filter((ele) => ele.name == componentsStates[0])
      .map((ele) => ({ style }) => (
        <Two
          data={ele.childs}
          springProps={{ style: style }}
          stateProps={{ state: componentsStates[1], setState: funFinal[1] }}
        ></Two>
      ));
    finalResults.push(lvl2[0]);
    const lvl3 = data
      .filter((ele) => ele.name == componentsStates[0])
      .map((ele2) =>
        ele2.childs
          .filter((ele3) => ele3.name == componentsStates[1])
          .map((ele4) => ({ style }) => (
            <Three
              data={ele4.childs}
              springProps={{ style: style }}
              stateProps={{ state: components[2], setState: funFinal[2] }}
            ></Three>
          ))
      );
    finalResults.push(lvl3[0][0]);
    // finalResults.push(lvl3[0])

    return finalResults;
  }

  const transRef = useSpringRef();
  const transitions = useTransition(stateProps.state, {
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });
  let myComponents: ((
    props: AnimatedProps<{ style: CSSProperties }>
  ) => ReactElement)[] = [];
  switch (componentName) {
    case "evaluadores": {
      myComponents = (componentData as dataStore).evaluadores.map(
        (ele, pos) => {
          pos = pos;
          return ({ style }) => (
            <ButtonCard
              name={ele.name}
              springProps={{ style: style }}
              stateProps={{ pos: pos, state: ele.grade, setState: gradePos }}
            ></ButtonCard>
          );
        }
      );
      break;
    }
    case "diferents": {
      myComponents = getByLevels(componentData, [
        Programa1,
        Optioner,
        Optioner,
      ]).concat(({ style }) => (
        <DummyFor
          springProps={{ style: style }}
          stateProps={{ setState: funFinal[3], state: componentsStates[3] }}
        ></DummyFor>
      ));
      break;
    }
  }
  useEffect(() => {
    transRef.start();
  }, [stateProps.state]);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="inset-0 z-10 overflow-y-auto">
        <div className="flex sm:max-h-full items-center justify-between p-4 text-center sm:items-center sm:p-0">
          <div className="transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-screen-lg sm:w-[53rem] sm:h-[28rem]">
            <div className="bg-gray-50 px-4  pt-5  min-h-[50%]">
              <div className="pt-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex flex-row justify-between">
                    <h3
                      className="text-xl font-semibold leading-6 text-gray-900 mb-5"
                      id="modal-title"
                    >
                      {componentName == "diferents"
                        ? `Programa`
                        : componentName == "evaluadores" && componentData.title}
                    </h3>
                    <p className="text-base text-black font-bold">
                      {stateProps.state + 1}/{myComponents.length}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    {componentName == "evaluadores" && (
                      <p className="text-base sm:w-10/12 sm:h-28 border-b border-gray-900/10">
                        {componentData.message}
                      </p>
                    )}
                    <div className="flex flex-row">
                      <div className="w-0"></div>
                      {/* {myComponents[stateProps.state]} */}
                      {transitions((style, i) => {
                        const Page = myComponents[i];
                        return <Page style={style} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4  sm:flex sm:flex-row sm:px-6 justify-between">
              <button
                onClick={min}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Anterior
              </button>
              {componentName == "diferents" ? (""): stateProps.state == myComponents.length - 1 ? (
                ""
              ) : ( 
                <button
                  onClick={add}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
