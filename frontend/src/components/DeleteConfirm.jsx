const DeleteConfirm = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box text-center">
        <h4 className="mb-3 text-danger">Delete Product?</h4>
        <p>This action cannot be undone.</p>

        <div className="mt-4">
          <button className="btn btn-light me-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
