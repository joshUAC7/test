import React from "react";

export interface dataStore {
    "title":string
    "message":string
    "evaluadores": {"name":string,"grade":number}[]
  }



export type ContextType = {
  data: dataStore[]|null;
  setData: React.Dispatch<React.SetStateAction<dataStore[]|null>>
};

export type actualDataType = {
  actualData: dataStore[];
  setActualData: React.Dispatch<React.SetStateAction<dataStore[]>>
};


