import { useState } from "react"



const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const currentLeft = left + 1
    setLeft(currentLeft)
    setTotal(currentLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const currentRight = right + 1
    setRight(currentRight)
    setTotal(left + currentRight)
  }

  return (
    <div>
      {left}  
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <p>{allClicks.join(' ')}</p>
      <History allClicks={allClicks}/>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    )}
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

export default App