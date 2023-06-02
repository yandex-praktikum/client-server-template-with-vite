import './App.css'

const users = ['Коля', 'Петя', 'Степа', 'Лиза']

function App() {
  return (
    <div className="App">
      <ul>
        {users.map((userName, i) => (
          <li key={i}>{userName}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
