import React, { useMemo } from "react";
import {dataStore,ContextType} from "./types/store"


 export const AppContext = React.createContext<ContextType|null>(null);

type Props = {
  children: React.ReactNode,
}
const DataProvider = ({children}:Props)=>{

  const [data,setData] = React.useState<dataStore[]|null>(null)
  const addData = (ele:dataStore[]) => {
    setData(ele)
  }
  return(
   <AppContext.Provider value={{data,setData}}>
      {children}
    </AppContext.Provider>
  )
}

export default DataProvider
