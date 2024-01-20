import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../../store/categories/categories.selector";
// import { CategoriesMapContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesMapContext);
  const categoriesMap = useSelector(categoriesSelector);
  const [products, setProducts] = useState(categoriesMap[category]);
  
  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className='category-title'>{ category.toUpperCase() }</h2>
      <div className='category-container'>
        { 
          products &&
          products.map((product) => {
            return (
              <ProductCard key={product.id} product={product}/>
            )
          })
        }
      </div>
    </Fragment>
  )
}

export default Category;