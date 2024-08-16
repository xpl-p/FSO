const PersonForm = ( { onSubmit, onNameChange, onNumberChange, nameValue, numberValue } ) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Name: <input value={nameValue} onChange={onNameChange} />
        </div>
        <div>
          Number: <input value={numberValue} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm