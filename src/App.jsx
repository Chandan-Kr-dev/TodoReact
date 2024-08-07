import React from "react";
import Navbar from "./Components/Navbar";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const App = () => {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [ShowFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));

      setTodos(todos);
    }
  }, []);

  const saveToLocs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("saved");
  };

  const toggleFinished = () => {
    setShowFinished(!ShowFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocs();
  };
  const handleDelete = (e, id) => {
    // console.log(`The id is ${id}`)
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    // console.log(index);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handelCheckBox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    // console.log(newtodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl  bg-pink-300 min-h-[70vh] w-1/2">
        <div className="addTodo text-center">
          <h1 className="font-bold  text-3xl my-5">
            iTask - Manages Your daily Tasks
          </h1>
          <h3 className="text-lg font-bold items-center">Add Your Todo</h3>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-md my-5 p-2"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-500 hover:bg-violet-600  w-full  text-white rounded-md py-1 px-2 my-3"
            disabled={todo.length <= 3}
          >
            Save
          </button>
        </div>
        <h1 className="text-lg font-bold">Your todos</h1>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={ShowFinished}
        />
        <label htmlFor="">Show Finished</label>
        <div className="todos bg-slate-300 rounded-md p-5">
          {todos.length === 0 && <div className="m-5">No todos to Display</div>}
          {todos.map((item) => {
            return (
              (ShowFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between   my-3">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={handelCheckBox}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-500 hover:bg-violet-600 px-2 py-1  text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-500 hover:bg-violet-600 px-2 py-1  text-white rounded-md mx-1"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
