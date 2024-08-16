const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBotom: 10,
    color: type === 0 ? 'green' : 'red'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification