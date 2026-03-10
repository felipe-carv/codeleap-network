import { useState } from 'react'

export default function SignupModal({ onEnter }) {
  const [username, setUsername] = useState('')

  const handleSubmit = () => {
    if (username.trim()) onEnter(username.trim())
  }

  return (
    <div className="overlay">
      <div className="modal signup-modal">
        <h2 className="modal-title">Welcome to CodeLeap network!</h2>
        <label className="field-label">Please enter your username</label>
        <input
          className="field-input"
          type="text"
          placeholder="John doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            disabled={!username.trim()}
            onClick={handleSubmit}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  )
}
