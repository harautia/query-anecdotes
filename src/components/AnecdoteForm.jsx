import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAndecdote  } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
    
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

 const newNoteMutation = useMutation({
  mutationFn: createAndecdote,
  onSuccess: (newAndecdote) => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    notificationDispatch({
      type: 'SHOW',
      payload: `Added "${newAndecdote.content}"`
    })
    
    console.log('Notification OK branch dispatch')
    
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  },
  onError: (error) => {
    console.log('Error seen:', error.message)
    notificationDispatch({
      type: 'SHOW',
      payload: error.message
    })

    console.log('Notification Error branch dispatch')
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }
})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newNoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm