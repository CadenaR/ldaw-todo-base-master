import React from "react";
import { Link } from "react-router-dom";

const TodoList = ({ todos, markAsDone, deleteTask }) => {
  const handleMarkAsDone = (event, index) => {
    markAsDone(index);
  };

  const handleDelete = (event, index) => {
    deleteTask(index);
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, i) => {
          return (
            <tr
              key={i}
              style={{
                backgroundColor: todo.status === "pending" ? "white" : "grey",
              }}
            >
              <td>#{i + 1}</td>
              <td><Link to={"/task/" + todo.id}>{todo.description}</Link></td>
              <td>
                {todo.status === "pending" && (
                  <input
                    type="button"
                    value="terminado?"
                    onClick={(event) => handleMarkAsDone(event, i)}
                  />
                )}
                <input
                  type="button"
                  value="eliminar"
                  onClick={(event) => handleDelete(event, i)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoList;
