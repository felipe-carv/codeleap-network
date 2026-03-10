export default function DeleteModal({ onConfirm, onCancel, isLoading }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h3 className="modal-title">Are you sure you want to delete this item?</h3>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
