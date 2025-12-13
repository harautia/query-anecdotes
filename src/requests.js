const baseUrl = 'http://localhost:3001/anecdotes'     
     
export const getAnecdotes = async () => { 
    
    const response = await fetch(baseUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
      }
      return await response.json()
    }

export const createAndecdote = async (newAndecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAndecdote)
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create Andecdote')
  }
 
  return await response.json()
}

export const updateVote = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}