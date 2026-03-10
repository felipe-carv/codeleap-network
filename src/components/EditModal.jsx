import { useState } from 'react'

export default function EditModal({ post, onSave, onCancel, isLoading }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const isDisabled = !title.trim() || !content.trim() || isLoading

  return (
    <div className="overlay">
      <div className="modal">
        <h3 className="modal-title">Edit item</h3>
        <div className="field">
          <label className="field-label">Title</label>
          <input
            className="field-input"
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>
        <div className="field">
          <label className="field-label">Content</label>
          <textarea
            className="field-input field-textarea"
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </button>
          <button
            className="btn btn-success"
            disabled={isDisabled}
            onClick={() => onSave({ title: title.trim(), content: content.trim() })}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
