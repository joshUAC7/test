import Image from "next/image";
import { Inter } from "next/font/google";
import { getAllIndicators, getIndicatorBySlug, getMainData } from "@/lib/api";
import { dataStore, ContextType } from "../types/store";
import { AppContext } from "../AppContext"; import { useCallback, useContext, useEffect, useState } from "react";
import Modal from "@/components/modal";
import { ParserMark } from "@/lib/parser";
import Post from "./[slug]";
import ButtonCard from "@/components/buttonCard";
import { constrainedMemory } from "process";
import useDidMountEffect from "@/customHooks/useDidMountEffect";
import { useWatchStateChange } from "@/customHooks/useWatch";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: any;
  programa:any
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

function convertDataMain(data:any[]){

}
export default function Home({ posts,programa }: Props) {
  const [actualData, setActualData] = useState<dataStore[]>((): dataStore[] => {
    return convertData(posts);
  }); const mainData = programa.data
  const [programa1, setPrograma1] = useState("Pregrado");
  const [facultad,setFacultad] = useState("Ciencias y Humanidades")
  const [programa2,setPrograma2] = useState("Educacion Inicial Primaria")
  const [resoluciones,setResoluciones] = useState(["","",""])

    const changePrograma1 = (name:string)=>{
    setPrograma1(name)
      changeIdxMod(0,true)
    // setFacultad(mainData.filter(ele=>ele.name== programa1)[0].childs[0].name)
  }
  const changeFacultad = (name:string)=>{
    setFacultad(name)
      changeIdxMod(0,true)
  }
    const changePrograma2 = (name:string)=>{
    setPrograma2(name)
      changeIdxMod(0,true)
  }

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


  // useEffect(()=>{
  //   if(typeof finalData === 'object' && Object.keys(finalData).length  > 0){
  //     setData(finalData)
  //   }
  // },[setData])
  // useDidMountEffect(()=>{
  //     changeIdxMod(0,true)
  // },[changePrograma1,changeFacultad])

  function findChangedPropertyIndex(prevArray:any, currArray:any) {
    if(prevArray == null){
      return -1
    }
  // Recorrer ambos arrays de objetos
  for (let i = 0; i < prevArray.length; i++) {
    for (let j = 0; j < currArray.length; j++) {
      // Si los objetos en la misma posición tienen diferentes propiedades
      if (i == j && JSON.stringify(prevArray[i]) !== JSON.stringify(currArray[j])) {
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
  useWatchStateChange((depIndex,prevVal,currentVal)=>{
    const idx = findChangedPropertyIndex(prevVal,currentVal)
    let timer:NodeJS.Timeout | number | null = null
    const limits = [0].concat(actualData.map(ele=>ele.evaluadores.length))
    if(idx !== -1){
      if(modalIdx[idx+1] < limits[idx+1] -1){
      // timer = setTimeout(()=>{changeIdxMod(idx+1,true)},300)
      changeIdxMod(idx+1,true)
      }
    }

    return ()=>clearTimeout(timer!!)
  },[actualData])

  const [idx, setIdx] = useState(0);
  const [modalIdx, setModalIdx] = useState<number[]>(
    Array(actualData.length + 1).fill(0)
  );

  const add = () => {
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

  const firstModel = [<Modal key={"one"} 
    componentName="diferents"
    componentData={mainData} 
    stateProps={{pos:0,state:modalIdx[0],setState:changeIdxMod}}
    componentsStates={[programa1,facultad,programa2]}
    funFinal={[changePrograma1,changeFacultad,changePrograma2,setResoluciones]}></Modal>
  ]
  const myModals = actualData.map((ele, pos) => {
    pos = pos + 1
    // console.log(pos)
    return(
    <Modal
      key={ele.title}
      componentName="evaluadores"
      componentData={ele}
      stateProps={{ pos: pos, state: modalIdx[pos], setState: changeIdxMod }}
      funFinal={[changeGrade]}
    ></Modal>
  )});
  const allModals = firstModel.concat(myModals)
  // const allModals = myModals
  return (
    <>
<h1 className="text-4xl font-extrabold dark:text-white pt-10 pl-10">INSTRUMENTO DE EVALUACIÓN DE PLANES CURRICULARES DE LA UNIVERSIDAD ANDINA DEL CUSCO</h1>
    <main
      className={`relative flex justify-center items-center p-12 ${inter.className}`}
    >
      <button onClick={min} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l-lg h-20">

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>
</button>

        <p className="absolute top-20 pt-4  z-20 text-sm text-gray-400">{`${idx+1}-${allModals.length}`}</p>
      {allModals[idx]}
      <button  onClick={add} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r-lg h-20">

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
</svg>
        </button>
    </main>
    </>
  );
}

//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
//     >
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get fucked up by editing&nbsp;
//           <code className="font-mono font-bold">pages/index.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Discover and deploy boilerplate example Next.js&nbsp;projects.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }

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
  const programa = getMainData()
  console.log(programa)

  return {
    props: {
      posts: finalPosts,
      programa:programa
    },
  };
}
