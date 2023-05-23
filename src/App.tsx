import React, { useState } from 'react'
import axios from 'axios'


// =======Project breakdown=======
// A ToDo App
// * An input field
// Title, id
// *have a todo list
// * edit option
// * update option == mark as in progress or completed
// * Delete option
// Api calls
// State management

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  // const [ edit, setEdit] = useState(false)


  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  const addTodo = () =>{
    axios.post("https://jsonplaceholder.typicode.com/todos", { title: todo }).then((response)=>{setTodo(response)})
    // setTodos([...todos, { title: todo }])
    // setTodo("")
  }

  const deleteTodo = (id: number) => {
    // look for the item with the same id
    // remove that item from the list
    const filteredTodos = todos.filter((todo, index) => index !== id)
    setTodos(filteredTodos)
  }

  // axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => { setTodos(response.data); })
  
  // axios.post("https://jsonplaceholder.typicode.com/todos");

  // const editTodo = (id:number, newText) => {
  //   todos = todos.map(todo => {
  //     if (todo.id === id) {
  //       return { ...todo, text: newText };
  //     }
  //     return todo;
  //   })
  // }

  
  return (
    <div className="bg-slate-700 min-h-screen flex justify-center">
      <div className="w-1/2  my-20 bg-white rounded-lg shadow-lg p-6">
        <div className="relative z-[10] flex w-full flex-col items-center p-6">
          <h5 className="text-4xl">My Todo list</h5>
          <p>{currentDate}</p>
          <div className="mt-4">
            <div className="flex ">
              <input
                value={todo}
                onChange={handleChange}
                onKeyPress={handleKeypress}
                className="w-full rounded-l p-4  border border-gray-300 border-r-0 outline-0 bg-slate-100"
                placeholder="Enter a todo..."
              />
              <button
                className="bg-green-400 text-white p-3 rounded font-bold hover:bg-green-600 "
                onClick={addTodo}
              >
                Add
              </button>
            </div>
          </div>

          <ul className="list list-none mt-6  w-1/2 justify-center  sm:w-4/5 md:w-3/5 bg-slate-100 ">
            {todos.map((todo, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center flex-nowrap my-2 "
                >
                  {" "}
                  <div className="flex">
                    <input type="checkbox" className="ml-2 mr-1" />
                    <li className='self-center font-semibold pr-10 mr-6 grow'>{todo.title}</li>
                  </div>
                  <div className="flex">
                    <button
                      className="bg-red-500 text-white px-2 rounded-md mr-2 font-bold hover:bg-red-700"
                      onClick={() => deleteTodo(index)}
                    >
                      x
                    </button>
                    <button
                      className="bg-green-400 text-white py-1 px-2 rounded font-bold hover:bg-green-600 mr-2"
                      onClick={() => editTodo(index, newTodo)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App