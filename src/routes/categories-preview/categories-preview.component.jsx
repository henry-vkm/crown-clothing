import { useContext, Fragment } from "react";
import { useSelector } from "react-redux";
// import { CategoriesMapContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import './categories-preview.styles.scss';
import { categoriesSelector } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(categoriesSelector);

  return (
    <div className='categories-preview-container'>
      {
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          )
        })
      }
    </div>
  )
}

export default CategoriesPreview;