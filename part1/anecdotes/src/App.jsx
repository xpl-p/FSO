import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandom = () => Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(getRandom())
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleVote = () => () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const handleNewAnecdote = () => () => {
    let newIndex;
    do {
      newIndex = getRandom()
    } while (newIndex === selected);
    setSelected(newIndex)
  }

  const getPopularAnecdote = () => {
    const count = votes.reduce((a, b) => Math.max(a, b), -Infinity)
    const anecdote = anecdotes[votes.indexOf(count)]
    return { anecdote, count }
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleVote()} text={'vote'} />
      <Button onClick={handleNewAnecdote()} text={'next anecdote'} />
      <PopularAnecdote {...getPopularAnecdote()}/>
    </div>
  )
}


const PopularAnecdote = ( {anecdote, count} ) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {count} votes</p>
    </>
  )
}

const Button = ( {onClick, text} ) => (
  <button onClick={onClick}>
    {text}
  </button>
)

export default App