import Image from "next/image";
import { Inter } from "next/font/google";
import { getAllIndicators, getIndicatorBySlug, getMainData } from "@/lib/api";
import { dataStore, ContextType } from "../types/store";
import { AppContext } from "../AppContext";
import { useCallback, useContext, useEffect, useState,Fragment ,useRef} from "react";
import Modal from "@/components/modal";
import { ParserMark } from "@/lib/parser";
import ButtonCard from "@/components/buttonCard";
import { constrainedMemory } from "process";
import useDidMountEffect from "@/customHooks/useDidMountEffect";
import { useWatchStateChange } from "@/customHooks/useWatch";
import { Dialog, Transition } from '@headlessui/react'
import axios from "axios";
import {useSession} from "next-auth/react"
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: any;
  programa: any;
};

function convertData(data: any[]) {
  return data.map(function (ele: any) {
    return {
      ...ele,
      evaluadores: ele.evaluadores.map((ele2: any) => ({
        name: ele2,
        grade: 1,
      })),
    };
  });
}

function convertDataMain(data: any[]) {}
export default function Home({ posts, programa }: Props) {

  const router = useRouter()
  const {data,status} = useSession()
  if(status == "unauthenticated"){
    router.push('/login')
  }
  const [actualData, setActualData] = useState<dataStore[]>((): dataStore[] => {
    return convertData(posts);
  });
  const mainData = programa.data;
  const [programa1, setPrograma1] = useState("Pregrado");
  const [facultad, setFacultad] = useState("Ciencias y Humanidades");
  const [programa2, setPrograma2] = useState("Educacion Inicial Primaria");
  const [resoluciones, setResoluciones] = useState(["", "", ""]);

  const changePrograma1 = (name: string) => {
    setPrograma1(name);
    changeIdxMod(0, true);
    // setFacultad(mainData.filter(ele=>ele.name== programa1)[0].childs[0].name)
  };
  const changeFacultad = (name: string) => {
    setFacultad(name);
    changeIdxMod(0, true);
  };
  const changePrograma2 = (name: string) => {
    setPrograma2(name);
    changeIdxMod(0, true);
  };

  // useEffect(()=>{
  //   setFacultad(mainData.filter(ele=>ele.name == programa1)[0].childs[0].name)
  //   console.log("GAA")
  // },[changePrograma1,programa1])
  // const changeGrade = (name:string)=>{
  //   // setActualData((prevState)=>{
  //   //   const nivel = prevState
  //   //   nivel.find(ele=>ele.type)
  //   // })
  // }
  // // const {data,setData} = useContext(AppContext) as ContextType
  console.log("render");

  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)
  // useEffect(()=>{
  //   if(typeof finalData === 'object' && Object.keys(finalData).length  > 0){
  //     setData(finalData)
  //   }
  // },[setData])
  // useDidMountEffect(()=>{
  //     changeIdxMod(0,true)
  // },[changePrograma1,changeFacultad])

  function findChangedPropertyIndex(prevArray: any, currArray: any) {
    if (prevArray == null) {
      return -1;
    }
    // Recorrer ambos arrays de objetos
    for (let i = 0; i < prevArray.length; i++) {
      for (let j = 0; j < currArray.length; j++) {
        // Si los objetos en la misma posición tienen diferentes propiedades
        if (
          i == j &&
          JSON.stringify(prevArray[i]) !== JSON.stringify(currArray[j])
        ) {
          // Recorrer las propiedades del objeto previo
          for (let prop in prevArray[i]) {
            // Si una propiedad es diferente en el objeto actual
            if (prevArray[i][prop] !== currArray[j][prop]) {
              return i; // Devolver el índice de la posición donde ocurrió el cambio
            }
          }
        }
      }
    }
    // Si no se encontró ningún cambio
    return -1;
  }

  const [idx, setIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState<number[]>(
    Array(actualData.length + 1).fill(0)
  );

  useWatchStateChange(
    (depIndex, prevVal, currentVal) => {
      const idX = findChangedPropertyIndex(prevVal, currentVal);
      let timer: NodeJS.Timeout | number | null = null;
      const limits = [0].concat(
        actualData.map((ele) => ele.evaluadores.length)
      );
      if (idX !== -1) {
        if (modalIdx[idX + 1] < limits[idX + 1] - 1) {
          timer = setTimeout(() => {
            changeIdxMod(idX + 1, true);
          }, 200);
          // changeIdxMod(idx+1,true)
        } else {
          if (modalIdx[idX + 1] == limits[idX + 1] - 1) {
            if(idx == allModals.length -1){

            }else{
            setIdx((prev) => prev + 1);
            }
          }
        }
      }

      return () => clearTimeout(timer!!);
    },
    [actualData]
  );
  const add = () => {
    if(idx == allModals.length -1){
      setOpen(true)
    }
    setIdx((prev) => (prev < allModals.length - 1 ? prev + 1 : prev));
  };

  const min = () => {
    setIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const changeIdxMod = (index: number, bool: boolean) => {
    const nextState = modalIdx.map((ele, i) => {
      if (i == index) {
        return bool ? ele + 1 : ele - 1;
      } else {
        return ele;
      }
    });
    setModalIdx(nextState);
  };

  const changeGrade = (index: number, name: string, newValue: number) => {
    const nextState = actualData.map((ele, i) => {
      if (i == index) {
        return {
          ...ele,
          evaluadores: ele.evaluadores.map((ele2) => {
            if (ele2.name == name) {
              return { ...ele2, grade: newValue };
            } else {
              return { ...ele2 };
            }
          }),
        };
      } else {
        return { ...ele };
      }
    });

    setActualData(nextState);
  };

  const firstModel = [
    <Modal
      key={"one"}
      componentName="diferents"
      componentData={mainData}
      stateProps={{ pos: 0, state: modalIdx[0], setState: changeIdxMod }}
      componentsStates={[programa1, facultad, programa2, resoluciones]}
      funFinal={[
        changePrograma1,
        changeFacultad,
        changePrograma2,
        setResoluciones,
      ]}
    ></Modal>,
  ];
  const myModals = actualData.map((ele, pos) => {
    pos = pos + 1;
    // console.log(pos)
    return (
      <Modal
        key={ele.title}
        componentName="evaluadores"
        componentData={ele}
        stateProps={{ pos: pos, state: modalIdx[pos], setState: changeIdxMod }}
        funFinal={[changeGrade]}
      ></Modal>
    );
  });
  const allModals = firstModel.concat(myModals);
  // const allModals = myModals
  console.log(idx);

  async function getInstrumento(){
    try{

    
    }
    catch(err)
  {

    }
  }
  return (
    <>
      <h1 className="text-4xl font-extrabold dark:text-white pt-10 pl-10">
        INSTRUMENTO DE EVALUACIÓN DE PLANES CURRICULARES DE LA UNIVERSIDAD
        ANDINA DEL CUSCO
      </h1>
      <main
        className={`relative flex justify-center items-center p-12 ${inter.className}`}
      >
        <button
          onClick={min}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l-lg h-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <p className="absolute top-20 pt-3  z-20 text-sm text-gray-400">{`${
          idx + 1
        }-${allModals.length}`}</p>
        {allModals[idx]}
        <button
          onClick={add}
          className={`${idx== allModals.length -1 ?"bg-green-300" :"bg-gray-400 hover:bg-gray-600"}  text-white font-bold py-2 px-4 rounded-r-lg h-20`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform  rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                    Generar Reporte
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                  >
<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        Instrumento de Evaluacion
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >

<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        Descargar Anexo
                  </button>


                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
      </main>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};
export async function getStaticProps({ params }: Params) {
  const posts = getAllIndicators();
  const finalPosts = posts.map((post) => {
    let ga = new ParserMark(post.content);

    ga.Order(ga.node.firstChild!!, 1, null);

    let results = ga.visitorGetContent(ga.node);
    return {
      title: results[0]["message"],
      message: results[1]["message"],
      evaluadores: ga.visitorGetEvaluadores(ga.node),
    };
  });
  const programa = getMainData();
  console.log(programa);

  return {
    props: {
      posts: finalPosts,
      programa: programa,
    },
  };
}
