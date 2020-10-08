import React, { useState, useEffect } from "react";
import Create from "./Create";
import TodoList from "./TodoList";
import axios from "axios";

const Index = () => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then((result) => {
        console.log(result);
        setTodos(result.data);
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  }, []);

  const addTodo = (description) => {
    axios.post('http://localhost:3001/tasks', {
      description: description
    })
    .then(function (response) {
      let cTodos = Object.assign([], todos);
      cTodos.push(response.data);
      setTodos(cTodos);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const markAsDone = (task) => {
    let cTodos = Object.assign([], todos)

    axios.get(`http://localhost:3001/task/complete/${cTodos[task].id}`)
      .then((result) => {
        cTodos[task].status = "done";
        setTodos(cTodos);
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
    
  };

  const deleteTask = (task) => {
    let cTodos = Object.assign([], todos);

    axios.delete(`http://localhost:3001/tasks/${cTodos[task].id}`)
      .then((result) => {
        cTodos.splice(task, 1);
        setTodos(cTodos);
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });  
  };

  return (
    <>
      <h1>Todo list</h1>
      <Create addTodo={addTodo} />
      <TodoList todos={todos} markAsDone={markAsDone} deleteTask={deleteTask} />
    </>
  );
}

export default Index;