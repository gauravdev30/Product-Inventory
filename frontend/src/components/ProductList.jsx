// import { useEffect, useState } from 'react';
// import Select from 'react-select';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import { toast } from 'sonner';

// import {
//   fetchProducts,
//   fetchCategories,
//   addProduct,
//   updateProduct,
//   deleteProduct
// } from '../services/api';

// import Pagination from './Pagination';
// import ProductModal from './ProductModal';
// import DeleteConfirm from './DeleteConfirm';
// import AppHeader from './AppHeader';
// import CategoryCards from './CategoryCards';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const [deleteId, setDeleteId] = useState(null);

//   const [loading, setLoading] = useState(false);


//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchProducts({ page });
//       setProducts(res.data.products);
//       setTotalPages(Math.ceil(res.data.total / 5));
//     } catch (err) {
//       toast.error('Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };


//   const loadCategories = async () => {
//     const res = await fetchCategories();
//     setCategories(
//       res.data.map(cat => ({
//         value: cat._id,
//         label: cat.name
//       }))
//     );
//   };

//   useEffect(() => {
//     loadProducts();
//     loadCategories();
//   }, [page]);

//   const categorySummary = categories.map(cat => ({
//     name: cat.label,
//     count: products.filter(p =>
//       p.categories?.some(c => c._id === cat.value)
//     ).length
//   }));

//   const handleSave = async (form) => {
//     const payload = {
//       name: form.name,
//       description: form.description,
//       quantity: Number(form.quantity),
//       categories: [form.category.value]
//     };

//     if (editData) {
//       await updateProduct(editData._id, payload);
//       toast.success('Product updated successfully');
//     } else {
//       await addProduct(payload);
//       toast.success('Product added successfully');
//     }

//     setModalOpen(false);
//     setEditData(null);
//     loadProducts();
//   };

//   const confirmDelete = async () => {
//     await deleteProduct(deleteId);
//     toast.success('Product deleted');
//     setDeleteId(null);
//     loadProducts();
//   };

//   return (
//     <>
//       <AppHeader />

//       <CategoryCards data={categorySummary.slice(0, 5)} />

//       <div className="card p-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="mb-0 fw-semibold">Product List</h5>

//           <button
//             className="btn btn-primary d-flex align-items-center gap-2"
//             onClick={() => {
//               setEditData(null);
//               setModalOpen(true);
//             }}
//           >
//             <FaPlus size={14} />
//             Add Product
//           </button>
//         </div>

//         <table className="table align-middle">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Quantity</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">
//                   <div className="spinner-border text-primary" role="status" />
//                   <div className="mt-2">Loading products...</div>
//                 </td>
//               </tr>
//             )}

//             {!loading && products.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-muted">
//                   No products found. Click <strong>Add Product</strong> to create one.
//                 </td>
//               </tr>
//             )}

//             {!loading &&
//               products.map(prod => (
//                 <tr key={prod._id}>
//                   <td className="fw-medium">{prod.name}</td>

//                   <td>
//                     <span className="badge-category">
//                       {prod.categories[0]?.name}
//                     </span>
//                   </td>

//                   <td>{prod.quantity}</td>

//                   <td className="text-end">
//                     <button
//                       className="icon-btn edit me-2"
//                       onClick={() => {
//                         setEditData({
//                           ...prod,
//                           category: {
//                             value: prod.categories[0]._id,
//                             label: prod.categories[0].name
//                           }
//                         });
//                         setModalOpen(true);
//                       }}
//                     >
//                       <FaEdit />
//                     </button>

//                     <button
//                       className="icon-btn delete"
//                       onClick={() => setDeleteId(prod._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>

//         </table>

//         <Pagination
//           page={page}
//           totalPages={totalPages}
//           onChange={setPage}
//         />
//       </div>

//       <ProductModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         categories={categories}
//         initialData={editData}
//         onSubmit={handleSave}
//       />

//       <DeleteConfirm
//         open={!!deleteId}
//         onCancel={() => setDeleteId(null)}
//         onConfirm={confirmDelete}
//       />
//     </>
//   );
// };

// export default ProductList;


import { useEffect, useState } from 'react';
import Select from 'react-select';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';

import {
  fetchProducts,
  fetchCategories,
  addProduct,
  updateProduct,
  deleteProduct
} from '../services/api';

import Pagination from './Pagination';
import ProductModal from './ProductModal';
import DeleteConfirm from './DeleteConfirm';
import AppHeader from './AppHeader';
import CategoryCards from './CategoryCards';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===================== API LOADERS ===================== */

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await fetchProducts({
        page,
        search,
        categories: selectedCategories.map(c => c.value).join(',')
      });

      setProducts(res.data.products);
      setTotalPages(Math.ceil(res.data.total / 5));
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const res = await fetchCategories();
    setCategories(
      res.data.map(cat => ({
        value: cat._id,
        label: cat.name
      }))
    );
  };

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, search, selectedCategories]);

  /* ===================== DERIVED DATA ===================== */

  const categorySummary = categories.map(cat => ({
    name: cat.label,
    count: products.filter(p =>
      p.categories?.some(c => c._id === cat.value)
    ).length
  }));

  /* ===================== HANDLERS ===================== */

  const handleSave = async (form) => {
    const payload = {
      name: form.name,
      description: form.description,
      quantity: Number(form.quantity),
      categories: [form.category.value]
    };

    if (editData) {
      await updateProduct(editData._id, payload);
      toast.success('Product updated successfully');
    } else {
      await addProduct(payload);
      toast.success('Product added successfully');
    }

    setModalOpen(false);
    setEditData(null);
    loadProducts();
  };

  const confirmDelete = async () => {
    await deleteProduct(deleteId);
    toast.success('Product deleted');
    setDeleteId(null);
    loadProducts();
  };

  /* ===================== UI ===================== */

  return (
    <>
      <AppHeader />

      <CategoryCards data={categorySummary.slice(0, 5)} />

      <div className="card p-4">

        {/* 🔍 SEARCH + FILTER ROW */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <Select
              isMulti
              options={categories}
              placeholder="Filter by categories"
              value={selectedCategories}
              onChange={(val) => {
                setPage(1);
                setSelectedCategories(val || []);
              }}
            />
          </div>
        </div>

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-semibold">Product List</h5>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
            }}
          >
            <FaPlus size={14} />
            Add Product
          </button>
        </div>

        {/* TABLE */}
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="spinner-border text-primary" />
                  <div className="mt-2">Loading products...</div>
                </td>
              </tr>
            )}

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  No products found.
                </td>
              </tr>
            )}

            {!loading &&
              products.map(prod => (
                <tr key={prod._id}>
                  <td className="fw-medium">{prod.name}</td>

                  <td>
                    <span className="badge-category">
                      {prod.categories[0]?.name}
                    </span>
                  </td>

                  <td>{prod.quantity}</td>

                  <td className="text-end">
                    <button
                      className="icon-btn edit me-2"
                      onClick={() => {
                        setEditData({
                          ...prod,
                          category: {
                            value: prod.categories[0]._id,
                            label: prod.categories[0].name
                          }
                        });
                        setModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="icon-btn delete"
                      onClick={() => setDeleteId(prod._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categories={categories}
        initialData={editData}
        onSubmit={handleSave}
      />

      <DeleteConfirm
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ProductList;
