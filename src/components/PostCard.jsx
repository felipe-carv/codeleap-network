function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function PostCard({ post, isOwn, onDelete, onEdit }) {
  return (
    <div className="card post-card">
      <div className="post-header">
        <span className="post-title">{post.title}</span>
        {isOwn && (
          <div className="post-actions">
            <button className="icon-btn" onClick={onDelete} title="Delete post">
              <TrashIcon />
            </button>
            <button className="icon-btn" onClick={onEdit} title="Edit post">
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      <div className="post-body">
        <div className="post-meta">
          <span className="post-username">@{post.username}</span>
          <span className="post-time">{timeAgo(post.created_datetime)}</span>
        </div>
        <p className="post-content">{post.content}</p>
      </div>
    </div>
  )
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
