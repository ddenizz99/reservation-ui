import { useState } from "react";

function Footer() {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')

    const submitHandle = (e) => {
        e.preventDefault()
        setTodos([...todos, todo])
        setTodo('')
    }

    let name = "EGE DENİZ";


    return (

        <div>
            <h1>Todo App</h1>
            <form onSubmit={submitHandle}>
                <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
                <button type="submit" disabled={!todo}>Ekle</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
            {name}

          
        </div>

    );
  }
  
  export default Footer;
  