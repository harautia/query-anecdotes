import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  console.log('Reducer called with:', action)
  
  switch (action.type) {
    case 'SHOW':
      const newState = {
        message: action.payload || 'Notification',
        visible: true
      }
      console.log('Returning state:', newState)
      return newState
    case 'HIDE':
      return {
        message: '',
        visible: false
      }
    default:
      console.log('Default case, returning:', state)
      return state
  }
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    visible: false
  })
  
  console.log('App render, notification state:', notification)
  
  const queryClient = useQueryClient()

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  
const handleVote = (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  
  updateVoteMutation.mutate(updatedAnecdote, {
    onSuccess: () => {
      notificationDispatch({ 
        type: 'SHOW',
        payload: `You voted for "${anecdote.content}"`
      })      
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)
    }
  })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span> Anecdote service not available due to problems in server</span>
  }
 
  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
