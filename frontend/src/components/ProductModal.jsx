import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'sonner';

const EMPTY_FORM = {
  name: '',
  description: '',
  quantity: '',
  category: null
};

const ProductModal = ({ open, onClose, categories, initialData, onSubmit }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm(initialData); 
      } else {
        setForm(EMPTY_FORM);
      }
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = async () => {
     if (loading) return;
    if (!form.name || !form.quantity || !form.category) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
      toast.success(
        initialData ? 'Product updated successfully' : 'Product added successfully'
      );
      onClose();
      setForm(EMPTY_FORM); 
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4 className="mb-3">
          {initialData ? 'Update Product' : 'Add Product'}
        </h4>

        <input
          className="form-control mb-2"
          placeholder="Product Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />

        <Select
          options={categories}
          value={form.category}
          onChange={val => setForm({ ...form, category: val })}
          placeholder="Select Category"
        />

        <div className="text-end mt-4">
          <button
            className="btn btn-light me-2"
            onClick={() => {
              setForm(EMPTY_FORM);
              onClose();
            }}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : initialData
              ? 'Update Product'
              : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
