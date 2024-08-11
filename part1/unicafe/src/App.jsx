import { useState } from 'react'

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/> 
    </>
  )
}

const Statistics = ( {good, neutral, bad} ) => {
  const total = good + neutral + bad
  return (
  <div>
    <h1>Statistics</h1>
    {total === 0 ? <p>No feedback given</p> : 
      <table>
        <tbody>
          <StatisticsLine value={good} text={'good'}/>
          <StatisticsLine value={neutral} text={'neutral'}/>
          <StatisticsLine value={bad} text={'bad'}/>        
          <StatisticsLine value={total} text={'total'}/>
          <StatisticsLine value={((good - bad) / total).toFixed(2)} text={'average'}/>
          <StatisticsLine value={((good / total) * 100).toFixed(1) + '%'} text={'positive'}/>
        </tbody>
      </table>
    }
  </div>
  )
}

const StatisticsLine = ( {value, text} ) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ( {handleClick, text} ) => {
  return <button onClick={handleClick}>{text}</button>
}

export default App
