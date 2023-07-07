import './category-item.styles.scss';

const CategoryItem = ({ title, imageUrl }) => {
  return (
    <div className="category-container">
      <div className="background-image" 
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        />
      <div className="category-body-container">
        <h2>{title}</h2>
        <div>Shop Now</div>
      </div>
    </div>
  )
}

export default CategoryItem;