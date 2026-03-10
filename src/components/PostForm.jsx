import { useState } from 'react'

export default function PostForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return
    onSubmit(title.trim(), content.trim())
    setTitle('')
    setContent('')
  }

  const isDisabled = !title.trim() || !content.trim() || isLoading

  return (
    <div className="card post-form">
      <h3 className="form-title">What's on your mind?</h3>
      <div className="field">
        <label className="field-label">Title</label>
        <input
          className="field-input"
          type="text"
          placeholder="Hello world"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <div className="form-footer">
        <button
          className="btn btn-primary"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          {isLoading ? 'Creating...' : 'CREATE'}
        </button>
      </div>
    </div>
  )
}
