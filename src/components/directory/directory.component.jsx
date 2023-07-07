import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
          {
            categories.map(({ id, title, imageUrl }) => {
              return (
                <CategoryItem key={id} title={title} imageUrl={imageUrl} />
              )
            })
          }
    </div>
  )
}

export default Directory;