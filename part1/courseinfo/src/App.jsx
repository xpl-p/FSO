const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const Header = (props) => {
  return(
    <div className="header">
      <h1>
        {props.name}
      </h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div className="content">
      {props.parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}
const Total = (props) => {
  return(
    <div className="total">
      <p>
        Number of exercises {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}
      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

export default App