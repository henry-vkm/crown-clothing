import { useEffect } from 'react';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCategoriesMap } from '../../store/categories/categories.action';

import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCollectionAndDocuments();
      console.log(categoriesMap)
      dispatch(setCategoriesMap(categoriesMap)); 
    };

    getCategoriesMap();
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop;