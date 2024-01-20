import { createContext, useEffect, useState } from "react";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.jsx";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.jsx";
// import SHOP_DATA from '../shopData.js';

export const CategoriesMapContext = createContext({
  categoriesMap: {}
})


export const CategoriesMapProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };
  
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, [])  

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCollectionAndDocuments();
      setCategoriesMap(categoriesMap); 
    };

    getCategoriesMap();
  }, [])

  return (
    <CategoriesMapContext.Provider value={value}>
      { children }
    </CategoriesMapContext.Provider>
  )
}