const Part = ( {part} ) => <p>{part.name} {part.exercises}</p>

const Header = ( {title} ) => <h2>{title}</h2>

const Content = ( {parts} ) => parts.map(part => <Part key={part.id} part={part}/>)

const Sum = ( {parts} ) => <p>Total of {parts.reduce((total, {exercises}) => total + exercises, 0)} exercises</p>


const Course = ( {course} ) => {  
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
    )
}

export default Course