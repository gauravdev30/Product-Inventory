import {
  FaCubes,
  FaTags,
  FaBoxOpen,
  FaWarehouse,
  FaLayerGroup
} from 'react-icons/fa';

const icons = [
  FaCubes,
  FaTags,
  FaBoxOpen,
  FaWarehouse,
  FaLayerGroup
];

const CategoryCards = ({ data }) => {
  return (
    <div className="category-grid mb-4">
      {data.map((cat, index) => {
        const Icon = icons[index % icons.length];

        return (
          <div
            key={index}
            className={`category-card color-${index % 5}`}
          >
            <div className="category-icon">
              <Icon size={28} />
            </div>

            <div className="category-info">
              <p className="mb-1 fw-semibold">{cat.name}</p>
              <h4 className="mb-0">{cat.count}</h4>
              <small className="opacity-75">Products</small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCards;
