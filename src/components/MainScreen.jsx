import { useState, useRef, useCallback } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, createPost, updatePost, deletePost } from '../api'
import PostForm from './PostForm'
import PostCard from './PostCard'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

export default function MainScreen({ username, onLogout }) {
  const qc = useQueryClient()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const observerRef = useRef(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 'https://dev.codeleap.co.uk/careers/',
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  })

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  })

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
      setEditTarget(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] })
      setDeleteTarget(null)
    },
  })

  // Infinite scroll sentinel
  const sentinelRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  const posts = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="page-bg">
      <div className="app-container">
        {/* Header */}
        <div className="header">
          <span className="header-title">CodeLeap Network</span>
          <button className="logout-btn" onClick={onLogout} title="Sign out">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="app-body">
          <PostForm
            onSubmit={(title, content) =>
              createMutation.mutate({ username, title, content })
            }
            isLoading={createMutation.isPending}
          />

          {isLoading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isOwn={post.username === username}
                onDelete={() => setDeleteTarget(post)}
                onEdit={() => setEditTarget(post)}
              />
            ))
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="sentinel" />
          {isFetchingNextPage && <div className="loading">Loading more...</div>}
          {!hasNextPage && posts.length > 0 && (
            <div className="end-message">You've reached the end!</div>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleteMutation.isPending}
        />
      )}

      {editTarget && (
        <EditModal
          post={editTarget}
          onSave={(data) => updateMutation.mutate({ id: editTarget.id, data })}
          onCancel={() => setEditTarget(null)}
          isLoading={updateMutation.isPending}
        />
      )}
    </div>
  )
}
